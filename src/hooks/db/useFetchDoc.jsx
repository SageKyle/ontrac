import { getAuth } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

// auth
const auth = getAuth();

// fetch all tasks
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
			orderBy('createdAt', 'desc'),
			orderBy('starred', 'desc'),
			orderBy('completed', 'desc')
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

// fetch all notes
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

// fetch single note
async function fetchSingleNote(id) {
	let result = [];

	try {
		// get docs
		const docRef = doc(db, 'notes', id);
		const note = await getDoc(docRef);

		if (!note.exists()) {
			throw new Error('Something went wrong...');
		}

		// add docs
		result.push({ id: note.id, ...note.data() });
	} catch (err) {
		console.log(err);
	}

	return result;
}

export { fetchAllNotes, fetchAllTasks, fetchSingleNote };
