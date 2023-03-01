import Tasks from '../../components/Tasks';
import FetchTasks from '../../utils/tasks/FetchTasks';

export default function StarredTasks() {
	const { StarredTasks, isPending, error } = FetchTasks();

	return (
		<>
			<h4 className="capitalize mb-4 text-[#fad6a5] font-medium">
				Your important tasks
			</h4>
			<Tasks
				tasks={StarredTasks}
				isPending={isPending}
				error={error}
				isEmpty={"There's nothing here!"}
			/>
		</>
	);
}
