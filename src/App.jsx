import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import AddItem from './pages/AddItem';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';

function App() {
	const [notFirstTime, setNotFirstTime] = useState(false);

	return (
		<div className="App relative bg-slate-600 text-gray-200">
			<Router>
				{!notFirstTime && <Welcome setNotFirstTime={setNotFirstTime} />}

				{notFirstTime && (
					<>
						<main className="p-10">
							<Routes>
								<Route element={<Home />} path={'/'} />
								<Route element={<AddItem />} path={'/new'} />
								<Route element={<SignIn />} path={'/sign-in'} />
								<Route element={<SignUp />} path={'/sign-up'} />
							</Routes>
						</main>
						<Navbar />
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
