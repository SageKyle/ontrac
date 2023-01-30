import Todos from '../../components/Todos';
import FetchTodos from '../../utils/todos/FetchTodos';

export default function UncompletedTodos() {
	const { uncompletedTodos, isPending, error } = FetchTodos();

	return (
		<>
			<h1 className="capitalize my-4 text-2xl text-[#fad6a5] font-bold">
				uncompleted todos
			</h1>
			<Todos todos={uncompletedTodos} isPending={isPending} error={error} />
		</>
	);
}
