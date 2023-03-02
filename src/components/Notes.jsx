import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useDeleteDoc from '../hooks/db/useDeleteDoc';
import Loading from '../utils/Loading';

import { FaTrash } from 'react-icons/fa';

export default function Notes({ notes, isPending, error }) {
	const { deleteDocument } = useDeleteDoc('notes');

	return (
		<section className="mb-4 flex items-start justify-start flex-wrap">
			{isPending && <Loading />}
			{error && toast.error(error)}
			{!notes && <p>There's nothing here!</p>}
			{notes &&
				notes.map((note) => (
					<article
						key={note.id}
						className="m-2 p-2 flex flex-col border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem] max-h-[20rem] overflow-y-auto"
					>
						<h1 className="mb-2 border-b-2 border-slate-500 capitalize font-bold">
							{note.title}
						</h1>

						<Link to={'edit-note/' + note.id}>
							<pre className="max-w-full">{note.note}</pre>
						</Link>
						<p className="text-xs mt-6">
							Edited{' '}
							{formatDistanceToNow(note.createdAt.toDate(), {
								addSuffix: true,
							})}
						</p>
						<button
							onClick={() => deleteDocument(note.id)}
							className="sticky block ml-auto right-4 bottom-0 z-10 bg-[#567189] rounded-full p-2"
						>
							<FaTrash />
						</button>
					</article>
				))}
		</section>
	);
}

// TODO display last edited date instead of date created
