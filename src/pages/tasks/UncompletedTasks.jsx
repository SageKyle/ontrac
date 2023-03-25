import Tasks from '../../components/Tasks';
import FetchTasks from '../../utils/tasks/FetchTasks';

export default function UncompletedTasks() {
	const { uncompletedTasks, isPending, error } = FetchTasks();

	return (
		<>
			{/* <h1 className="capitalize my-4 text-[#fad6a5] font-medium">
				uncompleted tasks
			</h1> */}
			<Tasks
				tasks={uncompletedTasks}
				isPending={isPending}
				error={error}
				isEmpty={''}
			/>
		</>
	);
}
