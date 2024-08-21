import React, { useState } from 'react';
import { supabase } from '../createClient.js';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');

  async function handleResetPassword(e) {
    e.preventDefault();

    try {
      const { data: user, error: userError } = await supabase.auth.api.getUser(email);

      if (userError || !user) {
        alert('Sorry, seems like you are not registered with us');
        return;
      }
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);

      if (error) throw error;

      alert('Check your email for a password reset link.');
      navigate('/');

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit'>
          Reset Password
        </button>
      </form>

      <button onClick={() => navigate('/')}>
        Back to Login
      </button>
    </div>
  );
}

export default ForgotPassword;
