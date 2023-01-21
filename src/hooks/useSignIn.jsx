import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDebugValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useSignIn() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
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

			toast.success('Sign in successful');
			// debugging
			useDebugValue(user, (user) => `user info: ${user}`);

			if (!user) {
				throw new Error('Could not complete sign in');
			} else {
				setTimeout(() => {
					navigate('/');
				}, 3000);
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
				toast.error(err.message);
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { signIn, isPending, error };
}
