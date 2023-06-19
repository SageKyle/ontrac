import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
import useDeleteDoc from '../hooks/db/useDeleteDoc';
import Loading from '../utils/Loading';
import DeleteConfirmationModal from '../utils/modals/DeleteConfirmationModal';
import ErrorModal from '../utils/modals/ErrorModal';

import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
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
				} mb-4 w-full flex items-start justify-start`}
			>
				{isPending && <Loading />}

				{!notes && <p>There's nothing here!</p>}
				{error && (
					<ErrorModal>
						<p>{error}</p>
					</ErrorModal>
				)}
				<div className="w-full grid items-start justify-center grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-8  lg:grid-cols-3 relative">
					{notes &&
						notes.map((note) => (
							<article
								key={note.id}
								className="p-2 flex flex-col justify-between border-2 relative cursor-pointer rounded w-full h-[20rem] overflow-y-auto"
							>
								<div
									aria-label="starred note"
									className="absolute top-2 right-2 text-2xl"
								>
									{note.starred && <BsStarFill className="text-[#fad6a5]" />}
								</div>
								{note.title && (
									<h1 className="mb-2 border-b-2 border-slate-500 capitalize font-bold">
										{note.title}
									</h1>
								)}

								<Link
									to={'edit-note/' + note.id}
									className="max-w-full mb-4 justify-self-start"
								>
									<pre>{note.note}</pre>
								</Link>
								<small className="text-xs py-2 mt-auto sticky justify-self-end bottom-0 text-cyan-200 bg-[#252c53]">
									Edited{' '}
									{formatDistanceToNow(note.createdAt.toDate(), {
										addSuffix: true,
									})}
								</small>
								<button
									onClick={() => setmodalProp({ id: note.id, open: true })}
									className="sticky w-auto inline-block ml-auto right-4 bottom-2 z-10 bg-[#567189] rounded-full p-2"
								>
									<FaTrash aria-label="delete note" />
								</button>
							</article>
						))}
				</div>
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
