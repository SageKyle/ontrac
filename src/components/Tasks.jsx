import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toast } from 'react-toastify';
import Fetching from '../assets/Rolling-spinner.svg';
import useUpdateDoc from '../hooks/db/useUpdateDoc';
import Loading from '../utils/Loading';

export default function Tasks({ tasks, isPending, error, isEmpty }) {
	const {
		updateDocument,
		isPending: loading,
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
				{isPending && <Loading />}
				{/* error loading component */}
				{error && toast.error(error)}
				{/* error updating a task */}
				{err && toast.error(err)}
				{/* empty/null tasks list */}
				{(!tasks || tasks.length === 0) && <h4>{isEmpty}</h4>}

				{tasks &&
					tasks.map((task) => (
						<div
							key={task.id}
							className={`m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem] ${
								loading ? 'opacity-40' : ''
							}`}
							onClick={() => completeTask(task)}
							disabled={loading}
						>
							{/* {loading && (
								<img
									className="absolute w-12 top-6 right-1/2 z-20"
									src={Fetching}
									alt="loading..."
								/>
							)} */}
							<h4
								className={
									task.completed
										? 'capitalize text-[#fad6a5] line-through text-2xl'
										: 'capitalize text-2xl'
								}
							>
								{task.task}
							</h4>

							<p className="text-sm">{task.note}</p>
							<p>
								{formatDistanceToNow(new Date(task.dueDate), {
									addSuffix: true,
								})}
							</p>
						</div>
					))}
			</section>
		</>
	);
}
