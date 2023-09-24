import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { BsStarFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useDeleteDoc from '../hooks/db/useDeleteDoc'
import useUpdateDoc from '../hooks/db/useUpdateDoc'
import Loading from '../utils/Loading'
import ErrorModal from '../utils/modals/ErrorModal'

export default function Tasks({ tasks, isPending, error, isEmpty }) {
	const {
		updateDocument,
		isPending: updating,
		error: err,
	} = useUpdateDoc('tasks')
	const { deleteDocument, isPending: isLoading } = useDeleteDoc('tasks')

	async function handleDelete(id, event) {
		event.stopPropagation()
		await deleteDocument(id)
	}

	async function completeTask(task) {
		// if task is completed, toggle the value
		const completed = task.completed ? false : true
		const newTask = { ...task, completed }
		await updateDocument(task.id, newTask)
	}

	return (
		<>
			<section className="mb-4 flex items-start justify-start flex-wrap">
				{/* error loading component */}
				{error && (
					<ErrorModal>
						<p>{error}</p>
					</ErrorModal>
				)}
				{/* error updating a task */}
				{err && toast.error(err)}
				{/* empty/null tasks list */}
				{(!tasks || tasks.length === 0) && <h4>{isEmpty}</h4>}
				{/* pending state */}
				{(isLoading || updating || isPending) && <Loading />}

				{tasks &&
					tasks.map((task) => (
						<div
							key={task.id}
							className="m-2 p-2 border border-slate-500 relative cursor-pointer rounded shadow-md sm:w-full md:w-[20rem]"
							disabled={updating}
							onClick={() => completeTask(task)}
						>
							<h4
								className={
									task.completed
										? 'capitalize text-[#fad6a5] line-through text-base lg:text-xl font-semibold mt-4'
										: 'capitalize text-base lg:text-xl font-semibold mt-4'
								}
							>
								{task.task}
							</h4>
							<div className="absolute right-2 flex flex-col items-center justify-between top-2 bottom-2">
								{task.starred && !task.completed && (
									<BsStarFill className="text-[#fad6a5] text-xl inline-block" />
								)}
								{task.completed && (
									<FaTrash
										className="text-red-500 text-xl inline-block"
										onClick={(e) => handleDelete(task.id, e)}
									/>
								)}
							</div>

							{/* <p className="text-sm">{task.note}</p> */}
							<small className="text-cyan-200">
								{formatDistanceToNow(new Date(task.dueDate), {
									addSuffix: true,
								})}
							</small>
						</div>
					))}
			</section>
		</>
	)
}
