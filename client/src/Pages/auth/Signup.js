import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Signup.css'



function Signup() {

    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  return (
    <div className='authContainer-sign'>
    <div className="card">

    <form onSubmit={Signup} className='form'>

    <h1>Sign Up</h1>


      <label htmlFor="name" >Name
      <input type='text' placeholder='Enter name...' value={Name}name="name" required
        onChange={(e) => setName(e.target.value)} />
        </label>

      <label htmlFor="email">Email
      <input type='email' placeholder='Enter email...' value={email} name="email" required
        onChange={(e) => setEmail(e.target.value)} />
        </label>

         <label htmlFor="password">Phone
      <input type='number' placeholder='Enter phonenumber...' name="phonenumber" required
        onChange={(e) => setPassword(e.target.value)} />
        </label>



      <label htmlFor="password">Password

      <input type='password' placeholder='Enter password...' value={password} name="password" required
        onChange={(e) => setPassword(e.target.value)} />
        </label>

        
        <button className="bg-mint text-skyblue font-lighter py-2 px-4 w-40 h-19 my-10 rounded-2xl hover:bg-mint hover:text-white translate-x-left-65%">Sign Up</button>

     
    </form>
    <p className='log'>Already have an account? <Link className='link' to="/login">Login</Link></p>
  </div>

  </div>
    )
}

export default Signup