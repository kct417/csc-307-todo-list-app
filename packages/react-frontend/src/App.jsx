import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
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

	const populateUser = (newToken, username, dividers, callback) => {
		setUser({
			token: newToken,
			username: username,
			dividers: dividers,
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
							<Home
								API_PREFIX={API_PREFIX}
								user={user}
								setUser={populateUser}
							/>
						</div>
					}
				/>
				<Route
					path="/login"
					element={
						<div>
							<Login
								API_PREFIX={API_PREFIX}
								handleLoginAndRegister={populateUser}
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
								handleLoginAndRegister={populateUser}
							/>
						</div>
					}
				/>
				<Route
					path="/folders/:folderName"
					element={
						<div>
							<Folder
								API_PREFIX={API_PREFIX}
								user={user}
								setUser={populateUser}
							/>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
