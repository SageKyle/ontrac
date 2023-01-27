import { BiLogOut } from 'react-icons/bi';
import { BsBookmarksFill } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import useLogout from '../hooks/useLogout';

export default function Sidebar() {
	const { logout, isPending, error } = useLogout();
	const { user } = useAuthState();

	return (
		<aside className="fixed flex capitalize p-4 flex-col right-0 top-0 bg-[#567189] w-[50%] md:w-[30%] h-[100vh] z-10">
			{user && (
				<section className="flex flex-col relative items-start my-4 h-4/5">
					<div className="flex items-center mx-auto justify-center w-[4rem] h-[4rem] bg-[#7B8FA1] mb-2 rounded-full">
						{user.displayName[0]}
					</div>
					<h4 className="mx-auto capitalize">{user.displayName}</h4>
					<h4 className="mx-auto normal-case text-xs font-thin">
						{user.email}
					</h4>
					{/* bookmark */}

					<NavLink
						to={'/bookmarks'}
						title="Bookmarks"
						className="flex items-center justify-start mt-8 py-2 hover:cursor-pointer hover:text-[#fad6a5]"
					>
						<BsBookmarksFill className="inline-block mr-2" />
						<span>Bookmarks</span>
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
			{!user && (
				<section className=" flex flex-col mb-2">
					<Link to={'/sign-in'} className="hover:underline text-xl mb-2">
						login
					</Link>
					<Link to={'/sign-up'} className="hover:underline text-xl">
						sign up
					</Link>
				</section>
			)}
		</aside>
	);
}
