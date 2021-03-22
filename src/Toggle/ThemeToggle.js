import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import './themeToggle.css';

const ThemeToggle = () => {
    const {toggleTheme} = useContext(ThemeContext);
    return (
        <div>
            <button className="addUser" onClick={toggleTheme}>Dark/Light</button>
            
        </div>
    )
}

export default ThemeToggle
