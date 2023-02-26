// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchAllNotes } from '../../hooks/db/useFetchDoc';

export default function FetchNotes() {
	const [allNotes, setAllNotes] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	useEffect(() => {
		setIsPending(true);
		setError(null);

		if (!isCancelled) {
			try {
				const doc = fetchAllNotes();
				setAllNotes(doc);
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
	// 	queryKey: ['notes'],
	// 	queryFn: fetchAllNotes,
	// });

	// const allNotes = queryDocs.data,
	// 	isPending = queryDocs.isFetching,
	// 	error = queryDocs.error;

	const starredNotes = allNotes
		? allNotes.filter((note) => note.starred === true)
		: null;

	return {
		allNotes,
		starredNotes,
		isPending,
		error,
	};
}
