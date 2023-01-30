import Notes from '../../components/Notes';
import FetchNotes from '../../utils/notes/FetchNotes';

export default function AllNotes() {
	const { allNotes, isPending, error } = FetchNotes();

	return (
		<>
			<Notes notes={allNotes} isPending={isPending} error={error} />
		</>
	);
}
