import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

export default function Sidebar() {
	const { logout, isPending, error } = useLogout();

	return (
		<aside className="fixed flex capitalize  p-4 flex-col right-0 top-0 bg-[#567189] w-[50%] md:w-[30%] h-[100vh] z-10">
			<section className="flex flex-col justify-center my-4">
				<div className="flex items-center mx-auto justify-center w-[4rem] h-[4rem] bg-[#7B8FA1] mb-2 rounded-full">
					t
				</div>
				<h4 className="mx-auto capitalize">test</h4>
				{!isPending && (
					<button
						onClick={logout}
						className="hover:underline text-xl border-t-[1px] border-[#7B8FA1] mt-6"
					>
						<BiLogOut className="mr-2 inline-block" />
						logout
					</button>
				)}
				{isPending && (
					<button
						onClick={logout}
						disabled
						className="text-xl border-t-[1px] border-[#7B8FA1] mt-6"
					>
						<BiLogOut className="mr-2 inline-block" />
						logging out
					</button>
				)}
				{error && <p className="my-2 text-[red]">{error}</p>}
			</section>
			<section className=" flex flex-col mb-2">
				<Link to={'/sign-in'} className="hover:underline text-xl mb-2">
					login
				</Link>
				<Link to={'/sign-up'} className="hover:underline text-xl">
					sign up
				</Link>
			</section>
		</aside>
	);
}
