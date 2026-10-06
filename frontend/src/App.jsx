import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUser();
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
      } else {
        setToken(null);
      }
    } catch (err) {
      console.error(err);
      setToken(null);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <div className="page-wrapper container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails user={user} token={token} />} />
          <Route path="/login" element={!user ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register setToken={setToken} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
