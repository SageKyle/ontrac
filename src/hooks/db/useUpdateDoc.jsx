import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase/firebase.config';

export default function useUpdateDoc(collection) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	async function updateDocument(id, updates) {
		let updatedDoc = null;
		setIsPending(true);
		setError(null);

		try {
			const updatedDoc = await updateDoc(doc(db, collection, id), {
				...updates,
			});

			if (!updatedDoc) {
				throw new Error('Something went wrong...');
			}

			setIsPending(false);
			setError(null);
		} catch (err) {
			console.error(err.message);
			setIsPending(false);
			setError(err);
		}

		return updatedDoc;
	}

	return { updateDocument, isPending, error };
}
