import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { projectFirestore } from '../firebase.config';

export default function useSignUp() {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const auth = getAuth();

	async function signUp(email, password) {
		setIsPending(true);
		setError(null);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log(user);

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
