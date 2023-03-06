import { getAuth } from 'firebase/auth';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';

// auth
const auth = getAuth();

export default function useFetchDoc(firestoreCollection) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		// fetch all tasks
		setError(null);
		setIsPending(true);
		async function fetchAllDocs() {
			try {
				// get current user
				const user = auth.currentUser;

				// get docs
				const docRef = collection(db, firestoreCollection);
				const docQuery = query(
					docRef,
					where('userId', '==', user.uid),
					orderBy('createdAt', 'desc'),
					orderBy('starred', 'desc')
				);

				// set
				const unsub = onSnapshot(docQuery, (snapshot) => {
					const result = [];
					snapshot.forEach((doc) => {
						result.push({ id: doc.id, ...doc.data() });
					});
					setData(result);
				});

				// unsub();
				setError(null);
				setIsPending(false);
			} catch (err) {
				console.error(err);
				setError(err);
				setIsPending(false);
			}
		}
		return () => fetchAllDocs();
	}, []);

	return { data, error, isPending };
}
