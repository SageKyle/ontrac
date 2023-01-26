import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

export default function useSpeechToText() {
	const { transcript, listening } = useSpeechRecognition();

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(
			'Your browser does not support speech recognition software! Try Chrome desktop, maybe?'
		);
		return null;
	}

	const listenContinuously = () => {
		SpeechRecognition.startListening({
			continuous: true,
			language: 'en-GB',
		});
	};

	const stopListening = SpeechRecognition.startListening;

	return { listenContinuously, listening, stopListening, transcript };
}
