import useFetchDoc from '../../hooks/db/useFetchDoc';

export default function FetchNotes() {
	const { docs: allNotes, isPending, error } = useFetchDoc('notes');

	const bookmarkedNotes = allNotes
		? allNotes.filter((note) => note.bookmarked === true)
		: null;

	return {
		allNotes,
		bookmarkedNotes,
		isPending,
		error,
	};
}
