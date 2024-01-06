import { useState } from 'react';
import './Signup.scss';
import { Link } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post('/auth/signup', {
        name,
        email,
        password,
      });

      console.log('Signup result:', result);
    } catch (error) {
      console.log('Signup error:', error);
    }
  }

  return (
    <>
      <div className="signup">
        <div className="signup-box">
          <h2 className="signup-heading">Signup</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter name </label>
            <input
              type="text"
              id="name"
              className="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Enter email </label>
            <input
              type="email"
              id="email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              id="password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Submit" className="submit" />
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
