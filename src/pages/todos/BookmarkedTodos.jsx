import Todos from '../../components/Todos';
import FetchTodos from '../../utils/todos/FetchTodos';

export default function BookmarkedTodos() {
	const { bookmarkedTodos, isPending, error } = FetchTodos();
	console.log(bookmarkedTodos);

	return (
		<>
			<h1 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				Bookmarked tasks
			</h1>
			<Todos
				todos={bookmarkedTodos}
				isPending={isPending}
				error={error}
				isEmpty={'You have no bookmarked tasks'}
			/>
		</>
	);
}
