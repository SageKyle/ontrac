import Notes from '../../components/Notes';
import FetchNotes from '../../utils/notes/FetchNotes';

export default function StarredNotes() {
	const { StarredNotes, isPending, error } = FetchNotes();

	return (
		<>
			<Notes notes={StarredNotes} isPending={isPending} error={error} />
		</>
	);
}
