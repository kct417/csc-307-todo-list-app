import PropTypes from 'prop-types';
import { useState } from 'react';

const TaskList = ({ handleSubmit }) => {
	const [task, setTask] = useState({
		taskname: '',
		description: '',
	});

	function handleChange(event) {
		const { name, value } = event.target;
		if (name === 'description')
			setTask({ taskname: task['taskname'], description: value });
		else
			setTask({
				taskname: value,
				description: task['description'],
			});
	}

	function submitTaskList() {
		handleSubmit(task);
		setTask({ taskname: '', description: '' });
	}

	return (
		<form>
			<label htmlFor="taskname">TaskName</label>
			<input
				type="text"
				name="taskname"
				id="taskname"
				value={task.taskname}
				onChange={handleChange}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={task.description}
				onChange={handleChange}
			/>
			<input type="button" value="Submit" onClick={submitTaskList} />
		</form>
	);
};

TaskList.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default TaskList;
