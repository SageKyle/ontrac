import Tasks from '../../components/Tasks';
import FetchTasks from '../../utils/tasks/FetchTasks';

export default function StarredTasks() {
	const { StarredTasks, isPending, error } = FetchTasks();

	return (
		<>
			<h1 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				Your important tasks
			</h1>
			<Tasks
				tasks={StarredTasks}
				isPending={isPending}
				error={error}
				isEmpty={"There's nothing here!"}
			/>
		</>
	);
}
