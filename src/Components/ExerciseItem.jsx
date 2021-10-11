import React from 'react';
import { Link } from 'react-router-dom';
import './ExerciseItem.css';

export const ExerciseItem = props => {
	const performExerciseDeletion = () => {
		console.log(props.exercise.id);
		props.onDeleteExercise(props.exercise.id);
	};

	const performExerciseToggle = () => {
		props.onToggleExercise(props.exercise.id);
	};

	const classes = ['exercise'];
	if (props.exercise.complete) {
		classes.push('complete');
	}
	return (
		<div className={classes.join(' ')}>
			<div className='actions'>
				<h4>{props.exercise.title}</h4>
				<div className='buttons'>
					<button onClick={performExerciseDeletion}>Delete</button>
					<Link to={`/exercises/${props.exercise.id}/edit`}>Edit</Link>
					<button onClick={performExerciseToggle}>Toggle</button>
				</div>
			</div>
			<div className='details'>
				<p>{props.exercise.details}</p>
			</div>
		</div>
	);
};
