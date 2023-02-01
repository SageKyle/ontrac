import AllNotes from './notes/AllNotes';
import AllTasks from './tasks/AllTasks';

export default function Home() {
	return (
		<section>
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				Tasks
			</h3>
			<AllTasks />
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				notes
			</h3>
			<AllNotes />
		</section>
	);
}
