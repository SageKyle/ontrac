import Notes from '../components/Notes';
import Todos from '../components/Todos';

export default function Home() {
	return (
		<section>
			{/* <h1 className="text-amber-400">This is the Homepage</h1> */}
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				todos
			</h3>
			<Todos />
			<h3 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				notes
			</h3>
			<Notes />
		</section>
	);
}
