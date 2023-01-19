import { NavLink } from 'react-router-dom';

// icons
import { BiHomeCircle, BiUserCircle } from 'react-icons/bi';
import { BsBookmarksFill, BsFillPlusCircleFill } from 'react-icons/bs';

export default function Navbar() {
	return (
		<nav className="py-2 px-4 min-w-full bg-slate-600 border-t-amber-300 border-2 text-white flex sticky z-50 bottom-0">
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
						<BiHomeCircle className="text-2xl" />
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
						<BsFillPlusCircleFill className="text-2xl" />
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
						<BsBookmarksFill className="text-2xl" />
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
						<BiUserCircle className="text-2xl" />
						<span>Login</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
