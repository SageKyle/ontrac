import LoadingIcon from '../assets/Pulse-spinner.svg';

export default function Loading() {
	return (
		<aside
			aria-hidden
			className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(123, 143, 161, .8)] z-50"
		>
			<img src={LoadingIcon} alt="loading icon" className="h-10 w-10" />
		</aside>
	);
}
