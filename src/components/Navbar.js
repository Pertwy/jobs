import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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

          <Paper component="form" className={classes.root}>
            
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
           </Paper>

          </ul>
        </div>
   
      </nav>
      </div>
    );

}