import express from 'express';
import cors from 'cors';

import '../mongoose-database/index.js';
import { registerUser, loginUser, authenticateUser } from './auth-user.js';
import {
	getUser,
	getTasks,
	createTask,
	deleteTask,
	getDividers,
	getFolders,
} from './fetch-task.js';

const app = express();
const port = 8000;
const API_PREFIX = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.post('/signup', registerUser);

app.post('/login', loginUser);

app.post('/users', authenticateUser, getUser);

app.post('/dividers', authenticateUser, getDividers);

app.post('/folders', authenticateUser, getFolders);

app.post('/tasks', authenticateUser, getTasks);

app.post('/tasks', authenticateUser, createTask);

app.delete('/tasks/:id', authenticateUser, deleteTask);

app.listen(port, () => {
	console.log(`Example app listening at ${API_PREFIX}`);
});
