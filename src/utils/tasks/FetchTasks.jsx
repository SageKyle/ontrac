import { useEffect, useState } from 'react';
import { fetchAllTasks } from '../../hooks/db/useFetchDoc';

export default function FetchTasks() {
	const [allTasks, setAllTasks] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		setIsPending(true);
		setError(null);

		async function fetchTasks() {
			try {
				const doc = await fetchAllTasks();
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
			fetchTasks();
		};
	}, []);

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
