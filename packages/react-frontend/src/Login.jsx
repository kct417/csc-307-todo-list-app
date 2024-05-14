import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
	const [creds, setCreds] = useState({
		username: '',
		password: '',
	});
	const [loginSuccess, setLoginSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (loginSuccess) {
			navigate('/tasks');
		}
	}, [loginSuccess, navigate]);

	function handleChange(event) {
		const { name, value } = event.target;
		switch (name) {
			case 'username':
				setCreds({ ...creds, username: value });
				break;
			case 'password':
				setCreds({ ...creds, password: value });
				break;
		}
	}

	function loginUser() {
		const promise = fetch(`${props.API_PREFIX}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(creds),
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.json()
						.then((payload) => props.setToken(payload.token));
					console.log(
						`Login successful for user: '${creds.username}'`,
					);
					console.log(`Auth token saved`);
					setLoginSuccess(true);
				} else {
					response
						.text()
						.then((text) =>
							console.log(
								`Login Error ${response.status}: ${text}`,
							),
						);
				}
			})
			.catch((error) => {
				console.log(`Login Error: ${error}`);
			});

		return promise;
	}

	return (
		<form>
			<label htmlFor="username">UserName</label>
			<input
				type="text"
				name="username"
				id="username"
				value={creds.username}
				onChange={handleChange}
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				value={creds.password}
				onChange={handleChange}
			/>
			<input type="button" value={'Log In'} onClick={loginUser} />
		</form>
	);
}

Login.propTypes = {
	API_PREFIX: PropTypes.string,
	setToken: PropTypes.func.isRequired,
};

export default Login;
