import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import { useAuthContext } from './useAuthContext';

export default function useSignUp() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const auth = getAuth();
	const { dispatch } = useAuthContext();

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
			// add a username
			await updateProfile(auth.currentUser, { displayName: name });
			const user = userCredential.user;

			// add user info to db
			await setDoc(doc(db, 'users', user.uid), {
				name: user.displayName,
				email: user.email,
				timeStamp: serverTimestamp(),
			});

			if (!user) {
				throw new Error('Could not complete signup');
			}

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: user });

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

	return { signUp, isPending, error };
}
