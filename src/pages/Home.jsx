import Notes from '../components/Notes';
import AllTodos from './todos/AllTodos';

export default function Home() {
	return (
		<section>
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				todos
			</h3>
			<AllTodos />
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				notes
			</h3>
			<Notes />
		</section>
	);
}
