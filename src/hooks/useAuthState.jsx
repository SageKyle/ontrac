import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

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
			}
			setAuthState(true);
			setIsPending(false);
			setError(null);
		});
	}, [auth]);

	return { user, authState, isPending, error };
}
