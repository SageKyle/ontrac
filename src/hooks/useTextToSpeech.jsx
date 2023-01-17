import React, { useEffect, useState } from 'react';
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

	// (
	// 	<div className="text-white mb-[6rem]">
	// 		<div>
	// 			<span>listening: {listening ? 'on' : 'off'}</span>
	// 			<div>
	// 				<button type="button" onClick={resetTranscript}>
	// 					Reset
	// 				</button>
	// 				<button type="button" onClick={listenContinuously}>
	// 					Listen
	// 				</button>
	// 				<button type="button" onClick={SpeechRecognition.stopListening}>
	// 					Stop
	// 				</button>
	// 			</div>
	// 		</div>
	// 		<div>
	// 			<span className="block w-full min-h-[6rem] m-2 border-2">
	// 				{transcript}
	// 			</span>
	// 		</div>
	// 	</div>
	// );
}
