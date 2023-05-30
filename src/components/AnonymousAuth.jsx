import { FaUserSecret } from 'react-icons/fa';

export default function AnonymousAuth() {
	return (
		<>
			<button
				title="Sign in anonymously"
				type="button"
				className="p-2 flex justify-center items-center border-2 border-white bg-white text-slate-600 rounded hover:bg-transparent hover:text-white transition ease-in-out"
			>
				<FaUserSecret className="inline-block text-3xl" />
				{/* <span className="capitalize text-2xl">continue with google</span> */}
			</button>
		</>
	);
}
