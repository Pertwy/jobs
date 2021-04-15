import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"

export default function Navbar() {

     return (
      
     
      <div className= "container-fullwidth">
        <nav class="navbar navbar-dark bg-dark navbar-expand-sm">

          <Link to="/" className="navbar-brand">Job Board</Link>
     
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbar-list-2">
              <ul className="navbar-nav ml-auto">
                    
                    <li className="navbar-item">
                    <Link to="/signin" className="nav-link">Sign In</Link>
                    </li>

                    <li className="navbar-item">
                    <Link to="/createaccount" className="nav-link">Sign Up</Link>
                    </li>

                    <li className="navbar-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                    </li>

                    <li className="navbar-item">
                    <Link to="/recruiterProfile" className="nav-link">Recruiters</Link>
                    </li>

                    {/* <li className="navbar-item">
                    <Link to="/testForm" className="nav-link">Test Form</Link>
                    </li> */}

                  </ul>
              </div>

          </nav>
      </div>
    );

}