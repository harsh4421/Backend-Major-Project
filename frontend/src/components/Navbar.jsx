import { Link } from 'react-router-dom';
import { ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';
const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">
          <ShoppingBag size={24} />
          TechStore
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <UserIcon size={18} />
                <span>{user.name}</span>
              </div>
              <button onClick={logout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
