import { Suspense, lazy, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// components/utils
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CheckIfNotFirstTime from './utils/CheckIfNotFirstTime';
import Welcome from './utils/Welcome';
import ErrorBoundaryWrapper from './utils/modals/ErrorBoundary';
// pages/routes
const Docs = lazy(() => import('./components/Docs'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const AddNewNote = lazy(() => import('./pages/notes/AddNewNote'));
const AddTask = lazy(() => import('./pages/tasks/AddTask'));
const FallbackRoute = lazy(() => import('./utils/routes/FallbackRoute'));

import SignIn from './pages/auth/SignIn';

const Home = lazy(() => import('./pages/home/Home'));
// Tasks
const AllTasks = lazy(() => import('./pages/tasks/AllTasks'));
const StarredTasks = lazy(() => import('./pages/tasks/StarredTasks'));
const UncompletedTasks = lazy(() => import('./pages/tasks/UncompletedTasks'));
// notes
const AllNotes = lazy(() => import('./pages/notes/AllNotes'));
const EditNote = lazy(() => import('./pages/notes/EditNote'));
const StarredNotes = lazy(() => import('./pages/notes/StarredNotes'));
// auth
import { useAuthContext } from './hooks/auth/useAuthContext';
import LoginRoute from './utils/routes/LoginRoute';
import ProtectedRoute from './utils/routes/ProtectedRoute';
// loader
import Logo from './assets/ontrac.png';
import Loading from './utils/Loading';
// animation
import { motion } from 'framer-motion';

const variants = {
	open: {
		y: null,
		opacity: 1,
		transition: {
			y: { stiffness: 1, ease: 'easeOut', velocity: 10, duration: 1.5 },
		},
	},
	closed: {
		y: 0,
		opacity: 0,
		transition: {
			y: { stiffness: 1, velocity: -100, duration: 1.5 },
		},
	},
};

function App() {
	// auth
	const { user, authIsReady } = useAuthContext();

	const { notFirstTime, setNotFirstTime } = CheckIfNotFirstTime();
	const [isOpen, setIsOpen] = useState(false);
	// sidebar
	// const sidebarRef = useRef();

	function toggleSidebar() {
		setIsOpen((prev) => !prev);
	}
	function hideSidebar() {
		setIsOpen(false);
	}

	return (
		<div className="App relative flex flex-col justify-center bg-[#252c53] text-gray-200 min-h-[100vh]">
			<img
				className="h-12 absolute top-4 right-4 inline-block"
				src={Logo}
				alt="onTrac"
			/>
			<Router>
				{/* welcome page */}
				{!notFirstTime && <Welcome setNotFirstTime={setNotFirstTime} />}
				{/* {notFirstTime && ( */}
				{authIsReady && notFirstTime && (
					<>
						<main
							className="p-10 pb-[4rem] w-full my-auto min-h-full"
							// hide sidebar when user clicks outside the area
							onClick={hideSidebar}
						>
							<Suspense fallback={<Loading />}>
								<Routes>
									{/* logged in user */}
									{/* home */}
									<Route element={<ProtectedRoute user={user} />} path={'/'}>
										<Route element={<Home />} path={'/'} />
									</Route>

									{/* add note */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/new-note'}
									>
										<Route element={<AddNewNote />} path={'/new-note'} />
									</Route>
									{/* new Task */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/new-task'}
									>
										<Route element={<AddTask />} path={'/new-task'} />
									</Route>
									{/* uncompleted tasks */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/uncompleted-tasks'}
									>
										<Route
											element={<UncompletedTasks />}
											path={'/uncompleted-tasks'}
										/>
									</Route>
									{/* starred tasks */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/starred-tasks'}
									>
										<Route element={<StarredTasks />} path={'/starred-tasks'} />
									</Route>
									{/* all tasks */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/tasks'}
									>
										<Route element={<AllTasks />} path={'/tasks'} />
									</Route>
									{/* all notes */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/notes'}
									>
										<Route element={<AllNotes />} path={'/notes'} />
									</Route>
									{/* starred notes */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/starred-notes'}
									>
										<Route element={<StarredNotes />} path={'/starred-notes'} />
									</Route>
									{/* edit notes */}
									<Route
										element={<ProtectedRoute user={user} />}
										path={'/edit-note/:id'}
									>
										<Route element={<EditNote />} path={'/edit-note/:id'} />
									</Route>

									{/* logged out user */}
									{/* login */}
									<Route element={<LoginRoute user={user} />} path={'/sign-in'}>
										<Route element={<SignIn />} path={'/sign-in'} />
									</Route>
									{/* register */}
									<Route element={<LoginRoute user={user} />} path={'/sign-up'}>
										<Route element={<SignUp />} path={'/sign-up'} />
									</Route>
									{/* forgot password */}
									<Route element={<LoginRoute user={user} />} path={'/iforgot'}>
										<Route element={<ForgotPassword />} path={'/iforgot'} />
									</Route>
									{/* documentation */}
									<Route element={<Docs />} path={'docs'} />
									{/* fallback */}
									<Route element={<FallbackRoute />} path={'*'} />
								</Routes>
							</Suspense>
						</main>
						{/* sidebar */}
						{(user || user?.isAnonymous) && isOpen && (
							<motion.div
								animate={isOpen ? 'open' : 'closed'}
								variants={variants}
							>
								<Sidebar hideSidebar={hideSidebar} />
							</motion.div>
						)}
						{/* navbar */}
						{(user || user?.isAnonymous) && (
							<Navbar toggleSidebar={toggleSidebar} />
						)}
					</>
				)}
			</Router>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</div>
	);
}

export default ErrorBoundaryWrapper(App);
