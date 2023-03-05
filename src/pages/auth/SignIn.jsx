import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthWithGoogle from '../../components/AuthWithGoogle';
import useSignIn from '../../hooks/auth/useSignIn';
import ErrorModal from '../../utils/modals/ErrorModal';
// icons
import { BsBoxArrowUpRight } from 'react-icons/bs';
import {
	HiLockClosed,
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineMail,
} from 'react-icons/hi';

export default function SignIn() {
	// form states
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { signIn, isPending, error } = useSignIn();

	// Sign in user
	async function handleSubmit(e) {
		e.preventDefault();
		await signIn(email, password);
	}

	return (
		<form
			className="flex flex-col w-[100%] md:w-4/5 lg:w-2/4 mx-auto items-center justify-center min-h-[85vh]"
			onSubmit={handleSubmit}
		>
			<h1 className="capitalize text-3xl font-bold mb-10">log in</h1>
			<h3 className="capitalize text-1xl font-bold mb-[4rem]">welcome back!</h3>
			<label className="border-b-2 pb-1 flex items-center w-full border-slate-700 mb-10">
				{' '}
				<span className="uppercase text-2xl inline-block mr-2">
					<HiOutlineMail />
				</span>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					autoFocus
					title="Enter your email"
					placeholder="Email"
					className="bg-transparent w-[95%] outline-0 border-0"
				/>
			</label>
			<label className="border-b-2 flex items-center pb-1 w-full border-slate-700 mb-10">
				{' '}
				<span className="uppercase text-2xl inline-block mr-2">
					<HiLockClosed />
				</span>
				<input
					type={showPassword ? 'text' : 'password'}
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					title="Enter your password"
					placeholder="Password"
					className="bg-transparent w-[90%] outline-0 border-0"
				/>
				<div className="ml-auto mr-2 inline-block text-2xl">
					{showPassword && (
						<HiOutlineEye onClick={() => setShowPassword((prev) => !prev)} />
					)}
					{!showPassword && (
						<HiOutlineEyeOff onClick={() => setShowPassword((prev) => !prev)} />
					)}
				</div>
			</label>
			<Link
				to={'/iforgot'}
				className="w-full justify-center capitalize mt-2 flex  hover:text-white"
			>
				Forgot password?
				<BsBoxArrowUpRight className="inline-block ml-2 text-2xl" />
			</Link>
			{error && (
				<ErrorModal>
					<p>{error}</p>
				</ErrorModal>
			)}

			{isPending && (
				<button
					className="px-6 py-3 my-4 rounded text-gray-200 capitalize bg-gray-700 text-2xl"
					disabled
				>
					Loading
				</button>
			)}
			{!isPending && (
				<button className="px-6 py-3 my-4 rounded bg-emerald-500 text-white hover:bg-transparent border-2 border-emerald-500 capitalize text-2xl ">
					get started
				</button>
			)}
			<p className="mt-4">
				Don't have an account yet?{' '}
				<Link to={'/sign-up'} className="text-[#F9A826]">
					Sign Up
				</Link>
			</p>
			<AuthWithGoogle />
		</form>
	);
}
