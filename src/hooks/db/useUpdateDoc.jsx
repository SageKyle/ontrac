import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

export default function useUpdateDoc() {
	// const queryClient = useQueryClient();

	async function updateDocument(firestoreCollection, id, updates) {
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

	function completeTask(task) {
		const completed = task.data().completed;
		const isCompleted = {
			completed: !completed,
		};

		const taskQuery = useMutation({
			mutationKey: ['tasks', task.id],
			mutationFn: () => updateDocument('tasks', task.id, isCompleted),
			// onSuccess: () => queryClient.invalidateQueries(['tasks', task.id]),
		});

		taskQuery.mutate;
	}

	return { updateDocument, completeTask };
}
