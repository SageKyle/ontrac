import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export default function useSignIn() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const auth = getAuth();
	const { dispatch } = useAuthContext();

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

			if (!user) {
				throw new Error('Could not complete sign in');
			} else {
				setTimeout(() => {
					navigate('/');
				}, 3000);
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

	return { signIn, isPending, error };
}
