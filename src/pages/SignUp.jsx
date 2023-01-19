import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

import AuthWithGoogle from '../components/AuthWithGoogle';
// icons
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { HiLockClosed, HiOutlineMail } from 'react-icons/hi';

export default function SignUp() {
	// form states
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const { signUp, isPending, error } = useSignUp();

	// Signup user
	function handleSubmit(e) {
		e.preventDefault();
		signUp(email, password, name);
		console.log('Signup successful');
		if (!error) {
			setTimeout(() => {
				navigate('/');
			}, 3000);
		}
	}

	return (
		<form
			className="flex flex-col w-[100%] mb-[6rem] items-center justify-center h-[85vh]"
			onSubmit={handleSubmit}
		>
			<h1 className="capitalize text-3xl font-bold mb-10">Register</h1>
			<h1 className="capitalize text-1xl font-bold mb-[4rem]">
				welcome to OnTrac
			</h1>

			<label className="border-b-2 pb-1 flex items-center w-3/4 border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2 text-2xl">
					<FaUserAlt />
				</span>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					title="Enter your full name"
					placeholder="Full Name"
					className="bg-transparent outline-0 border-0 w-100"
				/>
			</label>

			<label className="border-b-2 pb-1 flex items-center w-3/4 border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2 text-2xl">
					<HiOutlineMail />
				</span>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					title="Enter your email"
					placeholder="Email"
					className="bg-transparent outline-0 border-0 w-100"
				/>
			</label>
			<label className="border-b-2 pb-1 flex items-center w-3/4 border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2 text-2xl">
					<HiLockClosed />
				</span>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					title="Enter your password"
					placeholder="Password"
					className="bg-transparent outline-0 border-0"
				/>
			</label>
			<Link
				to={'/'}
				className="ml-auto w-3/4 capitalize mt-2 flex items-center  hover:text-white"
			>
				Forgot password?{'  '}
				<BsBoxArrowUpRight className="text-2xl" />
			</Link>
			{error && <p className="text-red">{error}</p>}
			<div className="px-6 py-3 my-4 rounded bg-emerald-500 text-white hover:bg-transparent border-2 border-emerald-500">
				{isPending && (
					<button className="capitalize text-2xl " disabled>
						Loading
					</button>
				)}
				{!isPending && (
					<button className="capitalize text-2xl ">get started</button>
				)}
			</div>
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
