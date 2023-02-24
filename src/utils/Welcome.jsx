import { Link } from 'react-router-dom';

// images
import TaskImage from '../assets/intro-img.svg';

export default function Welcome({ setNotFirstTime }) {
	return (
		<section className="flex h-screen flex-col items-center justify-center">
			<img
				className="w-auto mb-5 h-1/3"
				src={TaskImage}
				alt="welcome on board"
			/>
			<h2 className="text-2xl font-bold my-5 capitalize">
				organize your life, work smarter
			</h2>
			<p className="text-1xl w-80 mx-auto">
				OnTrac is an intuitively simple personal manager that makes it easier
				for you to manage your time.
			</p>
			<Link
				className="px-6 py-3 my-4 rounded bg-emerald-500 text-white"
				to={'/'}
				onClick={() => setNotFirstTime(true)}
			>
				<button className="capitalize text-2xl " type="submit">
					get started
				</button>
			</Link>
		</section>
	);
}
