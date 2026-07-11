import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, CACHE_SIZE_UNLIMITED, Firestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';

const env = import.meta.env;

const validateEnvironment = (): void => {
  const requiredKeys = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_PROJECT_ID', 'VITE_RECAPTCHA_SITE_KEY'];
  for (const key of requiredKeys) {
    if (!env[key as keyof ImportMetaEnv]) {
      throw new Error(`[PRUDÊNCIA-FATAL-001]: Falha na integridade da configuração: ${key} não detectada.`);
    }
  }
};

validateEnvironment();

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db: Firestore = initializeFirestore(app, { cacheSizeBytes: CACHE_SIZE_UNLIMITED });
const auth: Auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const appCheck: AppCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(env.VITE_RECAPTCHA_SITE_KEY as string),
  isTokenAutoRefreshEnabled: true
});

if (env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { app, db, auth, appCheck };