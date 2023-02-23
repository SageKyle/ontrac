import { getAuth } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const auth = getAuth();

async function fetchAllTasks() {
	let result = [];

	try {
		// get current user
		const user = auth.currentUser;

		// get docs
		const docRef = collection(db, 'tasks');
		const docQuery = query(
			docRef,
			where('userId', '==', user.uid),
			orderBy('createdAt', 'desc')
		);

		const tasks = await getDocs(docQuery);

		tasks?.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() });
		});

		if (!tasks) {
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
		const docRef = collection(db, 'notes');
		const docQuery = query(
			docRef,
			where('userId', '==', user.uid),
			orderBy('createdAt', 'desc')
		);

		const notes = await getDocs(docQuery);

		// add docs
		notes?.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() });
		});

		if (!notes) {
			throw new Error('Something went wrong...');
		}
	} catch (err) {
		console.log(err);
	}

	return result;
}

export { fetchAllNotes, fetchAllTasks };
