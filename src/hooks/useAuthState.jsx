import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDebugValue, useEffect, useState } from 'react';

export default function useAuthState() {
	const [isPending, setIsPending] = useState(false);
	const [authState, setAuthState] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsPending(true);
		setError(null);
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const currentUser = auth.currentUser;
				setUser(currentUser);
				setIsPending(false);
				setError(null);
			}
			setAuthState(true);
		});
	}, []);

	useDebugValue(user, (user) => `current user: ${user}`);

	return { user, authState, isPending, error };
}
