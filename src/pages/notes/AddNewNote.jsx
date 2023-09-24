import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// React icons
import {
	BsCheck2,
	BsFillArrowLeftCircleFill,
	BsFillMicFill,
	BsMicMuteFill,
	BsStar,
	BsStarFill,
} from 'react-icons/bs'
import { MdOutlineNotificationAdd } from 'react-icons/md'
import LoadingIcon from '../../assets/Rolling-spinner.svg'

// Custom hooks
import useAddDoc from '../../hooks/db/useAddDoc'
import useSpeechToText from '../../hooks/TTS/useTextToSpeech'

export default function AddNewNote() {
	const { addDocument, error, isPending } = useAddDoc('notes')

	// Speech to Text
	// const { listenContinuously, listening, stopListening, transcript } =
	// 	useSpeechToText();

	const {
		isListening,
		startListening,
		stopListening,
		transcript,
		resetTranscript,
	} = useSpeechToText()

	// Form States
	const [title, setTitle] = useState('')
	const [note, setNote] = useState('')
	const [starred, setStarred] = useState(false)

	// Form Actions
	const handleSubmit = async () => {
		if (note === '') {
			toast.error('Oops! Your note is empty...')
			return null
		}
		const doc = { title, note, starred }
		await addDocument(doc)
	}

	const handleSpeechToText = () => {
		setNote((prevValue) => prevValue + transcript)
		// if (!isListening) {
		// 	// listenContinuously();
		// 	toast.info('mic is on');
		// } else if (isListening) {
		// 	// stopListening();
		// 	toast.info('mic is off');
		// }
	}

	return (
		<section
			// submit the form when user press ctrl + Enter
			onKeyDown={(e) => {
				if (e.key === 'Enter' && e.ctrlKey) handleSubmit()
			}}
			className="text-gray-200 h-4/5 max-h-[80vh] w-[90%] md:w-4/5 lg:w-3/5 mx-auto"
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
					{/* <span
						className="inline-block mr-4 cursor-pointer"
						title="Enable notification"
					>
						<MdOutlineNotificationAdd className="text-2xl" />
					</span> */}
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
				<label className="flex p-1 w-full mb-4">
					<input
						type="text"
						placeholder="Title (optional)"
						spellCheck="true"
						maxLength={70}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="bg-transparent text-gray-200 w-full caret-[#fad6a5] placeholder:text-slate-300 border-0 border-b border-slate-400 focus:border-slate-500 focus:outline-0 outline-0"
					/>
				</label>
				<label className="flex p-2 w-full relative h-[20rem] lg:h-[25rem]">
					<textarea
						id="note"
						className="bg-transparent p-2 rounded-sm relative text-gray-200 resize-none mb-6 outline-0 w-full placeholder:text-[#fad6a5] caret-[#fad6a5] border-2 border-slate-500 shadow-md focus:border-slate-400 focus:outline-0"
						placeholder="Note..."
						title="Add Note"
						spellCheck="true"
						autoFocus
						value={note}
						// onChange={handleSpeechToText}
						onChange={(e) => setNote(e.target.value)}
						required
					></textarea>
					<span
						className="absolute bottom-6 bg-transparent p-2 rounded-full right-2 cursor-pointer inline-block m-2 hover:scale-[1.1]"
						title="Record Note"
						// onClick={handleSpeechToText}
					>
						{isListening && (
							<BsFillMicFill
								className="text-[#fad6a5] md:text-3xl text-2xl"
								onClick={stopListening}
							/>
						)}
						{!isListening && (
							<BsMicMuteFill
								className="text-gray-200 md:text-3xl text-2xl"
								onClick={startListening}
							/>
						)}
					</span>
				</label>
			</form>
		</section>
	)
}
