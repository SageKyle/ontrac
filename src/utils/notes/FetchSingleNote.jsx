// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSingleNote } from '../../hooks/db/useFetchDoc';

export default function FetchSingleNote(id) {
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [starred, setStarred] = useState(false);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		async function fetcDoc() {
			const doc = await fetchSingleNote(id);
			setNote(doc.note);
			setTitle(doc.title);
			setStarred(doc.starred);
			setFetching(false);
		}

		return () => {
			fetcDoc();
		};
	}, []);

	return { title, note, starred, fetching };
}
