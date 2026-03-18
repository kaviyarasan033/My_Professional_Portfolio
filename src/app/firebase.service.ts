import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { firstValueFrom } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private platformId = inject(PLATFORM_ID);
  private app: FirebaseApp | null = null;
  private messaging: Messaging | null = null;
  private fcmToken: string | null = null;

  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Prevent duplicate initialization
    if (getApps().length === 0) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = getApps()[0];
    }

    this.messaging = getMessaging(this.app);
    this.listenToForegroundMessages();
  }

  /** Request permission and get FCM token */
  async requestPermissionAndGetToken(): Promise<string | null> {
    if (!isPlatformBrowser(this.platformId)) return null;

    if (!this.messaging) this.init();

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

      const token = await getToken(this.messaging!, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration
      });

      if (token) {
        this.fcmToken = token;
        console.log('FCM Token obtained:', token);
        return token;
      }
      return null;
    } catch (err) {
      console.error('Error getting FCM token:', err);
      return null;
    }
  }

  /** Get the stored FCM token */
  getToken(): string | null {
    return this.fcmToken;
  }

  /** Listen for foreground messages (app is open) and show a branded notification */
  private listenToForegroundMessages() {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      console.log('Foreground FCM message received:', payload);
      // Show as a standard browser notification even when app is in foreground
      this.showBrandedNotification(
        payload.notification?.title || '🎉 Thank you!',
        payload.notification?.body || 'Your message has been received.'
      );
    });
  }

  /** Show a browser notification with your logo that opens your website on click */
  async showBrandedNotification(title: string, body: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Request permission if not already granted
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
      // Try service worker first (better mobile/background support, supports actions)
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        // @ts-ignore - actions supported in some browsers
        options.actions = [{ action: 'open_url', title: '🌐 Visit Website' }];
        await registration.showNotification(title, options);
        return;
      }
    } catch (e) {
      console.warn('Service worker notification failed, falling back to standard', e);
    }

    // Fallback to standard web notification API
    const notification = new Notification(title, options);
    notification.onclick = (event) => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open('https://developerkavi.in/', '_blank');
      notification.close();
    };
  }

  /** Send the FCM token to your backend to store it */
  async sendTokenToBackend(http: import('@angular/common/http').HttpClient, token: string): Promise<void> {
    try {
      await firstValueFrom(
        http.post('/api/save-fcm-token', { token })
      );
    } catch (e) {
      // Non-critical: token storage failure shouldn't break UX
      console.warn('Could not save FCM token to backend:', e);
    }
  }
}
