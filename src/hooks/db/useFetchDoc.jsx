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

		console.log(tasks);

		tasks?.forEach((doc) => {
			result.push(doc);
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

		// const docRef = await getDocs(
		// 	collection(db, 'notes'),
		// 	orderBy('createdAt', 'desc')
		// );

		notes?.forEach((doc) => {
			result.push(doc);
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
