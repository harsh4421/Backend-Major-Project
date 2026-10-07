import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Register = ({ setToken }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        name,
        email,
        password
      });
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };
  return (
    <div className="auth-container">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.5rem' }}>Create Account</h2>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', backgroundColor: '#fef2f2', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Create Account
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#000', fontWeight: '500', textDecoration: 'underline' }}>Sign in</Link>
      </p>
    </div>
  );
};
export default Register;
