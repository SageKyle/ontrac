// icons
import { BiDockLeft, BiLogOut } from 'react-icons/bi';
import { BsListCheck, BsListTask, BsStarFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { RxCaretDown } from 'react-icons/rx';

import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext';
import useLogout from '../hooks/auth/useLogout';
import ErrorModal from '../utils/modals/ErrorModal';

export default function Sidebar() {
	const { logout, isPending, error } = useLogout();
	const { user } = useAuthContext();
	const taskRef = useRef();
	const noteRef = useRef();

	function toggleRef(ref) {
		ref.current.classList.toggle('hidden');
	}

	return (
		<aside className="fixed flex capitalize flex-col shadow right-0 top-0 bg-[#011d33] w-[50%] md:w-[30%] h-[90vh] overflow-y-auto z-50">
			{user && (
				<section className="flex flex-col relative items-start my-4 max-h-4/5">
					{/* user profile */}
					<div className="flex flex-col items-center mx-auto justify-center w-full mb-4 pb-4 border-b-[1px] border-slate-400">
						<div className="flex items-center mx-auto justify-center w-[4rem] h-[4rem] bg-[#7B8FA1] mb-2 rounded-full">
							{user.displayName[0]}
						</div>
						<h4 className="mx-auto capitalize">{user.displayName}</h4>
						<h5 className="mx-auto normal-case text-xs font-thin">
							{user.email}
						</h5>
					</div>
					{/* tasks */}
					<div className="w-full px-4 pb-2">
						<h4
							className="flex justify-start items-center capitalize mb-2 font-semibold cursor-pointer"
							onClick={() => toggleRef(taskRef)}
						>
							tasks{' '}
							<span>
								<RxCaretDown className="ml-8" />
							</span>
						</h4>
						<div
							ref={taskRef}
							className="hidden transition-all duration-300 ease-in-out"
						>
							<NavLink
								to={'/tasks'}
								title="Tasks"
								className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
							>
								<FaTasks className="inline-block mr-2" />
								<span className="text-sm">All</span>
							</NavLink>
							<NavLink
								to={'/uncompleted-tasks'}
								title="Uncompleted Tasks"
								className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
							>
								<BsListCheck className="inline-block mr-2" />
								<span className="text-sm">Uncompleted</span>
							</NavLink>
							<NavLink
								to={'/starred-tasks'}
								title="Important tasks"
								className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
							>
								<BsStarFill className="inline-block mr-2" />
								<span className="text-sm">Important</span>
							</NavLink>
						</div>
					</div>
					{/* notes */}
					<div className="px-4 pb-2 w-full">
						<h4
							className="flex justify-start items-center capitalize mb-2 font-semibold cursor-pointer"
							onClick={() => toggleRef(noteRef)}
						>
							note{' '}
							<span>
								<RxCaretDown className="ml-8" />
							</span>
						</h4>
						<div
							ref={noteRef}
							className="hidden transition-all duration-300 ease-in-out"
						>
							<NavLink
								to={'/notes'}
								title="All Notes"
								className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
							>
								<span className="text-sm">All</span>
							</NavLink>
							<NavLink
								to={'/starred-notes'}
								title="Important Notes"
								className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
							>
								<span className="text-sm">Important</span>
							</NavLink>
						</div>
					</div>
				</section>
			)}
			{/* documentation */}
			<NavLink
				to={'/docs'}
				title="Documentation"
				className="flex items-center justify-start mt-2 ml-4 hover:cursor-pointer lg:hover:text-[#fad6a5]"
			>
				<BiDockLeft className="inline-block mr-2" />
				<span>About OnTrac</span>
			</NavLink>
			{/* no logged in user */}
			{!user && (
				<section className="p-4 flex flex-col mb-2 h-4/5">
					<Link to={'/sign-in'} className="hover:underline text-xl mb-2">
						login
					</Link>
					<Link to={'/sign-up'} className="hover:underline text-xl">
						sign up
					</Link>
				</section>
			)}
			{/* logout */}
			{user && (
				<div className="w-full mb-8 mt-auto self-start p-4 border-t-[1px] border-slate-400">
					{!isPending && (
						<button onClick={logout} className="hover:underline text-xl">
							<BiLogOut className="mr-2 inline-block" />
							logout
						</button>
					)}
					{isPending && (
						<button
							onClick={logout}
							disabled
							className="hover:underline text-xl"
						>
							<BiLogOut className="mr-2 inline-block" />
							logging out
						</button>
					)}
					{error && (
						<ErrorModal>
							<p>{error}</p>
						</ErrorModal>
					)}
				</div>
			)}
		</aside>
	);
}
