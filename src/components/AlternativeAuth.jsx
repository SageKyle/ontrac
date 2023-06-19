import AnonymousAuth from './AnonymousAuth';
// import AuthWithApple from './AuthWithApple';
import AuthWithGoogle from './AuthWithGoogle';

export default function AlternativeAuth() {
	return (
		<section className="relative w-full block">
			<div className="flex relative w-full after:absolute after:top-1/2 after:w-full after:h-[2px] after:bg-slate-500 after:block after:z-0 justify-center item-center my-6">
				<span className="uppercase bg-[#252d58] z-10 text-semibold border-2 border-gray-500 rounded px-2 py-1">
					or
				</span>
			</div>
			<article className="h-14 w-full flex items-center justify-center gap-4 mb-20">
				<AuthWithGoogle />
				{/* <AuthWithApple /> */}
				<AnonymousAuth />
			</article>
		</section>
	);
}
