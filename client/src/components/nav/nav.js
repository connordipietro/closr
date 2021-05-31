import { Link } from "react-router-dom"; 
import "./nav-style.css";
import iconLogo from './icon-logo.png'

function Nav() {
  return (
    
    <nav className="navbar navbar-expand-sm ">
      <img className="icon-logo" src={iconLogo}></img>
    <Link className="nav-title navbar-brand" to="/companies"><h3 className="nav-title">Parsity-CRM </h3></Link> 
   
    <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" href="#">
              <button className="dashboard-button">Dashboard</button>
            </a>
        </li>
          <li className="login-signup nav-item"><h4 >Login</h4></li>
          <li className="login-signup nav-item"><h4 >Sign Up</h4></li>
    </ul>
</nav>

  );
};

export default Nav;
