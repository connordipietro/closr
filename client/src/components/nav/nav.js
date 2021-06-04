import { Link } from "react-router-dom"; 
import "./nav-style.css";
import iconLogo from './icon-logo.png'
import { useHistory } from 'react-router-dom';

function Nav() {
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-sm ">
      <img className="icon-logo" src={iconLogo}></img>
    <Link className="nav-title navbar-brand" to="/companies"><img className="icon-logo" src="closr-logo 3.png"></img></Link> 
    <ul className="navbar-nav">
      <li className="login-signup nav-item">Login</li>
      <li className="login-signup nav-item">Sign Up</li>
    </ul>
</nav>

  );
};

export default Nav;
