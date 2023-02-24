import { useQuery } from '@tanstack/react-query';
import { fetchSingleNote } from '../../hooks/db/useFetchDoc';

export default function FetchSingleNote(id) {
	const queryDocs = useQuery({
		queryKey: ['notes', id],
		queryFn: () => fetchSingleNote(id),
	});

	const { title, note, starred } = queryDocs?.data;
	// const isPending = queryDocs.isFetching;

	return { title, note, starred };
}
