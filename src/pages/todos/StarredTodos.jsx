import Todos from '../../components/Todos';
import FetchTodos from '../../utils/todos/FetchTodos';

export default function StarredTodos() {
	const { StarredTodos, isPending, error } = FetchTodos();

	return (
		<>
			<h1 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				Your important tasks
			</h1>
			<Todos
				todos={StarredTodos}
				isPending={isPending}
				error={error}
				isEmpty={'You have no bookmarked tasks'}
			/>
		</>
	);
}
