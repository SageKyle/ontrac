import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// React icons
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsFillBookmarkPlusFill,
	BsFillMicFill,
} from 'react-icons/bs';
import { MdOutlineNotificationAdd } from 'react-icons/md';
import LoadingIcon from '../assets/Rolling-spinner.svg';

// Custom hooks
import useAddDoc from '../hooks/useAddDoc';
import useSpeechToText from '../hooks/useTextToSpeech';

export default function AddNewNote() {
	const { addDocument, error, isPending } = useAddDoc('notes');

	// Speech to Text
	const { listenContinuously, listening, stopListening, transcript } =
		useSpeechToText();

	// Form States
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [bookmarked, setBookmarked] = useState(false);

	// Form Actions
	const handleSubmit = async () => {
		const doc = { title, note, bookmarked };
		await addDocument(doc);
	};

	const handleSpeechToText = () => {
		if (!listening) {
			listenContinuously();
			setNote((prevValue) => prevValue + ' ' + transcript);
			toast.info('mic is on');
		} else if (listening) {
			stopListening();
			toast.info('mic is off');
		}
	};

	return (
		<section className="text-gray-200">
			<nav className="flex justify-between items-center mb-6">
				{/* arrow left */}
				<Link to={'/'} className="cursor-pointer" title="Home">
					<BsFillArrowLeftCircleFill className="text-2xl" />
				</Link>
				<div className="flex mr-2 ">
					{/* checkmark */}
					{!isPending && (
						<span
							onClick={handleSubmit}
							title="Save note"
							className="mr-8 cursor-pointer"
						>
							<BsCheck2 className="text-2xl" />
						</span>
					)}
					{isPending && (
						<span aria-disabled disabled title="Save note" className="mr-8">
							<img src={LoadingIcon} alt="loading" className="h-6 w-6" />
						</span>
					)}
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
						<BsFillBookmarkPlusFill
							className={bookmarked ? 'text-[#fad6a5] text-2xl' : 'text-2xl'}
						/>
					</span>
				</div>
			</nav>
			<form className="h-screen pb-10 pt-4">
				{error && toast.error(error)}
				<label className="flex p-1 w-full mb-4">
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="bg-transparent text-gray-200 w-full border-0 outline-0"
					/>
				</label>
				<label className="flex p-2 w-full relative h-[20rem]">
					<textarea
						id="note"
						className="bg-transparent text-gray-200 resize-none mb-6 outline-0 w-full"
						placeholder="Note..."
						title="Add Note"
						value={note}
						onChange={(e) => setNote(e.target.value)}
						required
						autoFocus
					></textarea>
					<span
						className="absolute bottom-[1rem] bg-[#567189] p-1 right-2 cursor-pointer inline-block m-2 hover:scale-[1.1]"
						title="Record Note"
						onClick={handleSpeechToText}
					>
						<BsFillMicFill
							className={
								listening ? 'text-[#fad6a5] text-2xl listening' : 'text-2xl'
							}
						/>
					</span>
				</label>
			</form>
		</section>
	);
}
