import { Link } from "react-router-dom"; 
import "./nav-style.css";
import iconLogo from './icon-logo.png'
import { useHistory } from 'react-router-dom';

function Nav() {
  const history = useHistory();

  return (
    
    <nav className="navbar navbar-expand-sm ">
      <img className="icon-logo" src={iconLogo}></img>
    <Link className="nav-title navbar-brand" to="/companies"><h2 className="nav-title">Parsity-CRM </h2></Link> 
   
    <ul className="navbar-nav">
        <li className="nav-item">
          <button className="dashboard-button" onClick={() => history.push('/dashboard')}>Dashboard</button>
        </li>
          <li className="login-signup nav-item">Login</li>
          <li className="login-signup nav-item">Sign Up</li>
    </ul>
</nav>

  );
};

export default Nav;
