import { toast } from 'react-toastify';
import useFetchDoc from '../hooks/useFetchDoc';
import Loading from '../utils/Loading';

export default function Notes() {
	const { docs: notes, isPending, error } = useFetchDoc('notes');

	return (
		<section className="mb-4 flex items-start justify-start flex-wrap">
			{isPending && <Loading />}
			{error && toast.error(error)}
			{!notes && <p>You have not added any notes yet.</p>}
			{notes &&
				notes.map((note) => (
					<div
						key={Math.random()}
						className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
					>
						<h1 className="capitalize text-2xl">{note.title}</h1>

						<p>{note.note}</p>
						<p>{note.createdAt.toDate().toDateString()}</p>
					</div>
				))}
		</section>
	);
}
