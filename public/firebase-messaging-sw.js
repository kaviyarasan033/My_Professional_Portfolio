// Firebase Cloud Messaging Service Worker
// This runs in the background to receive push notifications

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ✅ Config uses placeholders to be replaced by GitHub Secrets during deployment
firebase.initializeApp({
  apiKey: "FIREBASE_API_KEY_PLACEHOLDER",
  authDomain: "FIREBASE_AUTH_DOMAIN_PLACEHOLDER",
  projectId: "FIREBASE_PROJECT_ID_PLACEHOLDER",
  storageBucket: "FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_PLACEHOLDER",
  appId: "FIREBASE_APP_ID_PLACEHOLDER",
  measurementId: "FIREBASE_MEASUREMENT_ID_PLACEHOLDER"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);

  const notificationTitle = payload.notification?.title || '🎉 Message Received!';
  const notificationOptions = {
    body: payload.notification?.body || 'Thank you for contacting Kavi Developer.',
    icon: '/favicon.png',
    badge: '/favicon.png',
    image: payload.notification?.image || null,
    tag: 'contact-form-notification',
    requireInteraction: false,
    data: {
      url: 'https://developerkavi.in/'
    },
    actions: [
      {
        action: 'open_url',
        title: '🌐 Visit Website'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click — open the portfolio website
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || 'https://developerkavi.in/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if the site is already open
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
