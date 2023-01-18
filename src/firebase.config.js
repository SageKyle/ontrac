// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firebase-firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBfjddvjRBPYE8TKJoukJRRTEoA1Xntkpg',
	authDomain: 'ontrac-1.firebaseapp.com',
	projectId: 'ontrac-1',
	storageBucket: 'ontrac-1.appspot.com',
	messagingSenderId: '774387658498',
	appId: '1:774387658498:web:f7d07057ade86a2501dc1b',
	measurementId: 'G-K9CS911ZSN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
