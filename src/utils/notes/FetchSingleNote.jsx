import { useQuery } from '@tanstack/react-query';
import { fetchSingleNote } from '../../hooks/db/useFetchDoc';

export default function FetchSingleNote(id) {
	const queryDocs = useQuery({
		queryKey: ['notes', id],
		queryFn: () => fetchSingleNote(id),
	});

	const { _title, _note, _starred } = queryDocs.data;

	return { _title, _note, _starred };
}
