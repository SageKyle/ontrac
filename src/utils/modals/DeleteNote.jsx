import React, { useImperativeHandle, useRef } from 'react';

function DeleteNote({ onClose, deleteNote }, ref) {
	const deleteBtn = useRef();
	const cancelBtn = useRef();

	useImperativeHandle(ref, () => {
		return {
			deleteBtn: deleteBtn.current,
			cancelBtn: cancelBtn.current,
		};
	});

	return (
		<section className="z-50 bg-slate-700 w-3/4 max-w-[20rem] fixed top-1/2 translate-y-[-50%] rounded-md flex justify-center items-center flex-col p-8">
			<h1 className="capitalize mb-4 text-red-500 font-bold text-2xl">
				delete note
			</h1>
			<button
				className="flex items-center justify-center absolute w-8 h-8 top-4 bg-slate-600 hover:bg-slate-500 transition-colors p-2 rounded-full font-bold right-4"
				onClick={onClose}
			>
				&times;
			</button>
			<p>
				Are you sure you want to delete this note? This action cannot be undone
			</p>

			<div className="flex space-x-4 items-center justify-center mt-4">
				<button
					ref={deleteBtn}
					onClick={deleteNote}
					className="bg-red-500 hover:bg-red-400 text-white transition-colors py-2 px-4 rounded"
				>
					Delete
				</button>
				<button
					ref={cancelBtn}
					onClick={onClose}
					className="bg-cyan-500 hover:bg-cyan-400 text-white transition-colors py-2 px-4 rounded"
				>
					Cancel
				</button>
			</div>
		</section>
	);
}

export default React.forwardRef(DeleteNote);
