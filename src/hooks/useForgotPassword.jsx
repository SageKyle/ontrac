import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useForgotPassword() {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const auth = getAuth();

	async function resetPassword(email) {
		setIsPending(true);
		setError(null);
		try {
			// sign in user
			await sendPasswordResetEmail(auth, email);
			setIsPending(false);

			console.log('going home');
			setError('Resent link sent to ' + email);
			// if (user) {
			setTimeout(() => {
				navigate('/sign-in');
			}, 3000);
			// }

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
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { resetPassword, isPending, error };
}
