import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: 'blog-app-11b63.firebaseapp.com',
    projectId: 'blog-app-11b63',
    storageBucket: 'blog-app-11b63.appspot.com',
    messagingSenderId: '986021894381',
    appId: '1:986021894381:web:66293aa27ad00be12894e4',
};

export const app = initializeApp(firebaseConfig);
