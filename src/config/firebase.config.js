import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5u3SYCOAI7AUo8nSa5O5YbxhuPgBaRMw",
  authDomain: "user-email-password-auth-3aa38.firebaseapp.com",
  projectId: "user-email-password-auth-3aa38",
  storageBucket: "user-email-password-auth-3aa38.appspot.com",
  messagingSenderId: "605500166609",
  appId: "1:605500166609:web:b3b0a4009cfd65e46c50f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
