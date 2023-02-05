import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../utils/Loading';

export default function Notes({ notes, isPending, error }) {
	const { id } = useParams();

	return (
		<section className="mb-4 flex items-start justify-start flex-wrap">
			{isPending && <Loading />}
			{error && toast.error(error)}
			{!notes && <p>There's nothing here!</p>}
			{notes &&
				notes.map((note) => (
					<Link
						to={'edit-note/' + id}
						key={Math.random()}
						className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
					>
						<h1 className="capitalize font-semibold">{note.title}</h1>

						<p>{note.note}</p>
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
