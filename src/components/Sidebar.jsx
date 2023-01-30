import { BiDockLeft, BiLogOut } from 'react-icons/bi';
import { BsBookmarksFill, BsListCheck } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import useAuthState from '../hooks/auth/useAuthState';
import useLogout from '../hooks/auth/useLogout';

export default function Sidebar() {
	const { logout, isPending, error } = useLogout();
	const { user } = useAuthState();

	return (
		<aside className="fixed flex capitalize p-4 flex-col shadow right-0 top-0 bg-[#567189] w-[50%] md:w-[30%] h-[100vh] z-10">
			{user && (
				<section className="flex flex-col relative items-start my-4 h-4/5">
					<div className="flex items-center mx-auto justify-center w-[4rem] h-[4rem] bg-[#7B8FA1] mb-2 rounded-full">
						{user.displayName[0]}
					</div>
					<h4 className="mx-auto capitalize">{user.displayName}</h4>
					<h5 className="mx-auto normal-case text-xs font-thin">
						{user.email}
					</h5>
					{/* todos */}
					<div className="mb-4">
						<h4 className="capitalize my-2 text-[#fad6a5] font-bold">todos</h4>
						<NavLink
							to={'/uncompleted-todos'}
							title="Bookmarks"
							className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
						>
							<BsListCheck className="inline-block mr-2" />
							<span className="text-sm">Uncompleted</span>
						</NavLink>
						<NavLink
							to={'/bookmarked-todos'}
							title="Bookmarks"
							className="flex items-center justify-start hover:cursor-pointer hover:ml-2 transition-all duration-150 ease-in-out lg:hover:text-[#fad6a5] active:ml-4"
						>
							<BsBookmarksFill className="inline-block mr-2" />
							<span className="text-sm">Bookmarked</span>
						</NavLink>
					</div>

					{/* documentation */}
					<NavLink
						to={'/docs'}
						title="Documentation"
						className="flex items-center justify-start mt-2 hover:cursor-pointer lg:hover:text-[#fad6a5]"
					>
						<BiDockLeft className="inline-block mr-2" />
						<span>Documentation</span>
					</NavLink>

					{!isPending && (
						<button
							onClick={logout}
							className="hover:underline text-xl mb-4 mt-auto  after:absolute after:inline-block after:w-full after:border-t-[1px] after:border-[#7B8FA1] after:left-0 after:bottom-12"
						>
							<BiLogOut className="mr-2 inline-block" />
							logout
						</button>
					)}
					{isPending && (
						<button onClick={logout} disabled className="text-xl mb-4 mt-auto">
							<BiLogOut className="mr-2 inline-block" />
							logging out
						</button>
					)}
					{error && <p className="my-2 text-[red]">{error}</p>}
				</section>
			)}
			{/* no logged in user */}
			{!user && (
				<section className=" flex flex-col mb-2 h-4/5">
					<Link to={'/sign-in'} className="hover:underline text-xl mb-2">
						login
					</Link>
					<Link to={'/sign-up'} className="hover:underline text-xl">
						sign up
					</Link>
					{/* documentation */}
					<NavLink
						to={'/docs'}
						title="Documentation"
						className="flex items-center justify-start mt-auto mb-2 hover:cursor-pointer lg:hover:text-[#fad6a5]"
					>
						<BiDockLeft className="inline-block mr-2" />
						<span>About OnTrac</span>
					</NavLink>
				</section>
			)}
		</aside>
	);
}
