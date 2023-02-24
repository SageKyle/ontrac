import Tasks from '../../components/Tasks';
import FetchTasks from '../../utils/tasks/FetchTasks';

export default function StarredTasks() {
	const { StarredTasks, isPending, error } = FetchTasks();

	return (
		<>
			<Tasks
				tasks={StarredTasks}
				isPending={isPending}
				error={error}
				isEmpty={''}
			/>
		</>
	);
}
