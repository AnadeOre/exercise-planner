import React, { useState, useEffect } from 'react';
import ExercisesList from '../Components/ExercisesList';
import BaseFilter from '../Components/BaseFilter';

const HomePage = () => {
	const [exercises, setexercises] = useState([]);
	const [currentFilter, setcurrentFilter] = useState('all');

	const updateFilterHandler = newFilter => {
		setcurrentFilter(newFilter);
	};

	useEffect(() => {
		async function fetchExercises() {
			try {
				const response = await fetch('http://localhost:3111/exercises');
				const fetchedExercises = await response.json();
				console.log('Exercises fetched ', fetchedExercises);
				setexercises(fetchedExercises);
			} catch (error) {
				console.log(error);
			}
		}
		fetchExercises();
	}, []);

	const deleteExerciseHandler = id => {
		const patchedExercises = exercises.filter(exercise => exercise.id !== id);
		setexercises(patchedExercises);
	};

	const toggleExerciseHandler = id => {
		const clonedExercises = [...exercises];
		const clickedExerciseIndex = clonedExercises.findIndex(exercise => exercise.id === id);
		const clickedExercise = clonedExercises[clickedExerciseIndex];

		clickedExercise.complete = !clickedExercise.complete;

		setexercises(clonedExercises);
	};

	let jsx = (
		<ExercisesList
			exercises={exercises}
			onDeleteExercise={deleteExerciseHandler}
			onToggleExercise={toggleExerciseHandler}
		/>
	);
	if (currentFilter === 'completed') {
		jsx = (
			<ExercisesList
				exercises={exercises.filter(exercise => exercise.complete)}
				onDeleteExercise={deleteExerciseHandler}
				onToggleExercise={toggleExerciseHandler}
			/>
		);
	} else if (currentFilter === 'pending') {
		jsx = (
			<ExercisesList
				exercises={exercises.filter(exercise => !exercise.complete)}
				onDeleteExercise={deleteExerciseHandler}
				onToggleExercise={toggleExerciseHandler}
			/>
		);
	}
	return (
		<div>
			<BaseFilter onUpdate={updateFilterHandler} current={currentFilter} />
			{jsx}
		</div>
	);
};

export default HomePage;
