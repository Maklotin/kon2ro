import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Hentet fra remix firebase auth fra incertase.io: https://invertase.io/blog/remix-firebase-auth
const app = initializeApp({
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
});

const auth = getAuth(app);
const db = getFirestore(app);

// if(import.meta.env.DEV) {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

setPersistence(auth, browserLocalPersistence);

export { auth, db };
