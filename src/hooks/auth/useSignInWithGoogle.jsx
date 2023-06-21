import {
	GoogleAuthProvider,
	getAuth,
	getRedirectResult,
	linkWithRedirect,
	signInWithRedirect,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import { useAuthContext } from './useAuthContext';

export default function useSignInWithGoogle() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	const { dispatch } = useAuthContext();

	const isAnnon = auth?.currentUser?.isAnonymous;

	async function signInWithGoogle(upgrade) {
		setIsPending(true);
		setError(null);
		try {
			// check if there's an anonymous user data
			// also check if user wants to upgrade anonymous account
			// if yes, upgrade the account to a registered user
			if (isAnnon && upgrade) {
				await linkWithRedirect(auth.currentUser, provider);

				const result = await getRedirectResult(auth);
				const credential = GoogleAuthProvider.credentialFromResult(result);

				if (credential) {
					setUser(result.user);
				}
			} else {
				console.log('button clicked');
				// sign in user
				await signInWithRedirect(auth, provider);

				const result = await getRedirectResult(auth);

				setUser(result.user);
			}

			console.log(user);

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
