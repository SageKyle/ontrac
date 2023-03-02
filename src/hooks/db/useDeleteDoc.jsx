import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase/firebase.config';

export default function useDeleteDoc(collection) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	async function deleteDocument(id) {
		setIsPending(true);
		setError(null);

		try {
			await deleteDoc(doc(db, collection, id));

			setIsPending(false);
			setError(null);
		} catch (err) {
			console.error(err.message);
			setIsPending(false);
			setError(err);
		}
	}

	return { deleteDocument, isPending, error };
}
