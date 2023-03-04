import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

export default function useFetchSingleDoc(collection) {
	// fetch single note
	async function fetchSingleDoc(id) {
		let result = [];

		try {
			// get docs
			const docRef = doc(db, collection, id);
			const singleDoc = await getDoc(docRef);

			if (!singleDoc.exists()) {
				throw new Error('Something went wrong...');
			}

			// add docs
			result.push({ id: singleDoc.id, ...singleDoc.data() });
		} catch (err) {
			console.log(err);
		}

		return result;
	}
	return { fetchSingleDoc };
}
