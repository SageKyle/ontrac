import useFetchDoc from '../../hooks/db/useFetchDoc';

export default function FetchTodos() {
	const { docs: allTodos, isPending, error } = useFetchDoc('todos');

	const uncompletedTodos = allTodos
		? allTodos.filter((todo) => todo.completed === false)
		: null;
	const completedTodos = allTodos
		? allTodos.filter((todo) => todo.completed === true)
		: null;
	const bookmarkedTodos = allTodos
		? allTodos.filter((todo) => todo.bookmarked === true)
		: null;
	const numberOfUncompletedTodos = allTodos
		? allTodos.filter((todo) => todo.completed === false).length
		: 0;

	console.log('fetch todos ran', allTodos);

	return {
		allTodos,
		uncompletedTodos,
		bookmarkedTodos,
		numberOfUncompletedTodos,
		completedTodos,
		isPending,
		error,
	};
}
