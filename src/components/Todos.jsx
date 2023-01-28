import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toast } from 'react-toastify';
import useFetchDoc from '../hooks/db/useFetchDoc';
import Loading from '../utils/Loading';

export default function Todos() {
	const { docs: todos, isPending, error } = useFetchDoc('todos');
	const uncompletedTodos = todos
		? todos.filter((todo) => todo.completed === false).length
		: 0;

	return (
		<>
			<h2 className="text-2xl my-4">
				You have {uncompletedTodos} uncompleted tasks
			</h2>
			<section className="mb-4 flex items-start justify-start flex-wrap">
				{isPending && <Loading />}
				{error && toast.error(error)}
				{todos &&
					todos.map((todo) => (
						<div
							key={Math.random()}
							className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
						>
							<h4
								className={
									todo.completed
										? 'capitalize line-through text-2xl'
										: 'capitalize text-2xl text-[#fad6a5]'
								}
							>
								{todo.todo}
							</h4>
							{todo.completed && (
								<span className="absolute top-0 right-1 block text-[#fad6a5] font-bold">
									Done
								</span>
							)}
							<p className="text-sm">{todo.note}</p>
							<p>
								{formatDistanceToNow(todo.createdAt.toDate(), {
									addSuffix: true,
								})}
							</p>
						</div>
					))}
			</section>
		</>
	);
}
