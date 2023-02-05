import useFetchDoc from '../../hooks/db/useFetchDoc';

export default function FetchNotes() {
	const { deferredDocs: allNotes, isPending, error } = useFetchDoc('notes');

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
