import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

// ✅ Config uses placeholders to be replaced by GitHub Secrets during deployment
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY_PLACEHOLDER",
  authDomain: "FIREBASE_AUTH_DOMAIN_PLACEHOLDER",
  projectId: "FIREBASE_PROJECT_ID_PLACEHOLDER",
  storageBucket: "FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_PLACEHOLDER",
  appId: "FIREBASE_APP_ID_PLACEHOLDER",
  measurementId: "FIREBASE_MEASUREMENT_ID_PLACEHOLDER"
};

const VAPID_KEY = 'FIREBASE_VAPID_KEY_PLACEHOLDER';

class FirebaseService {
  private app: FirebaseApp | null = null;
  private messaging: Messaging | null = null;
  private fcmToken: string | null = null;

  init() {
    if (typeof window === 'undefined') return;

    if (getApps().length === 0) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = getApps()[0];
    }

    try {
        this.messaging = getMessaging(this.app);
        this.listenToForegroundMessages();
    } catch (e) {
        console.warn('Firebase Messaging not supported in this browser', e);
    }
  }

  async requestPermissionAndGetToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    if (!this.messaging) this.init();
    if (!this.messaging) return null;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
      }

      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

      const token = await getToken(this.messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration
      });

      if (token) {
        this.fcmToken = token;
        return token;
      }
      return null;
    } catch (err) {
      console.error('Error getting FCM token:', err);
      return null;
    }
  }

  getToken(): string | null {
    return this.fcmToken;
  }

  private listenToForegroundMessages() {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      this.showBrandedNotification(
        payload.notification?.title || '🎉 Thank you!',
        payload.notification?.body || 'Your message has been received.'
      );
    });
  }

  async showBrandedNotification(title: string, body: string) {
    if (typeof window === 'undefined') return;
    
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }

    const options: NotificationOptions = {
      body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      tag: 'contact-form-notification',
      requireInteraction: false,
      data: { url: 'https://developerkavi.in/' }
    };

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        // @ts-ignore
        options.actions = [{ action: 'open_url', title: '🌐 Visit Website' }];
        await registration.showNotification(title, options);
        return;
      }
    } catch (e) {
      console.warn('Service worker notification failed, falling back to standard', e);
    }

    const notification = new Notification(title, options);
    notification.onclick = (event) => {
      event.preventDefault();
      window.open('https://developerkavi.in/', '_blank');
      notification.close();
    };
  }

  async sendTokenToBackend(token: string): Promise<void> {
    try {
      await fetch('https://portkaviapi.techtigers.in/api/save-fcm-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
    } catch (e) {
      console.warn('Could not save FCM token to backend:', e);
    }
  }
}

export const firebaseService = new FirebaseService();
