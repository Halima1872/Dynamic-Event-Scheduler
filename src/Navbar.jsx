import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import Storage from './Storage';

const Navbar = () => {
    const navigateTo = useNavigate();
    const handleLogout = () => {
        Storage.setItem('isLoggedIn', false);
        Storage.setItem('CurrentUser', '');
        navigateTo('/Login');
    }
    return (
      <nav className="navbar">
        
          <button onClick={handleLogout} className="logout-button" >
            Logout
          </button>
         
      </nav>
    );
  };
export default Navbar;