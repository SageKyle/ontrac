import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddItem() {
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');

	const handleSubmit = () => {
		console.log({ title, note });
	};

	return (
		<section>
			<nav className="flex justify-between items-center mb-6">
				{/* arrow left */}
				<Link to={'/'} className=" cursor-pointer" title="Home">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<div className="flex mr-2">
					{/* checkmark */}
					<span onClick={handleSubmit} title="Save note" className="mr-8">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.5 12.75l6 6 9-13.5"
							/>
						</svg>
					</span>
					{/* notification */}
					<span
						className="inline-block mr-4 cursor-pointer"
						title="Enable notification"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
							/>
						</svg>
					</span>
					{/* bookmark */}
					<span className=" cursor-pointer" title="Add to bookmark">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
							/>
						</svg>
					</span>
				</div>
			</nav>
			<form className="h-screen pb-10 pt-4">
				<label className="flex p-1 w-full mb-4">
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="bg-transparent w-full border-0 outline-0"
					/>
				</label>
				<label className="flex p-2 w-full relative h-[20rem]">
					<textarea
						id="note"
						className="bg-transparent resize-none mb-6 outline-0 w-full"
						placeholder="Note"
						title="Add Note"
						value={note}
						onChange={(e) => setNote(e.target.value)}
						required
						autoFocus
					></textarea>
					<span
						className="absolute bottom-[1rem] bg-slate-600 p-1 right-2 cursor-pointer inline-block m-2 hover:text-amber-300"
						title="Record Note"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
							/>
						</svg>
					</span>
				</label>
			</form>
		</section>
	);
}
