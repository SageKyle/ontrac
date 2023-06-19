import useFetchDoc from '../../hooks/db/useFetchDoc';

export default function FetchNotes() {
	const { data: allNotes, error, isPending } = useFetchDoc('notes');

	const StarredNotes = allNotes
		? allNotes.filter((note) => note.starred == true)
		: null;

	return {
		allNotes,
		StarredNotes,
		isPending,
		error,
	};
}
