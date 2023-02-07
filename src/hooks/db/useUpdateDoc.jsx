import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

async function updateDocument(id, updates, firestoreCollection) {
	let updatedDoc = null;

	try {
		const updatedDoc = await updateDoc(doc(db, firestoreCollection, id), {
			...updates,
		});

		if (!updatedDoc) {
			throw new Error('Something went wrong...');
		}
	} catch (err) {
		console.error(err.message);
	}

	return updatedDoc;
}

export { updateDocument };
