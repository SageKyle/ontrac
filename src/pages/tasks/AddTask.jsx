import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAddDoc from '../../hooks/db/useAddDoc';
import PushNotification from '../../utils/PushNotification';
// icons
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsStar,
	BsStarFill,
} from 'react-icons/bs';
import { MdOutlineNotificationAdd } from 'react-icons/md';
import LoadingIcon from '../../assets/Rolling-spinner.svg';

export default function AddTask() {
	// Form States
	const [task, setTask] = useState('');
	const [dueDate, setdueDate] = useState('');
	const [starred, setStarred] = useState(false);

	const { addDocument, error, isPending } = useAddDoc('tasks');

	function sendNotification() {
		const notice = 'do more work';
		const tag = 'task';
		PushNotification(notice, tag);
	}

	// Form Actions
	const handleSubmit = async () => {
		if (task === '') {
			toast.error('Oops! You forgot to add a task...');
			return null;
		}
		if (dueDate === '') {
			toast.error('Oops! You forgot to add a date...');
			return null;
		}
		const doc = { task, dueDate, starred, completed: false };
		await addDocument(doc);
	};

	return (
		<section className="max-h-4/5 md:w-4/5 lg:w-2/4 mx-auto">
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
						onClick={sendNotification}
					>
						<MdOutlineNotificationAdd className="text-2xl" />
					</span>
					{/* star */}
					<span
						className=" cursor-pointer"
						onClick={() => setStarred((prev) => !prev)}
						title="Mark as Important"
					>
						{starred && <BsStarFill className="text-[#fad6a5] text-2xl" />}
						{!starred && <BsStar className="text-2xl" />}
					</span>
				</div>
			</nav>
			<form className="pt-4">
				{error && toast.error(error)}
				<label className="flex flex-col p-1 w-full mb-6">
					<span className="inline-block my-2 pl-4 text-[#fad6a5] font-bold">
						Task:
					</span>
					<input
						type="text"
						placeholder="Task..."
						required
						autoFocus
						value={task}
						onChange={(e) => setTask(e.target.value)}
						className="bg-transparent w-full placeholder:text-slate-300 border-2 border-slate-400 focus:border-slate-300 focus:outline-0 outline-0"
					/>
				</label>

				<label className="flex flex-col py-1 w-full mb-4">
					<span className="inline-block my-2 pl-4 text-[#fad6a5] font-bold">
						Due date
					</span>
					<input
						type="datetime-local"
						required
						value={dueDate}
						onChange={(e) => setdueDate(e.target.value)}
						className="bg-transparent w-full border-0 outline-0"
					/>
				</label>
			</form>
		</section>
	);
}
