import React, { useState } from 'react';
import '../../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../utils/dataHandler';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Ensure email is always in lowercase
        const lowercasedEmail = email.toLowerCase();

        try {
            const res = await postData('/users/login', { email: lowercasedEmail, password });
            if (res.status === 200) {
                setSuccess('Login successful! Redirecting...');
                setError('');
                console.log('Response: ', res)

                localStorage.setItem('access_token', res.token);

                setTimeout(() => navigate('/book'), 1500);
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setSuccess('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="authContainer">
            <div className="leftSide">
                <div className="card">
                    {error && <p className="errorMessage">{error}</p>}
                    {success && <p className="successMessage">{success}</p>}

                    <form onSubmit={handleLogin} className="form">
                        <h1>Login</h1>

                        <div className="inputGroup">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email..."
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Enter password..."
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="togglePasswordBtn"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={`loginBtn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <p className="log">
                        Don't have an account? <Link className="link" to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>

            <div className="rightSide">
                <div className="circles"></div>
            </div>
        </div>
    );
}

export default Login;
