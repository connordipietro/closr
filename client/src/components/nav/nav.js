import { Link } from "react-router-dom"; 
import "./nav-style.css";
import iconLogo from './icon-logo.png'

function Nav() {
  return (
    
    <nav class="navbar navbar-expand-sm ">
      <img className="icon-logo" src={iconLogo}></img>
    <Link className="nav-title navbar-brand" to="/companies"><h2 className="nav-title">Parsity-CRM </h2></Link> 
   
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#">
              <button className="dashboard-button">Dashboard</button>
            </a>
        </li>
          <li className="login-signup nav-item">Login</li>
          <li className="login-signup nav-item">Sign Up</li>
    </ul>
</nav>

  );
};

export default Nav;
