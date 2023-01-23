import { getAuth } from 'firebase/auth';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useId, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';

export default function useAddTodo() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const docID = useId();
	// const navigate = useNavigate();
	const auth = getAuth();

	async function addDocument(newTodo) {
		setIsPending(true);
		setError(null);

		try {
			// get current user
			const user = auth.currentUser;
			// add doc
			const todo = {
				...newTodo,
				completed: false,
				createdAt: serverTimestamp(),
			};

			// const docRef = await setDoc(doc(db, 'todos', user.uid), {
			// 	todo: [...oldDoc, todo],
			// });

			await setDoc(collection(db, user.displayName), {
				todo,
			});

			if (!docRef) {
				throw new Error('Something went wrong...');
			}

			//   update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, isPending, error };
}
