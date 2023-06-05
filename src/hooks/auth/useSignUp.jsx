import {
	EmailAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	linkWithCredential,
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
	const [user, setUser] = useState(null);
	const auth = getAuth();
	const { dispatch } = useAuthContext();

	async function signUp(email, password, name, upgrade) {
		setIsPending(true);
		setError(null);
		try {
			// check if there's an anonymous user data
			// also check if user wants to upgrade anonymous account
			// if yes, upgrade the account to a registered user
			if (auth.currentUser.isAnonymous && upgrade) {
				const credential = EmailAuthProvider.credential(email, password);
				const userCredential = await linkWithCredential(
					auth.currentUser,
					credential
				);
				setUser(userCredential.user);
			} else {
				// signup user to a new account
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

				setUser(userCredential.user);
			}
			// add a username
			await updateProfile(auth.currentUser, { displayName: name });

			// add user info to db
			await setDoc(doc(db, 'users', user?.uid), {
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
