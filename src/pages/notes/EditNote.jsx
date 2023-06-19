import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// React icons
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsFillMicFill,
	BsStar,
	BsStarFill,
} from 'react-icons/bs';
import { MdOutlineNotificationAdd } from 'react-icons/md';
// loaders
import LoadingIcon from '../../assets/Rolling-spinner.svg';
// import Loading from '../../utils/Loading';

// Custom hooks
import useFetchSingleDoc from '../../hooks/db/useFetchSingleDoc';
import useUpdateDoc from '../../hooks/db/useUpdateDoc';
import useSpeechToText from '../../hooks/TTS/useTextToSpeech';

export default function EditNote() {
	const { id } = useParams();
	const { updateDocument, isPending, error } = useUpdateDoc('notes');
	const { fetchSingleDoc } = useFetchSingleDoc('notes');
	const [fetching, setFetching] = useState(true);

	// Form States
	const [formData, setFormData] = useState(null);

	useEffect(() => {
		setFetching(true);

		async function fetcDoc() {
			const doc = await fetchSingleDoc(id);
			setFormData(doc[0]);
			setFetching(false);
		}

		return () => {
			fetcDoc();
		};
	}, []);

	// Speech to Text
	const { listenContinuously, listening, stopListening, transcript } =
		useSpeechToText();

	// Submit Form
	const handleSubmit = async () => {
		if (formData.note === '') {
			toast.error('Oops! Your note is empty...');
			return null;
		}

		await updateDocument(id, formData);
	};

	const handleSpeechToText = () => {
		if (!listening) {
			listenContinuously();
			setFormData({ ...formData, note: note + transcript });
			toast.info('mic is on');
		}
		if (listening) {
			stopListening();
			toast.info('mic is off');
		}
	};

	return (
		<>
			{/* show fetching state */}
			{/* {fetching && <Loading />} */}
			{!fetching && (
				<section
					onKeyDown={(e) => {
						if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
					}}
					className="text-gray-200 h-4/5 max-h-[80vh] md:w-4/5 lg:w-2/4 mx-auto"
				>
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
							{/* star */}
							<span
								className=" cursor-pointer"
								onClick={() =>
									setFormData({ ...formData, starred: !formData.starred })
								}
								title="Mark as Important"
							>
								{formData.starred && (
									<BsStarFill className="text-[#fad6a5] text-2xl" />
								)}
								{!formData.starred && <BsStar className="text-2xl" />}
							</span>
						</div>
					</nav>
					<form className="pt-4">
						{error && toast.error(error)}
						<label className="flex p-1 w-full mb-4">
							<input
								type="text"
								placeholder="Title (optional)"
								spellCheck="true"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								className="bg-transparent text-gray-200 w-full caret-[#fad6a5] placeholder:text-slate-300 border-0 border-b-2 border-slate-400 focus:border-slate-300 focus:outline-0 outline-0"
							/>
						</label>
						<label className="flex p-2 w-full relative h-[20rem]">
							<textarea
								id="note"
								className="bg-transparent text-gray-200 resize-none mb-6 outline-0 w-full placeholder:text-[#fad6a5] caret-[#fad6a5] border-2 border-slate-400 focus:border-slate-300 focus:outline-0"
								placeholder="Note..."
								title="Add Note"
								spellCheck="true"
								value={formData.note}
								onChange={(e) =>
									setFormData({ ...formData, note: e.target.value })
								}
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
			)}
		</>
	);
}
