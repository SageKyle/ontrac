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
import AddNewNote from './pages/AddNewNote';
import AddTodo from './pages/AddTodo';
import ForgotPassword from './pages/auth/ForgotPassword';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Docs from './pages/Docs';
import Home from './pages/Home';
import FallbackRoute from './utils/routes/FallbackRoute';
// todos
import BookmarkedTodos from './pages/todos/BookmarkedTodos';
import UncompletedTodos from './pages/todos/UncompletedTodos';
// notes
import AllNotes from './pages/notes/AllNotes';
import BookmarkedNotes from './pages/notes/BookmarkedNotes';
// auth
import useAuthState from './hooks/auth/useAuthState';
import LoginRoute from './utils/routes/LoginRoute';
import ProtectedRoute from './utils/routes/ProtectedRoute';
// loader
import Loading from './utils/Loading';

function App() {
	// auth
	const { authState, user, isPending, error } = useAuthState();

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
		<div className="App relative bg-[#567189] text-gray-200 min-h-[100vh]">
			<Router>
				{/* welcome page */}
				{!notFirstTime && <Welcome setNotFirstTime={setNotFirstTime} />}

				{notFirstTime && (
					<>
						{/* show loader */}
						{isPending && <Loading />}
						{/* handle error */}
						{error && (
							<h1 className="text-2xl p-6">
								Something went wrong... please reload the page
							</h1>
						)}

						{authState && (
							<>
								<main
									className="p-10 pb-[4rem]"
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
										{/* new todo */}
										<Route
											element={<ProtectedRoute user={user} />}
											path={'/new-todo'}
										>
											<Route element={<AddTodo />} path={'/new-todo'} />
										</Route>
										{/* uncompleted todos */}
										<Route
											element={<ProtectedRoute user={user} />}
											path={'/uncompleted-todos'}
										>
											<Route
												element={<UncompletedTodos />}
												path={'/uncompleted-todos'}
											/>
										</Route>
										{/* bookmarked todos */}
										<Route
											element={<ProtectedRoute user={user} />}
											path={'/bookmarked-todos'}
										>
											<Route
												element={<BookmarkedTodos />}
												path={'/bookmarked-todos'}
											/>
										</Route>
										{/* all notes */}
										<Route
											element={<ProtectedRoute user={user} />}
											path={'/notes'}
										>
											<Route element={<AllNotes />} path={'/notes'} />
										</Route>
										{/* bookmarked notes */}
										<Route
											element={<ProtectedRoute user={user} />}
											path={'/bookmarked-notes'}
										>
											<Route
												element={<BookmarkedNotes />}
												path={'/bookmarked-notes'}
											/>
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
