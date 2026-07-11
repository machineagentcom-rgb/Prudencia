/**
 * @file src/config/firebase.ts
 * @description Configuração centralizada de infraestrutura Firebase, App Check e Security Policies.
 * Implementação robusta seguindo RNF-01 (Segurança e Isolamento) e RNF-04 (Escalabilidade).
 * 
 * @author Machine Agent CTO
 * @version 2.0.2
 * 
 * Modificações: Adição de persistência otimizada, loggers de diagnóstico de rede
 * e estruturação de ambiente para conformidade com o ecossistema Prudência.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore, 
  CACHE_SIZE_UNLIMITED, 
  Firestore,
  enableIndexedDbPersistence,
  disableNetwork,
  enableNetwork
} from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';

/**
 * Interface estrita de variáveis de ambiente.
 * Segue o padrão de segurança exigido pela arquitetura Prudência.
 */
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_USE_FIREBASE_EMULATOR: string;
}

const env = import.meta.env as unknown as ImportMetaEnv;

/**
 * Validador de Ambiente - Protocolo "Fail-Fast".
 * Garante que o motor de conformidade não inicie em estado de degradação.
 */
const validateEnvironment = (): void => {
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY', 
    'VITE_FIREBASE_PROJECT_ID', 
    'VITE_RECAPTCHA_SITE_KEY'
  ];
  
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

// Inicialização Singleton
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Configuração Firestore com persistência offline ativada para resiliência (RNF-04)
const db: Firestore = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: false
});

// Habilitar persistência offline para garantir operação contínua do SDK
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('[PRUDÊNCIA-WARN]: Persistência offline indisponível em múltiplas abas.');
  } else if (err.code === 'unimplemented') {
    console.warn('[PRUDÊNCIA-WARN]: Navegador não suporta persistência offline.');
  }
});

const auth: Auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

/**
 * App Check: Camada de blindagem contra automações.
 * Utiliza tokenização PoW para validar dispositivos.
 */
const appCheck: AppCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true
});

// Modo de Desenvolvimento vs Produção (Segurança)
if (env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  console.group('[PRUDÊNCIA-DEV-MODE]');
  console.warn('Conectando ao emulador local.');
  console.warn('Integridade de produção ignorada.');
  console.groupEnd();
  connectAuthEmulator(auth, 'http://localhost:9099');
}

/**
 * Exportação de instâncias configuradas.
 * Acessíveis globalmente pelo ecossistema para telemetria, autenticação e transações de créditos.
 */
export { 
  app, 
  db, 
  auth, 
  appCheck,
  disableNetwork,
  enableNetwork 
};
