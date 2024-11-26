// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyAN7oq_XPVQZ2pHKaxy9ToVJuyaSD3fMS8",
  authDomain: "health-solutions-14e3f.firebaseapp.com",
  projectId: "health-solutions-14e3f",
  storageBucket: "health-solutions-14e3f.firebasestorage.app",
  messagingSenderId: "277748445217",
  appId: "1:277748445217:web:5e1033d4077879b5c63360",
  measurementId: "G-38QHCE74BP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);

export { auth};
