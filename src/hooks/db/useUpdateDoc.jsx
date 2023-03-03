import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';

export default function useUpdateDoc(collection) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	async function updateDocument(id, updates) {
		let updatedDoc = null;
		setIsPending(true);
		setError(null);

		try {
			await updateDoc(doc(db, collection, id), {
				...updates,
			});

			setTimeout(() => {
				navigate('/');
			}, 2000);

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
