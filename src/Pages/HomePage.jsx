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
		var exercisesInStorage = [],
			keys = Object.keys(localStorage),
			i = keys.length;

		while (i--) {
			if (localStorage.key(i).startsWith('EXERCISE-PLANNER')) {
				let localStorageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
				exercisesInStorage.push(localStorageItem);
			}
		}
		setexercises(exercisesInStorage);
	}, []);

	const deleteExerciseHandler = id => {
		const key = `EXERCISE-PLANNER-${id}`;
		localStorage.removeItem(key);
		window.location.reload();
	};

	const toggleExerciseHandler = id => {
		const key = `EXERCISE-PLANNER-${id}`;
		let copyExercise = JSON.parse(localStorage.getItem(key));
		copyExercise.complete = !copyExercise.complete;
		localStorage.setItem(key, JSON.stringify(copyExercise));
		window.location.reload();
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
