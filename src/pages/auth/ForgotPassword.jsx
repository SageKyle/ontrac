import { useState } from 'react'
import { Link } from 'react-router-dom'
import useForgotPassword from '../../hooks/auth/useForgotPassword'
import ErrorModal from '../../utils/modals/ErrorModal'

// icons
import { HiOutlineMail } from 'react-icons/hi'

export default function SignUp() {
	// form states
	const [email, setEmail] = useState('')

	const { resetPassword, isPending, error } = useForgotPassword()

	// Signup user
	async function handleSubmit(e) {
		e.preventDefault()
		await resetPassword(email)
	}

	return (
		<section className="w-full h-screen flex items-center justify-center">
			<form
				className="flex flex-col m-auto p-8 bg-[#252d58] shadow-sm shadow-slate-900 w-full md:w-4/5 lg:w-2/4 h-fit items-center justify-center max-w-[40rem]"
				onSubmit={handleSubmit}
			>
				{/* <h1 className="capitalize text-3xl font-bold mb-10">OnTrac</h1> */}
				<h3 className="capitalize text-2xl font-bold mb-[4rem]">
					reset password
				</h3>
				<small className="mb-6">
					Enter your Email to receive a password reset link
				</small>

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
					<button className="px-6 py-3 my-4 rounded w-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all ease-in-out duration-300 capitalize text-2xl ">
						send reset link
					</button>
				)}
				<div className="flex gap-2 items-center justify-center text-[#F9A826] mt-4">
					<Link
						to={'/sign-in'}
						className="capitalize md:hover:text-gray-300 transition-all ease-in-out duration-300"
					>
						login
					</Link>
					{/* dot */}
					<span className="inline-block after:w-1 after:h-1 after:bg-slate-200 after:flex after:rounded-full"></span>
					<Link
						to={'/sign-up'}
						className="md:hover:text-gray-300 transition-all ease-in-out duration-300"
					>
						Register
					</Link>
				</div>
			</form>
		</section>
	)
}
