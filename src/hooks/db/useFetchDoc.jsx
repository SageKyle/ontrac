import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'

import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase.config'

export default function useFetchDoc(firestoreCollection) {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(true)
	const [isCancelled, setIsCancelled] = useState(false)

	// auth
	const auth = getAuth()

	useEffect(() => {
		// fetch all tasks
		// async function fetchAllDocs() {
		setError(null)
		setIsPending(true)
		try {
			// get current user
			const user = auth.currentUser

			onAuthStateChanged(auth, (userExists) => {
				if (userExists) {
					// get docs
					const docRef = collection(db, firestoreCollection)
					const docQuery = query(
						docRef,
						where('userId', '==', user.uid),
						orderBy('createdAt', 'desc'),
						orderBy('starred', 'desc')
					)

					// set
					onSnapshot(docQuery, (snapshot) => {
						const result = []
						snapshot.forEach((doc) => {
							result.push({ id: doc.id, ...doc.data() })
						})
						setData(result)
					})

					// unsub();
				} else {
					setError('You need to login first!')
				}
			})

			// unsub();
			if (!isCancelled) {
				setError(null)
				setIsPending(false)
			}
		} catch (err) {
			if (!isCancelled) {
				console.log(err)
				setError(err.message)
				toast(err.message)
				setIsPending(false)
			}
		}
		// }
		return () => setIsCancelled(true)
	}, [auth])

	return { data, error, isPending }
}
