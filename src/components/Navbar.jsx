import { NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className="nav p-6 min-w-full bg-gray-900 text-white flex fixed bottom-0">
			<ul className="flex justify-evenly align-middle w-[100%]">
				{/* Home */}
				<li
					className="mr-4 hover:cursor-pointer  list-none hover:text-amber-300"
					title="Home"
				>
					<NavLink
						to={'/'}
						className="flex flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
							/>
						</svg>
						<span>Home</span>
					</NavLink>
				</li>
				{/* Add item */}
				<li
					className="mr-4 hover:cursor-pointer list-none hover:text-amber-300"
					title="Add Item"
				>
					<NavLink
						to={'/new'}
						className="flex flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Add Item</span>
					</NavLink>
				</li>
				{/* bookmark */}
				<li
					className="mr-4 hover:cursor-pointer list-none hover:text-amber-300"
					title="Bookmarks"
				>
					<NavLink
						to={'/'}
						className="flex flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
							/>
						</svg>
						<span>Bookmarks</span>
					</NavLink>
				</li>
				{/* Login */}
				<li
					className="mr-4 hover:cursor-pointer list-none hover:text-amber-300"
					title="Login"
				>
					<NavLink
						to={'/sign-in'}
						className="flex flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span>Login</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
