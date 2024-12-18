// Import necessary modules from Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCd0cJXvEG9KhVBMIOxAMtYpKHsqxEK6U8",
    authDomain: "queueiot.firebaseapp.com",
    databaseURL: "https://queueiot-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "queueiot",
    storageBucket: "queueiot.firebasestorage.app",
    messagingSenderId: "880068057443",
    appId: "1:880068057443:web:a0b878e457326e9ae9db56",
    measurementId: "G-9Q9J5YR3GH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

// Export the database instance
export const database = getDatabase(app);
export const auth = getAuth(app);


