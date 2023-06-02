import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import AlternativeAuth from '../../components/AlternativeAuth';
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
import Avatar from '../../assets/login-avatar.png';

export default function SignIn() {
	// form states
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const { signIn, isPending, error } = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Sign in user
	async function handleFormSubmit() {
		// e.preventDefault();
		await signIn(formData.email, formData.password);
	}

	return (
		<main className="w-full min-h-screen flex items-center justify-center">
			<form
				className="flex flex-col px-8 my-16 bg-[#252d58] shadow-sm shadow-slate-900 w-[100%] md:w-4/5 lg:w-2/4 h-fit items-center justify-center max-w-[40rem]"
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<h1 className="h-20 mt-[-2.5rem] bg-inherit rounded-full mb-10">
					<img
						src={Avatar}
						alt="Login"
						role="title"
						className="w-20 h-full mx-auto"
					/>
				</h1>
				<h3 className="capitalize text-1xl font-bold mb-[4rem]">
					welcome back!
				</h3>
				<div className="flex flex-col space-y-2 w-full mb-10">
					<label className="border-b-2 pb-1 flex items-center w-full border-slate-700">
						{' '}
						<span className="uppercase inline-block mr-2 text-2xl">
							<HiOutlineMail />
						</span>
						<input
							{...register('email', { required: 'Enter a valid email!' })}
							type="email"
							id="email"
							aria-invalid={errors.email ? 'true' : 'false'}
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							title="Enter your email"
							placeholder="Email"
							className="bg-transparent outline-0 border-0 w-full"
						/>
					</label>
					{/* email input error message */}
					{errors.email && (
						<small className="text-yellow-500">{errors.email?.message}</small>
					)}
				</div>

				<div className="flex flex-col space-y-2 w-full mb-10">
					<label className="border-b-2 pb-1 flex relative items-center w-full border-slate-700">
						{' '}
						<span className="uppercase inline-block mr-2 text-2xl">
							<HiLockClosed />
						</span>
						<input
							{...register('password', {
								required: 'Enter a valid password (at least 6 characters)',
							})}
							type={showPassword ? 'text' : 'password'}
							id="password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							title="Enter your password"
							placeholder="Password"
							className="bg-transparent w-full outline-0 border-0"
						/>
						<div className="ml-auto mr-2 inline-block cursor-pointer absolute right-0 text-2xl">
							{showPassword && (
								<HiOutlineEye
									onClick={() => setShowPassword((prev) => !prev)}
								/>
							)}
							{!showPassword && (
								<HiOutlineEyeOff
									onClick={() => setShowPassword((prev) => !prev)}
								/>
							)}
						</div>
					</label>
					{/* password input errors */}
					{errors.password && (
						<small className="text-yellow-500">
							{errors.password?.message}
						</small>
					)}
				</div>
				<Link
					to={'/iforgot'}
					className="w-auto mx-auto justify-center items-center capitalize mt-2 flex  md:hover:text-gray-300"
				>
					<BsBoxArrowUpRight className="inline-block mr-2 text-sm" />
					Forgot password?
				</Link>
				{error && (
					<ErrorModal>
						<p>{error}</p>
					</ErrorModal>
				)}

				{isPending && (
					<button
						className="px-6 py-3 my-4 w-full rounded text-gray-200 capitalize bg-gray-700 text-2xl"
						disabled
					>
						Loading
					</button>
				)}
				{!isPending && (
					<button className="px-6 py-3 my-4 w-full rounded transition-all ease-in-out duration-300 bg-emerald-500 text-white md:hover:bg-transparent border-2 border-emerald-500 capitalize text-2xl ">
						login
					</button>
				)}
				<p className="mt-4">
					Don't have an account yet?{' '}
					<Link to={'/sign-up'} className="text-[#F9A826]">
						Sign Up
					</Link>
				</p>
				<AlternativeAuth />
			</form>
		</main>
	);
}
