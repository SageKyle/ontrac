import { FaUserSecret } from 'react-icons/fa';
import useAnonymousAuth from '../hooks/auth/useAnonymousAuth';

export default function AnonymousAuth() {
	const { anonymousSignIn } = useAnonymousAuth();

	return (
		<>
			<button
				title="Sign in anonymously"
				type="button"
				onClick={anonymousSignIn}
				className="p-2 w-full flex justify-center items-center border-2 border-white bg-white text-slate-600 rounded hover:bg-transparent hover:text-white transition ease-in-out"
			>
				<FaUserSecret className="inline-block text-3xl" />
				{/* <span className="capitalize text-2xl">continue with google</span> */}
			</button>
		</>
	);
}
