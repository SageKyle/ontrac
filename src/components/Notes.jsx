import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
import useDeleteDoc from '../hooks/db/useDeleteDoc';
import Loading from '../utils/Loading';
import DeleteConfirmationModal from '../utils/modals/DeleteConfirmationModal';
import ErrorModal from '../utils/modals/ErrorModal';

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function Notes({ notes, isPending, error }) {
	const { deleteDocument } = useDeleteDoc('notes');
	const [modalProp, setmodalProp] = useState({ open: false, id: null });

	// delete note and hide popup
	function handleDelete(modalProp) {
		deleteDocument(modalProp.id);
		setmodalProp({ ...modalProp, open: false });
	}

	return (
		<>
			{/* disable this section if modal is open */}
			<section
				className={`${
					modalProp.open ? 'pointer-events-none opacity-40' : ''
				} mb-4 flex items-start justify-start flex-wrap`}
			>
				{isPending && <Loading />}
				{!notes && <p>There's nothing here!</p>}
				{error && (
					<ErrorModal>
						<p>{error}</p>
					</ErrorModal>
				)}
				{notes &&
					notes.map((note) => (
						<article
							key={note.id}
							className="m-2 p-2 flex flex-col border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem] max-h-[20rem] overflow-y-auto"
						>
							{note.title && (
								<h1 className="mb-2 border-b-2 border-slate-500 capitalize font-bold">
									{note.title}
								</h1>
							)}

							<Link to={'edit-note/' + note.id}>
								<pre className="max-w-full mb-4">{note.note}</pre>
							</Link>
							<p className="text-xs mt-6 absolute bottom-2">
								Edited{' '}
								{formatDistanceToNow(note.createdAt.toDate(), {
									addSuffix: true,
								})}
							</p>
							<button
								onClick={() => setmodalProp({ id: note.id, open: true })}
								className="sticky block ml-auto right-4 bottom-0 z-10 bg-[#567189] rounded-full p-2"
							>
								<FaTrash />
							</button>
						</article>
					))}
			</section>
			{/* note delete modal */}
			{modalProp.open && (
				<DeleteConfirmationModal
					deleteNote={() => handleDelete(modalProp)}
					onClose={() => setmodalProp({ ...modalProp, open: false })}
				/>
			)}
		</>
	);
}
