import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddItem from './pages/AddItem';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './utils/Welcome';
// auth
import useAuthState from './hooks/useAuthState';

function App() {
	// auth
	const { authState, isPending, error } = useAuthState();

	const [notFirstTime, setNotFirstTime] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className="App relative bg-slate-600 text-gray-200 min-h-[100vh]">
			<Router>
				{!notFirstTime && <Welcome setNotFirstTime={setNotFirstTime} />}

				{notFirstTime && (
					<>
						{isPending && <h1>Loading...</h1>}
						{error && <h1>{error}</h1>}

						{authState && (
							<>
								<main
									className="p-10 mb-[6rem]"
									// hide sidebar when user clicks outside the area
									onClick={() => setShowSidebar(false)}
								>
									<Routes>
										<Route element={<Home />} path={'/'} />
										<Route element={<AddItem />} path={'/new'} />
										<Route element={<SignIn />} path={'/sign-in'} />
										<Route element={<SignUp />} path={'/sign-up'} />
										<Route element={<ForgotPassword />} path={'/iforgot'} />
									</Routes>
								</main>
								{showSidebar && <Sidebar />}
								<Navbar toggleSidebar={setShowSidebar} />
							</>
						)}
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
