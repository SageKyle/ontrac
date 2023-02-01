import useFetchDoc from '../../hooks/db/useFetchDoc';

export default function FetchTodos() {
	const { docs: allTodos, isPending, error } = useFetchDoc('todos');

	const uncompletedTodos = allTodos
		? allTodos.filter((todo) => todo.completed === false)
		: null;
	const completedTodos = allTodos
		? allTodos.filter((todo) => todo.completed === true)
		: null;
	const starredTodos = allTodos
		? allTodos.filter((todo) => todo.starred === true)
		: null;
	const numberOfUncompletedTodos = allTodos
		? allTodos.filter((todo) => todo.completed === false).length
		: 0;

	return {
		allTodos,
		uncompletedTodos,
		starredTodos,
		numberOfUncompletedTodos,
		completedTodos,
		isPending,
		error,
	};
}
