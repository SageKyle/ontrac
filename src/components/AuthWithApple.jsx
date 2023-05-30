import { AiFillApple } from 'react-icons/ai';

export default function AuthWithApple() {
	return (
		<>
			<button
				title="Sign in with iCloud"
				type="button"
				disabled
				// onClick={signInWithGoogle}
				className="w-full p-2 flex justify-center items-center border-2 border-white bg-white opacity-25 text-slate-600 rounded hover:bg-transparent hover:text-white transition ease-in-out"
			>
				<AiFillApple className="inline-block text-3xl" />
				{/* <span className="capitalize text-2xl">continue with google</span> */}
			</button>
		</>
	);
}
