import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toast } from 'react-toastify';
import useUpdateDoc from '../hooks/db/useUpdateDoc';
// import Loading from '../utils/Loading';
import { BsStarFill } from 'react-icons/bs';
import ErrorModal from '../utils/modals/ErrorModal';

export default function Tasks({ tasks, isPending, error, isEmpty }) {
	const {
		updateDocument,
		isPending: updating,
		error: err,
	} = useUpdateDoc('tasks');

	async function completeTask(task) {
		// if task is completed, toggle the value
		const completed = task.completed ? false : true;
		const newTask = { ...task, completed };
		await updateDocument(task.id, newTask);
	}

	return (
		<>
			<section className="mb-4 flex items-start justify-start flex-wrap">
				{/* loading component */}
				{/* {isPending && <Loading />} */}
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

				{tasks &&
					tasks.map((task) => (
						<div
							key={task.id}
							className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
							onClick={() => completeTask(task)}
							disabled={updating}
						>
							<h4
								className={
									task.completed
										? 'capitalize text-[#fad6a5] line-through text-2xl'
										: 'capitalize text-2xl'
								}
							>
								{task.task}
							</h4>
							{task.starred && (
								<BsStarFill className="text-[#fad6a5] absolute top-2 right-2" />
							)}

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
	);
}
