import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDebugValue, useEffect, useState } from 'react';

export default function useSignIn() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const auth = getAuth();

	async function signIn(email, password) {
		setIsPending(true);
		setError(null);
		try {
			// sign in user
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			console.log(user);

			// debugging
			useDebugValue(user, (user) => `user info: ${user}`);

			if (!user) {
				throw new Error('Could not complete sign in');
			}

			//   update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
			// handle error
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

	return { signIn, isPending, error };
}
