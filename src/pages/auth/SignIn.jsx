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
		<form
			className="flex flex-col w-[100%] md:w-4/5 lg:w-2/4 mx-auto items-center justify-center min-h-[85vh]"
			onSubmit={handleSubmit(handleFormSubmit)}
		>
			<h1 className="capitalize text-3xl font-bold mb-10">log in</h1>
			<h3 className="capitalize text-1xl font-bold mb-[4rem]">welcome back!</h3>
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
							required: 'Enter a password of at least 6 characters',
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
							<HiOutlineEye onClick={() => setShowPassword((prev) => !prev)} />
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
					<small className="text-yellow-500">{errors.password?.message}</small>
				)}
			</div>
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
			<AlternativeAuth />
		</form>
	);
}
