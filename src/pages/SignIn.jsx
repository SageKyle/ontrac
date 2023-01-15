import { Link } from 'react-router-dom';

export default function SignIn() {
	return (
		<form className="flex flex-col w-[100%] mb-[6rem] items-center justify-center h-[85vh]">
			<h1 className="capitalize text-3xl font-bold mb-10">log in</h1>
			<h1 className="capitalize text-1xl font-bold mb-[4rem]">welcome back!</h1>
			<label className="border-b-2 pb-2 flex w-[60%] border-slate-700 mb-10">
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
					type="email"
					id="email"
					title="Enter your email"
					placeholder="Email"
					className="bg-transparent outline-0 border-0 w-100"
				/>
			</label>
			<label className="border-b-2 flex pb-2 w-[60%] border-slate-700 mb-10">
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
					title="Enter your password"
					placeholder="Password"
					className="bg-transparent outline-0 border-0"
				/>
			</label>
			<Link to={'/'} className="ml-auto w-[60%] capitalize mt-2 flex">
				Forgot password?{' '}
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
						d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
					/>
				</svg>
			</Link>
			<Link
				className="px-6 py-3 my-4 rounded bg-emerald-500 text-white"
				to={'/'}
			>
				<button className="capitalize text-2xl " type="submit">
					get started
				</button>
			</Link>
			<p className="mt-4">
				Don't have an account yet?{' '}
				<Link className="text-[#F9A826]">Sign Up</Link>
			</p>
		</form>
	);
}
