import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useLogout() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const auth = getAuth();

	async function logout() {
		setIsPending(true);
		setError(null);
		try {
			// sign out user
			await signOut(auth);
			setIsPending(false);

			navigate('/sign-in');

			//   update state
			if (!isCancelled) {
				toast.success('Logout successful');
				setIsPending(false);
				setError(null);
			}
			// handle error
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message);
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
