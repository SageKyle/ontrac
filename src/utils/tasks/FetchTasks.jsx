// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchAllTasks } from '../../hooks/db/useFetchDoc';

export default function FetchTasks() {
	const [allTasks, setAllTasks] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	useEffect(() => {
		setIsPending(true);
		setError(null);

		if (!isCancelled) {
			try {
				const doc = fetchAllTasks();
				setAllTasks(doc);
				setIsPending(false);
				setError(null);
			} catch (err) {
				console.error(err);
				setIsPending(false);
				setError(err);
			}
		}

		return () => {
			setIsCancelled(true);
		};
	}, []);

	// const queryDocs = useQuery({
	// 	queryKey: ['tasks'],
	// 	queryFn: fetchAllTasks,
	// });

	// const allTasks = queryDocs.data,
	// 	isPending = queryDocs.isFetching,
	// 	error = queryDocs.error;

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
