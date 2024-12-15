import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css'


const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" className={style.navLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={style.navLink}>
        Movies
      </NavLink>
    </nav>
  );
};


export default Navigation;
