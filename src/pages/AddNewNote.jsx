import { useState } from 'react';
import { Link } from 'react-router-dom';
// React icons
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsFillBookmarkPlusFill,
	BsFillMicFill,
} from 'react-icons/bs';
import { MdOutlineNotificationAdd } from 'react-icons/md';

// Custom hooks
import useSpeechToText from '../hooks/useTextToSpeech';

export default function AddNewNote() {
	// Speech to Text
	const { listenContinuously, listening, stopListening, transcript } =
		useSpeechToText();

	// Form States
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [bookmarked, setBookmarked] = useState(false);

	// Form Actions
	const handleSubmit = () => {
		console.log({ title, note, bookmarked });
	};

	const handleSpeechToText = () => {
		if (!listening) {
			listenContinuously();
			setNote((prevValue) => prevValue + ' ' + transcript);
			console.log('on');
		} else if (listening) {
			stopListening();
			console.log('off');
		}
	};

	return (
		<section>
			<nav className="flex justify-between items-center mb-6">
				{/* arrow left */}
				<Link to={'/'} className="cursor-pointer" title="Home">
					<BsFillArrowLeftCircleFill className="text-2xl" />
				</Link>
				<div className="flex mr-2 ">
					{/* checkmark */}
					<span
						onClick={handleSubmit}
						title="Save note"
						className="mr-8 cursor-pointer"
					>
						<BsCheck2 className="text-2xl" />
					</span>
					{/* notification */}
					<span
						className="inline-block mr-4 cursor-pointer"
						title="Enable notification"
					>
						<MdOutlineNotificationAdd className="text-2xl" />
					</span>
					{/* bookmark */}
					<span
						className=" cursor-pointer"
						onClick={() => setBookmarked((prev) => !prev)}
						title="Add to bookmark"
					>
						<BsFillBookmarkPlusFill className="text-2xl" />
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
						onClick={handleSpeechToText}
					>
						<BsFillMicFill className="text-2xl" />
					</span>
				</label>
			</form>
		</section>
	);
}
