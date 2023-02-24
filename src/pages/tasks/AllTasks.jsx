import Tasks from '../../components/Tasks';
import FetchTasks from '../../utils/tasks/FetchTasks';

export default function AllTasks() {
	const { allTasks, isPending, error } = FetchTasks();

	return (
		<>
			<Tasks
				tasks={allTasks}
				isPending={isPending}
				error={error}
				isEmpty={''}
			/>
		</>
	);
}
