import React, { useState, useEffect } from 'react';
import './CreateExercise.css';
import { useNavigate, useParams } from 'react-router-dom';

export const EditExercise = () => {
  const [exercise, setexercise] = useState({
    title: '',
    details: '',
  });

  const navigate = useNavigate();
  const params = useParams();
  const exerciseId = params.id;

  const handleChange = e => {
    setexercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchedExercise = JSON.parse(
      localStorage.getItem(`EXERCISE-PLANNER-${exerciseId}`)
    );
    setexercise(fetchedExercise);
  }, [exerciseId]);

  const handleExerciseEdition = e => {
    e.preventDefault();
    localStorage.setItem(
      `EXERCISE-PLANNER-${exerciseId}`,
      JSON.stringify(exercise)
    );
    navigate('/home');
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
