import AnonymousAuth from './AnonymousAuth';
import AuthWithApple from './AuthWithApple';
import AuthWithGoogle from './AuthWithGoogle';

export default function AlternativeAuth() {
	return (
		<section className="">
			<div className="flex w-full justify-center item-center my-6">
				<span className="uppercase text-2xl">or</span>
			</div>
			<article className="h-14 flex items-center justify-center space-x-4 mb-20">
				<AuthWithGoogle />
				<AuthWithApple />
				<AnonymousAuth />
			</article>
		</section>
	);
}
