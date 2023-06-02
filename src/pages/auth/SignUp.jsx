import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/auth/useSignUp';

import AlternativeAuth from '../../components/AlternativeAuth';
import ErrorModal from '../../utils/modals/ErrorModal';
// icons
import { FaUserAlt } from 'react-icons/fa';
import {
	HiLockClosed,
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineMail,
} from 'react-icons/hi';
import Avatar from '../../assets/login-avatar.png';

export default function SignUp() {
	// form states
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const { signUp, isPending, error } = useSignUp();

	// Signup user
	async function handleFormSubmit() {
		// e.preventDefault();
		await signUp(formData.email, formData.password, formData.name);
		if (!error) {
			setTimeout(() => {
				navigate('/');
			}, 3000);
		}
	}

	return (
		<article className="w-full min-h-screen flex items-center justify-center">
			<form
				className="flex flex-col px-4 md:px-8 my-16 bg-[#252d58] shadow-sm shadow-slate-900 w-[100%] md:w-4/5 lg:w-2/4 h-fit items-center justify-center max-w-[40rem]"
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
				<h1 className="capitalize text-1xl font-bold mb-[4rem]">
					welcome to OnTrac 👋
				</h1>
				<div className="flex flex-col space-y-2 w-full mb-10">
					<label className="border-b-2 pb-1 flex items-center w-full border-slate-700">
						{' '}
						<span className="uppercase inline-block mr-2 text-2xl">
							<FaUserAlt />
						</span>
						<input
							type="text"
							id="name"
							aria-invalid={errors.name ? 'true' : 'false'}
							{...register('name', {
								required: 'Enter a valid username!',
								minLength: 4,
								maxLength: 15,
							})}
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							title="Enter your full name"
							placeholder="Full Name"
							className="bg-transparent outline-0 border-0 w-full"
						/>
					</label>
					{/* name input error message */}
					{errors.name && (
						<small className="text-yellow-500">{errors.name?.message}</small>
					)}
				</div>
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
								required: 'Enter a strong password of at least 6 characters',
								minLength: 6,
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
					{/* other password input errors */}
					{errors.password && (
						<small className="text-yellow-500">
							{errors.password?.message}
						</small>
					)}
					{/* password too short/long */}
					{errors.password?.type === 'minLength' && (
						<small className="text-yellow-500">
							Password should be at least 6 characters!
						</small>
					)}
				</div>

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
					<button className="px-6 py-3 my-4 rounded w-full bg-emerald-500 text-white transition-all ease-in-out duration-300 md:hover:bg-transparent border-2 border-emerald-500 capitalize text-2xl ">
						get started
					</button>
				)}
				<p className="mt-4">
					Already have an account?{' '}
					<Link to={'/sign-in'} className="text-[#F9A826]">
						Login
					</Link>
				</p>
				<AlternativeAuth />
			</form>
		</article>
	);
}

// TODO verify users once they signup to prevent spamming
