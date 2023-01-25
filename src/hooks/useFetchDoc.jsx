import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';

export default function useFetchDoc(firestoreCollection) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [docs, setDocs] = useState([]);
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
				// set docs
				docRef?.forEach((doc) => {
					let singleDoc = doc.data();
					// check if the doc was created by the current user
					if (singleDoc.id === user.uid) {
						setDocs((prevDocs) => [...prevDocs, singleDoc]);
					}
				});

				if (!docRef) {
					throw new Error('Something went wrong...');
				}

				//   update state
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
