export default function AddItem() {
	return (
		<form className="h-screen pb-10 pt-4">
			<label className="focus:border-b-2 flex p-1 w-full border-slate-700 mb-4">
				<input
					type="text"
					placeholder="Title"
					className="bg-transparent border-0 outline-0"
				/>
			</label>
			<label className="flex p-2 w-full relative h-[20rem]">
				<textarea
					id="note"
					className="bg-transparent resize-none mb-6 outline-0 w-full"
					placeholder="Note"
					required
					autoFocus
				></textarea>
				<span
					className="absolute bottom-2 right-2 cursor-pointer inline-block m-2 hover:text-amber-300"
					title="Record Note"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
						/>
					</svg>
				</span>
			</label>
		</form>
	);
}
