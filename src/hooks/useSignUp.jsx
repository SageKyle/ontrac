import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useDebugValue, useState } from 'react';
import { db } from '../firebase.config';

export default function useSignUp() {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const auth = getAuth();

	async function signUp(email, password, name) {
		setIsPending(true);
		setError(null);
		try {
			// signup user
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			useDebugValue(`user: ${user}`);

			await auth.updateCurrentUser({ displayName: name });

			// add user info to db
			const docRef = await addDoc(collection(db, 'users'), {
				name: user.displayName,
				email: user.email,
			});
			console.log(docRef);

			if (!user) {
				throw new Error('Could not complete signup');
			}

			setIsPending(false);
			setError(null);
		} catch (err) {
			console.log(err.message);
			setError(err.message);
			setIsPending(false);
		}
	}

	return { signUp, isPending, error };
}
