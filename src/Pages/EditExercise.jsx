import React, { useState, useEffect } from 'react';
import './CreateExercise.css';
import { useHistory, useParams } from 'react-router-dom';

export const EditExercise = () => {
	const [exercise, setexercise] = useState({
		title: '',
		details: '',
	});

	const history = useHistory();
	const params = useParams();
	const exerciseId = params.id;

	const handleChange = e => {
		setexercise({
			...exercise,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		fetch(`http://localhost:3111/exercises/${exerciseId}`)
			.then(response => response.json())
			.then(data =>
				setexercise({
					title: data.title,
					details: data.details,
				})
			)
			.catch(error => console.log(error));
	}, [exerciseId]);

	const handleExerciseEdition = e => {
		e.preventDefault();
		fetch(`http://localhost:3111/exercises/${exerciseId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(exercise),
		})
			.then(() => history.push('/home'))
			.catch(error => console.log(error));
	};

	return (
		<div>
			<form onSubmit={handleExerciseEdition}>
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

				<button>Done</button>
			</form>
		</div>
	);
};
