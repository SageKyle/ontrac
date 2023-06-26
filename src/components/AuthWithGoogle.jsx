import { FcGoogle } from 'react-icons/fc'
import useSignInWithGoogle from '../hooks/auth/useSignInWithGoogle'
// import ErrorModal from '../utils/modals/ErrorModal';

export default function AuthWithGoogle() {
	const { signInWithGoogle, error } = useSignInWithGoogle()

	return (
		<>
			<button
				title="Sign in with Google"
				type="button"
				onClick={signInWithGoogle}
				className="w-full p-2 flex justify-center items-center gap-4  bg-slate-50 text-slate-600 rounded-full lg:rounded hover:bg-slate-200 transition ease-in-out"
			>
				<FcGoogle className="inline-block text-3xl" />
				<span className="capitalize font-semibold lg:text-xl">
					<span className="lg:hidden">continue with</span> google
				</span>
			</button>
		</>
	)
}
