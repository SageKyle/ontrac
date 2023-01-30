import Notes from '../../components/Notes';
import FetchNotes from '../../utils/notes/FetchNotes';

export default function BookmarkedNotes() {
	const { bookmarkedNotes, isPending, error } = FetchNotes();

	return (
		<>
			<Notes notes={bookmarkedNotes} isPending={isPending} error={error} />
		</>
	);
}
