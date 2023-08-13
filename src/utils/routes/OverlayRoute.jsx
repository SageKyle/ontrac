import { Suspense, lazy } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import Loading from '../Loading'

const AddNewNote = lazy(() => import('../../pages/notes/AddNewNote'))
const AddTask = lazy(() => import('../../pages/tasks/AddTask'))

export default function OverlayRoute() {
	const [searchParam] = useSearchParams()
	const currentTab = searchParam.get('tab')
	const location = useLocation()

	if (currentTab === null || location.pathname !== '/') return null

	return (
		<Suspense fallback={<Loading />}>
			<section className="fixed inset-0 z-40 bg-[#252c53] flex items-center justify-center w-screen h-screen">
				{currentTab === 'new-note' && <AddNewNote />}
				{currentTab === 'new-task' && <AddTask />}
			</section>
		</Suspense>
	)
}
