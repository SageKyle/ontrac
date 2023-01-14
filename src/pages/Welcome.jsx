import { Link } from 'react-router-dom';

// images
import TodoImage from '../assets/intro-img.svg';

export default function Welcome() {
	return (
		<section className="flex h-screen flex-col items-center justify-center">
			<img className="w-auto h-1/3" src={TodoImage} alt="welcome on board" />
			<h2 className="text-2xl font-bold my-5 capitalize">
				organize your life, work smarter
			</h2>
			<p className="text-1xl w-80">
				OnTrac is an intuitively simple personal manager that makes it easier
				for you to manage your time.
			</p>
			<Link
				className="px-6 py-3 my-4 rounded bg-emerald-500 text-white"
				to={'/'}
			>
				<button className="capitalize text-2xl " type="submit">
					get started
				</button>
			</Link>
		</section>
	);
}

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
		d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
	/>
</svg>;
