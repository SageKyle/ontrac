import useFetchDoc from '../../hooks/db/useFetchDoc';

export default function FetchTasks() {
	const { docs: allTasks, isPending, error } = useFetchDoc('tasks');

	const uncompletedTasks = allTasks
		? allTasks.filter((task) => task.completed === false)
		: null;
	const completedtasks = allTasks
		? allTasks.filter((task) => task.completed === true)
		: null;
	const starredTasks = allTasks
		? allTasks.filter((task) => task.starred === true)
		: null;
	const numberOfUncompletedTasks = allTasks
		? allTasks.filter((task) => task.completed === false).length
		: 0;

	return {
		allTasks,
		uncompletedTasks,
		starredTasks,
		numberOfUncompletedTasks,
		completedtasks,
		isPending,
		error,
	};
}
