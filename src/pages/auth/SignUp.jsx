import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/auth/useSignUp';

import AuthWithGoogle from '../../components/AuthWithGoogle';
import ErrorModal from '../../utils/modals/ErrorModal';
// icons
import { FaUserAlt } from 'react-icons/fa';
import {
	HiLockClosed,
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineMail,
} from 'react-icons/hi';

export default function SignUp() {
	// form states
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const { signUp, isPending, error } = useSignUp();

	// Signup user
	async function handleSubmit(e) {
		e.preventDefault();
		await signUp(email, password, name);
		// if (!error) {
		setTimeout(() => {
			navigate('/');
		}, 3000);
		// }
	}

	return (
		<form
			className="flex flex-col w-[100%] md:w-4/5 lg:w-2/4 mx-auto items-center justify-center min-h-[85vh]"
			onSubmit={handleSubmit}
		>
			<h1 className="capitalize text-3xl font-bold mb-10">Register</h1>
			<h1 className="capitalize text-1xl font-bold mb-[4rem]">
				welcome to OnTrac
			</h1>

			<label className="border-b-2 pb-1 flex items-center w-full border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2 text-2xl">
					<FaUserAlt />
				</span>
				<input
					required
					autoFocus
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					title="Enter your full name"
					placeholder="Full Name"
					className="bg-transparent outline-0 border-0 w-[95%]"
				/>
			</label>

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
					className="bg-transparent outline-0 border-0 w-100"
				/>
			</label>
			<label className="border-b-2 pb-1 flex items-center w-full border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2 text-2xl">
					<HiLockClosed />
				</span>
				<input
					required
					type={showPassword ? 'text' : 'password'}
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
				Already have an account?{' '}
				<Link to={'/sign-in'} className="text-[#F9A826]">
					Sign in
				</Link>
			</p>
			<AuthWithGoogle />
		</form>
	);
}

// TODO verify users once they signup to prevent spamming
