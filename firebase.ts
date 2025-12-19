
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// As chaves são lidas das variáveis de ambiente do Netlify (Site Settings > Environment Variables)
// Isso evita o erro de "Exposed Secrets" detectado pelo scanner de segurança.
const firebaseConfig = {
  apiKey: process.env.API_KEY || "",
  authDomain: "moda-brasil-9c792.firebaseapp.com",
  projectId: "moda-brasil-9c792",
  storageBucket: "moda-brasil-9c792.appspot.com",
  messagingSenderId: "33658624710",
  appId: "1:33658624710:web:aca2e3fe3e007e4d3095c7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
