import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../firebase/firebase.config'

export default function useDeleteDoc(DBCollection) {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)

	async function deleteDocument(id) {
		setIsPending(true)
		setError(null)

		try {
			await deleteDoc(doc(db, DBCollection, id))

			//   update state
			setIsPending(false)
			setError(null)
		} catch (err) {
			console.log(err.message)
			setError(err.message)
			setIsPending(false)
		}
	}

	return { deleteDocument, isPending, error }
}
