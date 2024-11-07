'use client'
import Cookies from "js-cookie";
import React, { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { auth, provider, signInWithPopup } from '../config';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

function Page() {
  const [reg, setReg] = useState(false);
  const [log, setLog] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize the router

  const handleRegister = () => {
    setReg(!reg);
    setLog(false);
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      setMessage('Registration successful!');
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Error: Registration failed');
      }
      console.error(error);
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setReg(false);
  };

  const handleLogin = () => {
    setLog(!log);
    setReg(false);
  };

  const handleSubmitLog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      Cookies.set("loggedin", "true");
      setMessage('Login successful!');
      console.log(response.data);
      router.push('/'); // Redirect to homepage using useRouter
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Error: Login failed');
      }
      console.error(error);
    }

    setEmail('');
    setPassword('');
    setLog(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const email = user.email;

      localStorage.setItem('accessToken', token);

      const checkUserResponse = await axios.post('http://localhost:5000/api/auth/check-user', { email });

      if (checkUserResponse.data.exists) {
        setMessage('Google sign-in successful!');
      } else {
        const username = user.displayName || 'Google User';
        const password = user.uid;

        await axios.post('http://localhost:5000/api/auth/register', {
          username,
          email,
          password,
        });

        setMessage('Google sign-in and registration successful!');
      }

      console.log(user);
      Cookies.set("loggedin", "true");
      router.push('/'); // Redirect to homepage using useRouter
    } catch (error) {
      setMessage('Error: Google sign-in failed');
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.msg}>{message}</div>
      <div>
        <button onClick={handleRegister} className={styles.reg_btn}>Register</button>
      </div>
      <div>
        {reg && (
          <form onSubmit={handleSubmitReg} className={styles.reg_form}>
            <div>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>

      <div></div>
      <div>
        <button onClick={handleLogin} className={styles.reg_btn}>Login</button>
      </div>
      <div>
        {log && (
          <form onSubmit={handleSubmitLog} className={styles.reg_form}>
            <div>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter email'
              />
            </div>
            <div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='enter password'
              />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
      <div>
        <button onClick={handleGoogleSignIn} className={styles.google}>
          <span>Sign in with Google</span>
          <img src="/google.svg" alt="Google Logo" />
        </button>
      </div>
    </div>
  );
}

export default Page;
