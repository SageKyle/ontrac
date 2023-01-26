import { toast } from 'react-toastify';
import useFetchDoc from '../hooks/useFetchDoc';
import Loading from '../utils/Loading';

export default function Todos() {
	const { docs: todos, isPending, error } = useFetchDoc('todos');

	return (
		<section className="mb-4 flex items-start justify-start flex-wrap">
			{isPending && <Loading />}
			{error && toast.error(error)}
			{todos &&
				todos.map((todo) => (
					<div
						key={Math.random()}
						className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
					>
						<h1
							className={
								todo.completed
									? 'capitalize line-through text-2xl'
									: 'capitalize text-2xl'
							}
						>
							{todo.todo}
						</h1>
						{todo.completed && (
							<span className="absolute top-0 right-1 block text-[#fad6a5] font-bold">
								Done
							</span>
						)}
						<p>{todo.note}</p>
						<p>{todo.createdAt.toDate().toDateString()}</p>
					</div>
				))}
		</section>
	);
}
