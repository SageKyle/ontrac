import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toast } from 'react-toastify';
import useUpdateDoc from '../hooks/db/useUpdateDoc';
import Loading from '../utils/Loading';

export default function Todos({ todos, isPending, error, isEmpty }) {
	const { updateDocument } = useUpdateDoc('todos');

	async function completeTodo(todo) {
		await updateDocument(todo.id, { completed: true });
		console.log(todo);
	}

	return (
		<>
			<section className="mb-4 flex items-start justify-start flex-wrap">
				{isPending && <Loading />}
				{error && toast.error(error)}
				{(!todos || todos.length === 0) && <h4>{isEmpty}</h4>}

				{todos &&
					todos.map((todo) => (
						<div
							key={Math.random()}
							className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
							onClick={() => completeTodo(todo)}
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
