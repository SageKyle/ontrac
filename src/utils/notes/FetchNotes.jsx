import { useQuery } from '@tanstack/react-query';
import { fetchAllNotes } from '../../hooks/db/useFetchDoc';

export default function FetchNotes() {
	const queryDocs = useQuery({
		queryKey: ['notes'],
		queryFn: fetchAllNotes,
	});

	const allNotes = queryDocs.data,
		isPending = queryDocs.isFetching,
		error = queryDocs.error;

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
