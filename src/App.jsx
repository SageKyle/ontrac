import { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// components/utils
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CheckIfNotFirstTime from './utils/CheckIfNotFirstTime';
import Welcome from './utils/Welcome';
// pages/routes
import Docs from './components/Docs';
import ForgotPassword from './pages/auth/ForgotPassword';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/home/Home';
import AddNewNote from './pages/notes/AddNewNote';
import AddTask from './pages/tasks/AddTask';
import FallbackRoute from './utils/routes/FallbackRoute';
// Tasks
import AllTasks from './pages/tasks/AllTasks';
import StarredTasks from './pages/tasks/StarredTasks';
import UncompletedTasks from './pages/tasks/UncompletedTasks';
// notes
import AllNotes from './pages/notes/AllNotes';
import EditNote from './pages/notes/EditNote';
import StarredNotes from './pages/notes/StarredNotes';
// auth
import { useAuthContext } from './hooks/auth/useAuthContext';
import LoginRoute from './utils/routes/LoginRoute';
import ProtectedRoute from './utils/routes/ProtectedRoute';
// loader
import Logo from './assets/ontrac.png';
import Loading from './utils/Loading';

function App() {
	// auth
	const { user, authIsReady } = useAuthContext();

	const { notFirstTime, setNotFirstTime } = CheckIfNotFirstTime();
	// sidebar
	const sidebarRef = useRef();

	function toggleSidebar() {
		sidebarRef.current.classList.toggle('hidden');
	}
	function hideSidebar() {
		sidebarRef.current.classList.add('hidden');
	}

	return (
		<div className="App relative flex flex-col justify-center bg-[#01233f] text-gray-200 min-h-[100vh]">
			<img
				className="h-12 absolute top-4 right-4 inline-block"
				src={Logo}
				alt="onTrac"
			/>
			<Router>
				{/* welcome page */}
				{!notFirstTime && <Welcome setNotFirstTime={setNotFirstTime} />}

				{notFirstTime && (
					<>
						{authIsReady && (
							<>
								<main
									className="p-10 pb-[4rem] w-full my-auto min-h-full"
									// hide sidebar when user clicks outside the area
									onClick={hideSidebar}
								>
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
											<Route
												element={<StarredTasks />}
												path={'/starred-tasks'}
											/>
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
											<Route
												element={<StarredNotes />}
												path={'/starred-notes'}
											/>
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
										<Route
											element={<LoginRoute user={user} />}
											path={'/sign-in'}
										>
											<Route element={<SignIn />} path={'/sign-in'} />
										</Route>
										{/* register */}
										<Route
											element={<LoginRoute user={user} />}
											path={'/sign-up'}
										>
											<Route element={<SignUp />} path={'/sign-up'} />
										</Route>
										{/* forgot password */}
										<Route
											element={<LoginRoute user={user} />}
											path={'/iforgot'}
										>
											<Route element={<ForgotPassword />} path={'/iforgot'} />
										</Route>
										{/* documentation */}
										<Route element={<Docs />} path={'docs'} />
										{/* fallback */}
										<Route element={<FallbackRoute />} path={'*'} />
									</Routes>
								</main>
								{/* sidebar */}
								<div ref={sidebarRef} className="hidden">
									<Sidebar />
								</div>
								{/* navbar */}
								<Navbar toggleSidebar={toggleSidebar} />
							</>
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

export default App;

// TODO install/ add animation (framer motion)
