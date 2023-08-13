import { BsArrowBarRight } from 'react-icons/bs'

export default function Docs() {
	return (
		<main className="p-4 w-full">
			<h1 className="capitalize text-2xl text-[#fad6a5] font-bold mb-6">
				about OnTrac
			</h1>
			<p className="mt-4">
				<strong>OnTrac</strong> provides a way to organize your daily routines
				by writing them down, and also setting reminders to help you stay
				on-track, no matter where you are.
			</p>
			<p className="">
				We understand that inspiration can come at any time, therefore{' '}
				<strong>OnTrac</strong> also provides a way to freely write down those
				important ideas and access them from anywhere.
			</p>
			<p className="">
				This page provides a basic overview of OnTrac how to use this it. If you
				are curious how it was made, you can{' '}
				<a
					className="text-blue-500"
					href="https://github.com/SageKyle/ontrac"
					target="_blank"
					rel="noopener noreferrer"
				>
					view the source code here.
				</a>
			</p>
			<h2 className="font-bold mb-4 mt-6 text-[#fad6a5]"> Using OnTrac</h2>
			<article>
				<section>
					<h4 className="font-semibold  flex items-center">
						<BsArrowBarRight className="inline-block mr-2" />
						Tasks
					</h4>
					<p>
						tasks provide a way to itemize your daily todos. After adding a
						task, you can mark it as done by clicking on it, or delete the task
						by clicking on the trash icon.
					</p>
				</section>
				<section className="mt-4">
					<h4 className="font-semibold  flex items-center">
						<BsArrowBarRight className="inline-block mr-2" />
						Notes
					</h4>
					<p>
						Notes are an easy way to write down all your ideas as a long-form
						content, and edit them as many times as you want. Notes have a
						special formating that keeps all your linebreaks intact so
						everything appears the way you want it to. After adding a note, you
						can edit it by clicking on it, or delete the note by clicking on the
						trash icon.
					</p>
				</section>
			</article>
		</main>
	)
}
