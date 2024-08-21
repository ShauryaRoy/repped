import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../createClient.js';

const Login = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signIn({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      console.log(data);
      setToken(data);
      navigate('/homepage');

    } catch (error) {
      alert(error);
    }
  }

  async function handleGoogleLogin() {
    try {
      const { data, error } = await supabase.auth.signIn({
        provider: 'google',
      });

      if (error) throw error;
      setToken(data);
      navigate('/homepage');

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />

        <input
          placeholder='Password'
          name='password'
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>
      </form>

      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>

      <button onClick={() => navigate('/forgot-password')}>
        Forgot Password?
      </button>

      Don't have an account? <Link to='/signup'>Sign Up</Link>
    </div>
  );
}

export default Login;
