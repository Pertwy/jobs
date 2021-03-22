import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import { makeStyles } from '@material-ui/core/styles';

export default function Navbar() {

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const classes = useStyles();

    return (
      <div className= "container-fullwidth">
      <nav className= "space-between navrow navbar navbar-dark bg-dark navbar-expand-lg">

        
        <div className="collpase navbar-collapse">
          <Link to="/" className="navbar-brand">Job Board</Link>
          <ul className="navbar-nav mr-auto">
            
            <li className="navbar-item">
            <Link to="/signup" className="nav-link">Add a user</Link>
            </li>

            <li className="navbar-item">
            <Link to="/profile" className="nav-link">Profile</Link>
            </li>

            <li className="navbar-item">
            <Link to="/recruiterProfile" className="nav-link">Recruiter</Link>
            </li>

          </ul>
        </div>
   
      </nav>
      </div>
    );

}