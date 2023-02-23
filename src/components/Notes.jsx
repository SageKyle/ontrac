import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../utils/Loading';

export default function Notes({ notes, isPending, error }) {
	return (
		<section className="mb-4 flex items-start justify-start flex-wrap">
			{isPending && <Loading />}
			{error && toast.error(error)}
			{!notes && <p>There's nothing here!</p>}
			{notes &&
				notes.map((note) => (
					<Link
						to={'edit-note/' + note.id}
						key={note.id}
						className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
					>
						<h1 className="capitalize font-semibold">{note.title}</h1>

						<pre className="max-w-full">{note.note}</pre>
						<p className="text-xs mt-6">
							Edited{' '}
							{formatDistanceToNow(note.createdAt.toDate(), {
								addSuffix: true,
							})}
						</p>
					</Link>
				))}
		</section>
	);
}
