import { toast } from 'react-toastify';

export default function TaskAction(deleteTask, completed, toggleTask) {
	// task completed
	function toggleCompleted() {
		toggleTask();
		toast.success('Hoorah!');
	}

	// not yet completed
	function toggleNotCompleted() {
		toggleTask();
		toast.info('Not Done ;)');
	}

	return (
		<section className="flex space-x-2">
			<div className="capitalize font-medium">
				{completed && (
					<buttion className="text-green-600" onClick={toggleCompleted}>
						done :)
					</buttion>
				)}
				{!completed && (
					<buttion className="text-orange-500" onClick={toggleNotCompleted}>
						not done ;)
					</buttion>
				)}
			</div>
			<buttion className="text-red-600" onClick={deleteTask}>
				Delete
			</buttion>
		</section>
	);
}
