import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from './useAuthContext';

export default function useLogout() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const auth = getAuth();
	const { dispatch } = useAuthContext();

	async function logout() {
		setIsPending(true);
		setError(null);
		try {
			// sign out user
			await signOut(auth);

			// dispatch logout action
			dispatch({ type: 'LOGOUT' });

			setTimeout(() => {
				navigate('/sign-in');
			}, 300);

			//   update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
			// handle error
		} catch (err) {
			if (!isCancelled) {
				console.error(err.message);
				toast.error(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { logout, isPending, error };
}
