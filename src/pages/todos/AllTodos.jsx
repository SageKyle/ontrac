import Todos from '../../components/Todos';
import FetchTodos from '../../utils/todos/FetchTodos';

export default function AllTodos() {
	const { allTodos, numberOfUncompletedTodos, isPending, error } = FetchTodos();

	return (
		<>
			<h2 className="text-2xl my-4">
				You have {numberOfUncompletedTodos} uncompleted tasks
			</h2>
			<Todos todos={allTodos} isPending={isPending} error={error} />
		</>
	);
}
