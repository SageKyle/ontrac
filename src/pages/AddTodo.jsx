import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAddDoc from '../hooks/useAddDoc';
// icons
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsFillBookmarkPlusFill,
} from 'react-icons/bs';
import { MdOutlineNotificationAdd } from 'react-icons/md';
import LoadingIcon from '../assets/Rolling-spinner.svg';

export default function AddTodo() {
	// Form States
	const [todo, setTodo] = useState('');
	const [note, setNote] = useState('');
	const [date, setDate] = useState('');
	const [bookmarked, setBookmarked] = useState(false);

	const { addDocument, error, isPending } = useAddDoc('todos');

	// Form Actions
	const handleSubmit = async () => {
		const doc = { todo, note, date, bookmarked, completed: false };
		await addDocument(doc);
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
						placeholder="Todo..."
						required
						autoFocus
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
						className="bg-transparent w-full border-0 outline-0"
					/>
				</label>
				<label className="flex p-2 w-full relative h-[6rem]">
					<textarea
						id="note"
						className="bg-transparent resize-none mb-6 outline-0 w-full"
						placeholder="More info..."
						title="Add a short description"
						value={note}
						onChange={(e) => setNote(e.target.value)}
					></textarea>
				</label>
				<label className="flex p-1 w-full mb-4">
					<input
						type="datetime-local"
						required
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="bg-transparent w-full border-0 outline-0"
					/>
				</label>
			</form>
		</section>
	);
}
