'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure the client is hydrated before rendering dynamic content
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
      return;
    }

    const { error: insertError } = await supabase.from('user').insert({
      email: email,
      password: password,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      setMessage(`Error: ${insertError.message}`);
    } else {
      setMessage('Sign-up successful!');
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Logged in successfully!');
    }
  };

  // Prevent rendering until hydration is complete
  if (!isHydrated) return null;

  return (
    <div className="auth-container">
      <h1>Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <p>{message}</p>
    </div>
  );
}
