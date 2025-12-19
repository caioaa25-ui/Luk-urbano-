
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// As chaves são lidas apenas de variáveis de ambiente. 
// NUNCA coloque strings que comecem com "AIza" aqui.
const firebaseConfig = {
  apiKey: process.env.API_KEY || "",
  authDomain: "moda-brasil-9c792.firebaseapp.com",
  projectId: "moda-brasil-9c792",
  storageBucket: "moda-brasil-9c792.appspot.com",
  messagingSenderId: "33658624710",
  appId: "1:33658624710:web:aca2e3fe3e007e4d3095c7"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.error("Erro ao inicializar Firebase:", e);
  app = {};
}

export const auth = getAuth(app as any);
export const db = getFirestore(app as any);
export const storage = getStorage(app as any);
