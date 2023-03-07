import { NavLink } from 'react-router-dom';

// icons
import { BiHomeCircle, BiUserCircle } from 'react-icons/bi';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineEditNote } from 'react-icons/md';

export default function Navbar({ toggleSidebar, toggleIsOpen }) {
	function displaySideBar() {
		toggleSidebar();
		toggleIsOpen((isOpen) => !isOpen);
	}

	return (
		<nav className="py-2 px-4 w-full bg-[#011d33] border-t-amber-300 border-2 text-white flex fixed z-50 bottom-0">
			<ul className="flex justify-evenly align-middle w-[100%]">
				{/* Home */}
				<li
					className="mr-4 hover:cursor-pointer  list-none lg:hover:text-amber-300"
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
				{/* Add New Note */}
				<li
					className="mr-4 hover:cursor-pointer list-none lg:hover:text-amber-300"
					title="Add A New Note"
				>
					<NavLink
						to={'/new-note'}
						className="flex flex-col items-center justify-center"
					>
						<MdOutlineEditNote className="text-2xl" />
						<span>Add Note</span>
					</NavLink>
				</li>
				{/* Add New task */}
				<li
					className="mr-4 lg:hover:cursor-pointer list-none hover:text-amber-300"
					title="Add A New Task"
				>
					<NavLink
						to={'/new-task'}
						className="flex flex-col items-center justify-center"
					>
						<BsListCheck className="text-2xl" />
						<span>Add Task</span>
					</NavLink>
				</li>

				{/* Login */}
				<li
					className="mr-4 lg:hover:cursor-pointer list-none hover:text-amber-300"
					title="Dashboard"
				>
					<div
						className="flex flex-col items-center justify-center"
						onClick={displaySideBar}
					>
						<BiUserCircle className="text-2xl" />
						<span>Dashboard</span>
					</div>
				</li>
			</ul>
		</nav>
	);
}

// TODO display a more intuitive active state
