import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

import AuthWithGoogle from '../components/AuthWithGoogle';

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
		signUp(email, password);
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

			<label className="border-b-2 pb-2 flex w-3/4 border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
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

			<label className="border-b-2 pb-2 flex w-3/4 border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
						/>
					</svg>
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
			<label className="border-b-2 flex pb-2 w-3/4 border-slate-700 mb-10">
				{' '}
				<span className="uppercase inline-block mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
						/>
					</svg>
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
				className="ml-auto w-3/4 capitalize mt-2 flex  hover:text-white"
			>
				Forgot password?{'  '}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 ml-2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
					/>
				</svg>
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
