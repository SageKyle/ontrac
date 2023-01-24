import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDebugValue, useEffect, useState } from 'react';

export default function useAuthState() {
	const [isPending, setIsPending] = useState(false);
	const [authState, setAuthState] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		setIsPending(true);
		setError(null);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const currentUser = auth.currentUser;
				setUser(currentUser);
				setIsPending(false);
				setError(null);
			}
			setAuthState(true);
		});
	}, [auth]);

	useDebugValue(user, (user) => `current user: ${user}`);

	return { user, authState, isPending, error };
}
