// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSingleNote } from '../../hooks/db/useFetchDoc';

export default function FetchSingleNote(id) {
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [starred, setStarred] = useState(false);

	useEffect(() => {
		async function fetcDoc() {
			const doc = await fetchSingleNote(id);
			setNote(doc.note);
			setTitle(doc.title);
			setStarred(doc.starred);
		}

		return () => {
			fetcDoc();
		};
	}, []);

	// const queryDocs = useQuery({
	// 	queryKey: ['notes', id],
	// 	queryFn: () => fetchSingleNote(id),
	// });

	// const { title, note, starred } = queryDocs?.data;

	return { title, note, starred };
}
