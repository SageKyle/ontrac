import { getAuth, signInAnonymously } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import { useAuthContext } from './useAuthContext';

export default function useAnonymousAuth() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const auth = getAuth();
	const navigate = useNavigate();
	const { dispatch } = useAuthContext();

	async function anonymousSignIn() {
		setIsPending(true);
		setError(null);
		try {
			// sign in user
			const userCredential = await signInAnonymously(auth);

			const user = userCredential.user;

			// add user info to db
			await setDoc(doc(db, 'users', user.uid), {
				name: user.displayName,
				email: user.email,
				timeStamp: serverTimestamp(),
			});

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

			navigate('/');

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

	return { anonymousSignIn, isPending, error };
}
