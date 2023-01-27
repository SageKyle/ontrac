// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';

// toast
import { toast } from 'react-toastify';

// Your web app's Firebase configuration
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
getAnalytics(app);

export const db = getFirestore();
export const projectAuth = getAuth(app);

// enable offline querrying
enableIndexedDbPersistence(db).catch((err) => {
	if (err.code == 'failed-precondition') {
		// Multiple tabs open, persistence can only be enabled
		// in one tab at a time.
		// ...
		toast.info('Multiple tabs not allowed in offline mode');
	} else if (err.code == 'unimplemented') {
		// The current browser does not support all of the
		// features required to enable persistence
		// ...
		toast.info("Your browser doesn't support offline storage");
	}
});
