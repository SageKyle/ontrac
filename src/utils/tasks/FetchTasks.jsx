import { useQuery } from '@tanstack/react-query';
import { fetchAllTasks } from '../../hooks/db/useFetchDoc';

export default function FetchTasks() {
	const queryDocs = useQuery({
		queryKey: ['tasks'],
		queryFn: fetchAllTasks,
	});

	const allTasks = queryDocs.data,
		isPending = queryDocs.isFetching,
		error = queryDocs.error;

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
