import React from 'react'
import "../styles/pages/Auth.scss"
import { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  console.log(email)
  console.log(name)
  console.log(password)
  return (
    <>
      <div className="container">
        <input type="text" placeholder='Enter your Name' required={true} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Enter your email" required={true} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your password" required={true} onChange={(e) => setPassword(e.target.value)} />
        <button>Sign Up</button>
      </div>
    </>
  )
}

export default Auth