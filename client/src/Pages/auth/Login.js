import React, { useState } from 'react'
import '../../Styles/Login.css';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';




function Login() {
    // const auth = getAuth(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    // const navigate = useNavigate();
    // const [isPasswordShown, setIsPasswordShown] = useState(false);
  
  
  
  return (
    <div className='authContainer'>
    <div className="card">
    {/* <p>{error}</p> */}

    <form onSubmit={Login} className='form'>
    <h1>Login</h1>

      <label htmlFor="email">Email
      <input
        type='email'
        placeholder='Enter email...'
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      </label>

      <label htmlFor="password">Password
      <input
        name ='password'
        // type={isPasswordShown ? 'text' : 'password'}
        placeholder='Enter password...'
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        
      />
       {/* <p className='visibility' onClick={() => setIsPasswordShown(!isPasswordShown)}>
        {isPasswordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </p> */}
      </label>

      <button className="bg-mint text-skyblue font-lighter py-2 px-4 w-40 h-19 my-10 rounded-2xl hover:bg-mint hover:text-white translate-x-left-65%">Log In</button>
      </form>
    <p className='log'>Don't have an account? <Link  className='link' to="/signup">Sign Up</Link></p>
    </div>
    </div>
  )
}

export default Login