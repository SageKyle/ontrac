import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';

export default function useSignInWithGoogle() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	const { dispatch } = useAuthContext();

	async function signInWithGoogle() {
		setIsPending(true);
		setError(null);
		try {
			// sign in user
			const userCredential = await signInWithRedirect(auth, provider);

			const user = userCredential.user;

			if (!user) {
				throw new Error('Could not complete sign in');
			}

			// dispatch sign-in action
			dispatch({ type: 'LOGIN', payload: user });

			//   update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
			// handle error
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

	return { signInWithGoogle, isPending, error };
}
