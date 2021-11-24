import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className='main-nav'>
			<NavLink to='/' activeClassName='active-style'>
				Home
			</NavLink>
			<NavLink to='/create-exercise' activeClassName='active-style'>
				Create Exercise
			</NavLink>
		</nav>
	);
};
