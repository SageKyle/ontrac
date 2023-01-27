import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';

export default function useFetchDoc(firestoreCollection) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [docs, setDocs] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		async function fetchDoc() {
			setIsPending(true);
			setError(null);

			try {
				// get current user
				const user = auth.currentUser;

				// get docs
				const docRef = await getDocs(collection(db, firestoreCollection));

				let result = [];

				docRef?.forEach((doc) => {
					let singleDoc = doc.data();
					// check if the doc was created by the current user
					if (singleDoc.id === user.uid) {
						result.push(singleDoc);
					}
				});

				if (!docRef) {
					throw new Error('Something went wrong...');
				}

				//   update state
				setDocs(result);
				setIsPending(false);
				setError(null);
			} catch (err) {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
		return () => fetchDoc();
	}, [firestoreCollection]);

	return { docs, isPending, error };
}
