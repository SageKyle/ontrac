import { Link } from 'react-router-dom';

export default function FallbackRoute() {
	return (
		<main className="w-full text-center p-4">
			<h1 className="text-3xl font-bold my-8">404</h1>
			<h3>Oops! The page you're looking for cannot be found.</h3>
			<Link to={'/'} className="underline text-[#fad6a5] inline-block mt-2">
				Back to home
			</Link>
		</main>
	);
}

// TODO still requires improvement to UI --> add a cool descriptive image
