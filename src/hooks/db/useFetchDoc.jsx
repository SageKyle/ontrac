import { getAuth } from 'firebase/auth';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const auth = getAuth();

async function fetchAllTasks() {
	let result = [];

	try {
		// get current user
		const user = auth.currentUser;

		// get docs
		const docRef = await getDocs(
			collection(db, 'tasks'),
			orderBy('createdAt', 'desc')
		);

		docRef?.forEach((doc) => {
			let singleDoc = doc.data();
			// check if the doc was created by the current user
			if (singleDoc.userId === user.uid) {
				result.push(doc);
			}
		});

		if (!docRef) {
			throw new Error('Something went wrong...');
		}
	} catch (err) {
		console.log(err);
	}

	return result;
}

async function fetchAllNotes() {
	let result = [];

	try {
		// get current user
		const user = auth.currentUser;

		// get docs
		const docRef = await getDocs(
			collection(db, 'notes'),
			orderBy('createdAt', 'desc')
		);

		docRef?.forEach((doc) => {
			let singleDoc = doc.data();
			// check if the doc was created by the current user
			if (singleDoc.userId === user.uid) {
				result.push(doc);
			}
		});

		if (!docRef) {
			throw new Error('Something went wrong...');
		}
	} catch (err) {
		console.log(err);
	}

	return result;
}

export { fetchAllNotes, fetchAllTasks };
