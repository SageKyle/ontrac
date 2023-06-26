import { useEffect, useState } from 'react'
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'

// export default function useSpeechToText() {
// 	const { transcript, listening } = useSpeechRecognition();
// 	const stopListening = SpeechRecognition.stopListening;

// 	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
// 		console.log(
// 			'Your browser does not support speech recognition software! Try Chrome desktop, maybe?'
// 		);
// 		return null;
// 	}

// 	const listenContinuously = () => {
// 		SpeechRecognition.startListening({
// 			continuous: true,
// 			language: 'en-GB',
// 		});
// 	};

// 	return { listening, stopListening, listenContinuously, transcript };
// }

export default function useSpeechToText() {
	const [isListening, setIsListening] = useState(false)
	const { transcript, resetTranscript } = useSpeechRecognition()

	function handleStartListening() {
		setIsListening(true)
		SpeechRecognition.startListening({ continuous: true, language: 'en-US' })
		// SpeechRecognition.startListening();
	}

	function handleStopListening() {
		setIsListening(false)
		resetTranscript()
		SpeechRecognition.stopListening()
	}

	useEffect(() => {
		if (isListening) {
			handleStartListening()
		} else {
			handleStopListening()
		}
	}, [isListening])

	return {
		isListening,
		startListening: handleStartListening,
		stopListening: handleStopListening,
		transcript,
		resetTranscript,
	}
}

// TODO research/fix
