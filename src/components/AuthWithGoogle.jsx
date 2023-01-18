import { AiFillGoogleCircle } from 'react-icons/ai';

export default function AuthWithGoogle() {
	return (
		<section className="">
			<div className="flex w-full justify-center item-center my-6">
				<span className="uppercase text-2xl">or</span>
			</div>

			<button className="w-full p-4 flex justify-center items-center border-2 border-white bg-white text-slate-600 rounded hover:bg-transparent hover:text-white transition ease-in-out">
				<AiFillGoogleCircle className="inline-block mr-2 text-2xl" />
				<span className="capitalize text-2xl">continue with google</span>
			</button>
		</section>
	);
}
