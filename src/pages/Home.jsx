import useFetchDoc from '../hooks/useFetchDoc';

export default function Home() {
	const { docs, isPending, error } = useFetchDoc('todos');

	return (
		<section>
			<h1 className="text-amber-400">This is the Page</h1>
			{docs &&
				docs.map((todo) => (
					<div key={Math.random()} className="mb-4 border-b-2 border-slate-100">
						<h1>{todo.todo}</h1>
						<p>{todo.note}</p>
						<p>{todo.createdAt.toDate().toDateString()}</p>
						<span>{todo.completed}</span>
					</div>
				))}
			<p className="my-6">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non alias
				molestias sit maiores debitis nisi saepe illum velit eaque possimus
				delectus eos fugiat itaque, expedita, dolorum consectetur odit
				repellendus in nulla facilis quibusdam ex aliquid iste. Harum mollitia
				accusantium amet dolor, perferendis molestias reiciendis magnam veniam
				labore possimus nihil necessitatibus vero voluptates saepe dignissimos
				earum, porro eligendi. Temporibus cumque expedita, eos sunt perferendis,
				aperiam iure alias sed, facilis asperiores ipsum animi dicta. Ipsa id
				sint commodi voluptatum ducimus, est sapiente illo ut aut illum fugiat
				sequi ipsum sed explicabo corrupti vero, quod sunt facilis repellat
				quasi voluptate beatae. Reprehenderit, ut.
			</p>
			<p className="my-6">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non alias
				molestias sit maiores debitis nisi saepe illum velit eaque possimus
				delectus eos fugiat itaque, expedita, dolorum consectetur odit
				repellendus in nulla facilis quibusdam ex aliquid iste. Harum mollitia
				accusantium amet dolor, perferendis molestias reiciendis magnam veniam
				labore possimus nihil necessitatibus vero voluptates saepe dignissimos
				earum, porro eligendi. Temporibus cumque expedita, eos sunt perferendis,
				aperiam iure alias sed, facilis asperiores ipsum animi dicta. Ipsa id
				sint commodi voluptatum ducimus, est sapiente illo ut aut illum fugiat
				sequi ipsum sed explicabo corrupti vero, quod sunt facilis repellat
				quasi voluptate beatae. Reprehenderit, ut.
			</p>
			<p className="my-6">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non alias
				molestias sit maiores debitis nisi saepe illum velit eaque possimus
				delectus eos fugiat itaque, expedita, dolorum consectetur odit
				repellendus in nulla facilis quibusdam ex aliquid iste. Harum mollitia
				accusantium amet dolor, perferendis molestias reiciendis magnam veniam
				labore possimus nihil necessitatibus vero voluptates saepe dignissimos
				earum, porro eligendi. Temporibus cumque expedita, eos sunt perferendis,
				aperiam iure alias sed, facilis asperiores ipsum animi dicta. Ipsa id
				sint commodi voluptatum ducimus, est sapiente illo ut aut illum fugiat
				sequi ipsum sed explicabo corrupti vero, quod sunt facilis repellat
				quasi voluptate beatae. Reprehenderit, ut.
			</p>
		</section>
	);
}
