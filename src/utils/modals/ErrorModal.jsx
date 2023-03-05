export default function ErrorModal({ children }) {
	return (
		<dialog className="border-2 rounded border-red-600 bg-red-200 text-red-500 m-2">
			{children}
		</dialog>
	);
}
