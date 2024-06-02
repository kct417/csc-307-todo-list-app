import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Task from './pages/Task';
import Folder from './pages/Folder';

const API_PREFIX = 'http://localhost:8000';

function App() {
	const INVALID_TOKEN = 'INVALID_TOKEN';
	const INVALID_USERNAME = 'INVALID_USERNAME';
	const [user, setUser] = useState({
		token: INVALID_TOKEN,
		username: INVALID_USERNAME,
		dividers: [],
	});

	const handleLoginAndRegister = (newToken, username, callback) => {
		setUser({
			token: newToken,
			username: username,
			dividers: [],
		});
		if (callback) {
			callback();
		}
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Home API_PREFIX={API_PREFIX} user={user} />
						</div>
					}
				/>
				<Route
					path="/login"
					element={
						<div>
							<Login
								API_PREFIX={API_PREFIX}
								handleLoginAndRegister={handleLoginAndRegister}
							/>
						</div>
					}
				/>
				<Route
					path="/signup"
					element={
						<div>
							<Register
								API_PREFIX={API_PREFIX}
								handleLoginAndRegister={handleLoginAndRegister}
							/>
						</div>
					}
				/>
				<Route
					path="/tasks"
					element={
						<div className="d-flex">
							<Task API_PREFIX={API_PREFIX} user={user} />
						</div>
					}
				/>
				<Route
					path="/folder"
					element={
						<div>
							<Folder API_PREFIX={API_PREFIX} user={user} />
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
