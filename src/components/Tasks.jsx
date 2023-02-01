import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toast } from 'react-toastify';
import useUpdateDoc from '../hooks/db/useUpdateDoc';
import Loading from '../utils/Loading';

export default function Tasks({ tasks, isPending, error, isEmpty }) {
	const { updateDocument } = useUpdateDoc('tasks');

	async function completedTask(task) {
		const updatedDoc = await updateDocument(task.id, { completed: true });
		console.log(updatedDoc);
	}

	return (
		<>
			<section className="mb-4 flex items-start justify-start flex-wrap">
				{isPending && <Loading />}
				{error && toast.error(error)}
				{(!tasks || tasks.length === 0) && <h4>{isEmpty}</h4>}

				{tasks &&
					tasks.map((task) => (
						<div
							key={Math.random()}
							className="m-2 p-2 border-2 relative cursor-pointer rounded sm:w-full md:w-[20rem]"
							onClick={() => completedTask(task)}
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
							{task.completed && (
								<span className="absolute top-0 right-1 block text-[#fad6a5] font-bold">
									Done
								</span>
							)}
							<p className="text-sm">{task.note}</p>
							<p>
								{formatDistanceToNow(task.createdAt.toDate(), {
									addSuffix: true,
								})}
							</p>
						</div>
					))}
			</section>
		</>
	);
}
