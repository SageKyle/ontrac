import { useState } from 'react';
import { Link } from 'react-router-dom';
import useForgotPassword from '../../hooks/auth/useForgotPassword';
import ErrorModal from '../../utils/modals/ErrorModal';

// icons
import { HiOutlineMail } from 'react-icons/hi';

export default function SignUp() {
	// form states
	const [email, setEmail] = useState('');

	const { resetPassword, isPending, error } = useForgotPassword();

	// Signup user
	async function handleSubmit(e) {
		e.preventDefault();
		await resetPassword(email);
	}

	return (
		<form
			className="flex flex-col w-[100%] md:w-4/5 lg:w-2/4 mx-auto items-center justify-center min-h-[85vh]"
			onSubmit={handleSubmit}
		>
			<h1 className="capitalize text-3xl font-bold mb-10">OnTrac</h1>
			<h3 className="capitalize text-1xl font-bold mb-[4rem]">
				reset password
			</h3>
			<p className="my-4">Enter your Email to receive a password reset link</p>

			<label className="border-b-2 pb-1 flex items-center w-full border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2 text-2xl">
					<HiOutlineMail />
				</span>
				<input
					required
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					title="Enter your email"
					placeholder="Email"
					className="bg-transparent outline-0 border-0 w-[95%]"
				/>
			</label>

			<Link to={'/sign-in'} className="my-4 text-lg text-[#F9A826]">
				Sign In Instead
			</Link>

			{error && (
				<ErrorModal>
					<p>{error}</p>
				</ErrorModal>
			)}

			{isPending && (
				<button
					className="px-6 py-3 my-4 rounded w-full text-gray-200 capitalize bg-gray-700 text-2xl"
					disabled
				>
					Loading
				</button>
			)}
			{!isPending && (
				<button className="px-6 py-3 my-4 rounded w-full bg-emerald-500 text-white hover:bg-transparent border-2 border-emerald-500 capitalize text-2xl ">
					send reset link
				</button>
			)}
			<p className="mt-4">
				Don't have an account?{' '}
				<Link to={'/sign-up'} className="text-[#F9A826]">
					Sign up
				</Link>
			</p>
		</form>
	);
}
