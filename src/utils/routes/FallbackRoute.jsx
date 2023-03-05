import { Link } from 'react-router-dom';
import Logo from '../../assets/ontrac.png';

export default function FallbackRoute() {
	return (
		<main className="w-full h-[80vh] my-auto overflow-hidden text-center p-4">
			<img
				className="inline-block h-1/3 my-4 mr-auto"
				src={Logo}
				alt="onTrac"
			/>
			<h1 className="text-3xl font-bold my-8">404</h1>
			<h3>Oops! The page you're looking for cannot be found.</h3>
			<Link to={'/'} className="underline text-[#fad6a5] inline-block mt-2">
				&lArr; Back to home
			</Link>
		</main>
	);
}
