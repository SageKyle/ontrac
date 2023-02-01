import Tasks from '../../components/Tasks';
import FetchTasks from '../../utils/tasks/FetchTasks';

export default function AllTodos() {
	const { allTasks, numberOfUncompletedTasks, isPending, error } = FetchTasks();

	return (
		<>
			<h2 className="text-2xl my-4">
				You have {numberOfUncompletedTasks} uncompleted tasks
			</h2>
			<Tasks
				tasks={allTasks}
				isPending={isPending}
				error={error}
				isEmpty={''}
			/>
		</>
	);
}
