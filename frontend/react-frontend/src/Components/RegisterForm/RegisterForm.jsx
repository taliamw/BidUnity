import React from "react";
import './RegisterForm.css'; // Create and style this CSS file as needed
import { FaUser, FaLock, } from "react-icons/fa";
import { Link } from 'react-router-dom';
const RegisterForm = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="Email" placeholder="Email" required/>
                    
                </div>
                <button type="submit">Register</button>
                <div className="login-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
