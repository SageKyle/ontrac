import { FcGoogle } from 'react-icons/fc';
import useSignInWithGoogle from '../hooks/auth/useSignInWithGoogle';
// import ErrorModal from '../utils/modals/ErrorModal';

export default function AuthWithGoogle() {
	const { signInWithGoogle, error } = useSignInWithGoogle();

	return (
		<>
			{/* <div className="flex w-full justify-center item-center my-6">
				<span className="uppercase text-2xl">or</span>
			</div>
			{error && (
				<ErrorModal>
					<p>{error}</p>
				</ErrorModal>
			)} */}
			<button
				title="Sign in with Google"
				type="button"
				onClick={signInWithGoogle}
				className="w-full p-2 flex justify-center items-center border-2 border-white bg-white text-slate-600 rounded hover:bg-transparent hover:text-white transition ease-in-out"
			>
				<FcGoogle className="inline-block text-3xl" />
				{/* <span className="capitalize text-2xl">continue with google</span> */}
			</button>
		</>
	);
}
