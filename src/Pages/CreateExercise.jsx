import React, { useState } from 'react';
import './CreateExercise.css';
import { useHistory } from 'react-router-dom';

export const CreateExercise = () => {
	const [exercise, setexercise] = useState({
		title: '',
		details: '',
	});

	const history = useHistory();

	const handleChange = e => {
		setexercise({
			...exercise,
			[e.target.name]: e.target.value,
		});
	};

	const handleExerciseCreation = e => {
		e.preventDefault();
		const newExercise = {
			title: exercise.title,
			details: exercise.details,
			complete: false,
			id: Math.floor(Math.random() * 10000),
		};
		localStorage.setItem(`EXERCISE-PLANNER-${newExercise.id}`, JSON.stringify(newExercise));
		history.push('/');
	};

	return (
		<div>
			<form onSubmit={handleExerciseCreation}>
				<label>Title</label>
				<input
					name='title'
					maxLength='15'
					type='text'
					onChange={handleChange}
					value={exercise.title}
					required
				/>

				<label>Details</label>
				<textarea
					name='details'
					cols='30'
					rows='10'
					value={exercise.details}
					onChange={handleChange}
					required></textarea>

				<button>Add Exercise</button>
			</form>
		</div>
	);
};
