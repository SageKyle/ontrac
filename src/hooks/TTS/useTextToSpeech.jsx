import { useEffect } from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

export default function useSpeechToText() {
	const { transcript, listening } = useSpeechRecognition();
	const stopListening = SpeechRecognition.stopListening;

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

	return { listening, stopListening, listenContinuously, transcript };
}

// TODO research/fix
