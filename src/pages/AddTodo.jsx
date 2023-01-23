import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAddTodo from '../hooks/useAddTodo';
// icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsFillBookmarkPlusFill,
} from 'react-icons/bs';
import { MdOutlineNotificationAdd } from 'react-icons/md';

export default function AddTodo() {
	// Form States
	const [todo, setTodo] = useState('');
	const [note, setNote] = useState('');
	const [date, setDate] = useState('');
	const [bookmarked, setBookmarked] = useState(false);
	const navigate = useNavigate();

	const { addDocument, error, isPending } = useAddTodo();

	// Form Actions
	const handleSubmit = async () => {
		const doc = { todo, note, date, bookmarked };
		await addDocument(doc);
		setTimeout(() => {
			navigate('/');
		}, 3000);
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
						<span
							aria-disabled
							title="Save note"
							className="mr-8 cursor-pointer"
						>
							<AiOutlineLoading3Quarters className="text-2xl" />
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
						<BsFillBookmarkPlusFill className="text-2xl" />
					</span>
				</div>
			</nav>
			<form className="h-screen pb-10 pt-4">
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
