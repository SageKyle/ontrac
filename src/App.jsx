import { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddNewNote from './pages/AddNewNote';
import AddTodo from './pages/AddTodo';
import Bookmarks from './pages/Bookmarks';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './utils/Welcome';
// auth
import useAuthState from './hooks/useAuthState';
import LoginRoute from './utils/LoginRoute';
import ProtectedRoute from './utils/ProtectedRoute';
// loader
import Loading from './utils/Loading';

function App() {
	// auth
	const { authState, user, isPending, error } = useAuthState();

	const [notFirstTime, setNotFirstTime] = useState(false);
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
				{!notFirstTime && <Welcome setNotFirstTime={setNotFirstTime} />}

				{notFirstTime && (
					<>
						{isPending && <Loading />}
						{error && <h1>{error}</h1>}

						{authState && (
							<>
								<main
									className="p-10 mb-[6rem]"
									// hide sidebar when user clicks outside the area
									onClick={hideSidebar}
								>
									<Routes>
										{/* logged in user */}
										<Route element={<ProtectedRoute user={user} />} path={'/'}>
											<Route element={<Home />} path={'/'} />
										</Route>

										<Route element={<ProtectedRoute user={user} />} path={'/'}>
											<Route element={<Bookmarks />} path={'/bookmarks'} />
										</Route>

										<Route
											element={<ProtectedRoute user={user} />}
											path={'/new-note'}
										>
											<Route element={<AddNewNote />} path={'/new-note'} />
										</Route>

										<Route
											element={<ProtectedRoute user={user} />}
											path={'/new-todo'}
										>
											<Route element={<AddTodo />} path={'/new-todo'} />
										</Route>

										{/* logged out user */}
										<Route
											element={<LoginRoute user={user} />}
											path={'/sign-in'}
										>
											<Route element={<SignIn />} path={'/sign-in'} />
										</Route>

										<Route
											element={<LoginRoute user={user} />}
											path={'/sign-up'}
										>
											<Route element={<SignUp />} path={'/sign-up'} />
										</Route>

										<Route
											element={<LoginRoute user={user} />}
											path={'/iforgot'}
										>
											<Route element={<ForgotPassword />} path={'/iforgot'} />
										</Route>
									</Routes>
								</main>
								<div ref={sidebarRef} className="hidden">
									<Sidebar />
								</div>
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
