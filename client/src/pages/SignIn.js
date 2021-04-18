import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SignIn(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("")
  const [pronoun, setPronoun] = useState("")
  const [password, setPassword] = useState("")
  const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://jobbored-jps.herokuapp.com"
    : "http://localhost:5000";  
console.log(BASE_URL);

  function newUserInDB(){
    let newUser = {
      "email":email, "givenName":givenName, "surname":surname, "password":password
    }
    console.log(newUser)

    try{
      axios.post(`/api/users/add`, newUser)
        .then(res => console.log(res.data));
      }catch(e){
        console.error(e)
      }
  }

  function handleLogin(){

    let user = {"email":email, "password":password}

    try{
      axios.post(`/api/auth/`, user, {withCredentials: true, credentials: 'include'})
        .then(res => console.log(res.data));
      }catch(e){
        console.error(e)
      }
  }



  function handleSignUp(e) {
    e.preventDefault();
    newUserInDB()      
  } 

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    input:{
      display:"block"
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <div className="d-flex container justify-content-center shadow-lg p-4 mb-4 bg-white">  
        <form  className="col-sm-8" noValidate autoComplete="off" onSubmit={handleSignUp}>
            <h3 className={classes.input}>Sign In</h3>  

            <TextField  fullWidth className={classes.input} onChange={({ target }) =>     
                  setEmail(target.value)} id="standard-basic" label="Email" />

            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setPassword(target.value)} id="standard-basic" label="Password" />

            <Button onClick={() => handleLogin()} variant="outlined">
              Log in
            </Button>
        </form>
      </div>
    </div>
  )
}
