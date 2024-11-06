import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/Signup.css';
import { postData } from '../../utils/dataHandler';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Ensure email is always in lowercase
        const lowercasedEmail = email.toLowerCase();

        try {
            const res = await postData('/users/register', { username, email: lowercasedEmail, password });

            if (res.status === 201 || res.status === 200) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <div className="authContainer">
            <div className="leftSide">
                <div className="card">
                    {error && <p className="errorMessage">{error}</p>}
                    {success && <p className="successMessage">{success}</p>}

                    <form onSubmit={handleSignup} className="form">
                        <h1>Sign Up</h1>

                        <div className="inputGroup">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username..."
                                value={username}
                                name="username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email..."
                                value={email}
                                name="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password..."
                                value={password}
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="signupBtn bg-mint text-skyblue font-lighter py-2 px-4 my-10 rounded-2xl hover:bg-mint hover:text-white"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="log">
                        Already have an account? <Link className="link" to="/login">Login</Link>
                    </p>
                </div>
            </div>

            <div className="rightSide">
                <div className="circles"></div>
            </div>
        </div>
    );
}

export default Signup;
