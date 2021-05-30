/* import { Link } from "react-router-dom"; */
import "./nav-style.css";

function Nav() {
  return (
    <nav class="navbar navbar-expand-sm ">
    <h3 className="nav-title">Parsity-CRM </h3>
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#">
              <button className="dashboard-button">Dashboard</button>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
              Contacts
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
              Settings
            </a>
        </li>
    </ul>
</nav>


  );
};

export default Nav;
