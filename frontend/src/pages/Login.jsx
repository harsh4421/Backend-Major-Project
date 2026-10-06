import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        email,
        password
      });
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container glass-panel animate-fade-in">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h2>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
