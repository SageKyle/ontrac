import { NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<header className="p-6 min-w-full bg-amber-700 text-white flex justify-between align-middle">
			<h1 className="font-bold text-2xl ">
				<NavLink to={'/'}>OnTrac</NavLink>
			</h1>
			<nav className="nav">
				<ul className="flex flex-row mm:flex-col">
					<li className="mr-4 hover:cursor-pointer list-none hover:text-amber-300">
						<NavLink to={'/sign-in'}>Sign in</NavLink>
					</li>
					<li className="mr-4 hover:cursor-pointer list-none hover:text-amber-300">
						<NavLink to={'/sign-up'}>Sign up</NavLink>
					</li>
					<li className="mr-4 hover:cursor-pointer list-none hover:text-amber-300">
						<NavLink to={'/'}>Add Item</NavLink>
					</li>
					<li className="mr-4 hover:cursor-pointer list-none hover:text-amber-300">
						<NavLink to={'/welcome'}>Get Started</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
