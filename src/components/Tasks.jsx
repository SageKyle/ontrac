import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toast } from 'react-toastify';
import useUpdateDoc from '../hooks/db/useUpdateDoc';
import Loading from '../utils/Loading';

export default function Tasks({ tasks, isPending, error, isEmpty }) {
	const { completeTask } = useUpdateDoc();

	// function ToggleCompletedTask(task) {
	// 	const completed = task.data().completed;
	// 	updateDocument(task.id, { completed: !completed });
	// }

	return (
		<>
			<section className="mb-4 flex items-start justify-start flex-wrap">
				{isPending && <Loading />}
				{error && toast.error(error)}
				{(!tasks || tasks.length === 0) && <h4>{isEmpty}</h4>}

				{tasks &&
					tasks.map((task) => (
						<div
							key={task.id}
							className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
							onClick={() => completeTask(task)}
						>
							<h4
								className={
									task.completed
										? 'capitalize line-through text-2xl'
										: 'capitalize text-2xl text-[#fad6a5]'
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
