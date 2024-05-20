import React, { useState, useEffect } from "react";
import './RegisterForm.css'; // Create and style this CSS file as needed
import { FaUser, FaLock, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate} from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        roleId: ''
    });

    const [roles, setRoles] = useState([]); // State to store role data

    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Fetch roles from the server when the component mounts
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:5000/roles');
                if (response.ok) {
                    const rolesData = await response.json();
                    setRoles(rolesData);
                } else {
                    console.error('Failed to fetch roles');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRoles();
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');
        try {
            const response = await fetch('http://localhost:5000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Form submitted successfully');
                navigate('/'); // Redirect to login page
                // Optionally, redirect or show a success message
            } else {
                console.error('Failed to submit form');
                // Handle failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors, e.g., show an error message
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <FaLock className="icon" />
                    <FaInfoCircle className="info-icon" title="Password must be at least 8 characters long" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Dropdown menu for selecting roles */}
                <div className="input-box">
                    <select
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role.role_id} value={role.role_id}>
                                {role.role_name}
                            </option>
                        ))}
                    </select>
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
