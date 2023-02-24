import { useRef } from 'react';
import FetchTasks from '../utils/tasks/FetchTasks';
import AllNotes from './notes/AllNotes';
import AllTasks from './tasks/AllTasks';
import StarredTasks from './tasks/StarredTasks';

export default function Home() {
	const { numberOfUncompletedTasks } = FetchTasks();
	const tasksRef = useRef();
	const toggleRef = useRef();

	function showMore() {
		tasksRef.current.classList.toggle('hidden');
		// tasksRef.current.classList.add('hidden');
	}

	return (
		<section>
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				Tasks
			</h3>
			<>
				<h2 className="text-2xl my-4">
					You have {numberOfUncompletedTasks} uncompleted tasks
				</h2>
				{/* Starred Tasks */}
				<div className="mb-4 border-b-2 border-slate-500 w-full">
					<StarredTasks />
				</div>

				<h4
					className="text-[#fad6a5] m-2 hover:underline"
					ref={toggleRef}
					onClick={showMore}
				>
					More
				</h4>
				{/* All Tasks */}
				<div className="hidden w-full" ref={tasksRef}>
					<AllTasks />
				</div>
			</>
			{/* Notes */}
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				notes
			</h3>
			<AllNotes />
		</section>
	);
}
