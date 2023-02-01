import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';

export default function useUpdateDoc(firestoreCollection) {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	async function updateDocument(id, updates) {
		setIsPending(true);
		setError(null);

		try {
			const updatedDocument = await updateDoc(
				doc(db, firestoreCollection, id),
				{ ...updates }
			);

			if (!updatedDocument) {
				throw new Error('Something went wrong...');
			}

			//   update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
			return updatedDocument;
		} catch (err) {
			if (!isCancelled) {
				console.error(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { updateDocument, isPending, error };
}
