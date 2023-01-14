import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />

				<Routes>
					<Route element={<Welcome />} path={'/welcome'} />
					<Route element={<Home />} path={'/'} />
					<Route element={<SignIn />} path={'/sign-in'} />
					<Route element={<SignUp />} path={'/sign-up'} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
