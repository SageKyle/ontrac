import { useEffect, useState } from 'react';
import { fetchSingleNote } from '../../hooks/db/useFetchDoc';

export default function FetchSingleNote(id) {
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [starred, setStarred] = useState(false);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		setFetching(true);

		async function fetcDoc() {
			const doc = await fetchSingleNote(id);
			setNote(doc[0].note);
			setTitle(doc[0].title);
			setStarred(doc[0].starred);
			setFetching(false);
		}

		return () => {
			fetcDoc();
		};
	}, []);

	console.log('note: ', note);

	return { title, note, starred, fetching };
}
