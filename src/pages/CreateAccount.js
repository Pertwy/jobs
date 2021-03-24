import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function CreateAccount(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("")
  const [pronoun, setPronoun] = useState("")
  const [password, setPassword] = useState("")
  

  function newUserInDB(){
    let newUser = {
      "email":email, "givenName":givenName, "surname":surname, "password":password
    }
    console.log(newUser)

    try{
      axios.post('http://localhost:5000/users/add', newUser)
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
      
      <div className="d-flex container justify-content-center">  
        <form className={classes.root, "col-sm-6"} noValidate autoComplete="off" onSubmit={handleSignUp}>
            <h3 className={classes.input}>Create an account</h3>  
            
            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setGivenName(target.value)} id="standard-basic" label="Given Name" />

            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setSurname(target.value)} id="standard-basic" label="Surname" />

            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setEmail(target.value)} id="standard-basic" label="Email" />

            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setPassword(target.value)} id="standard-basic" label="Password" />

            <Button type="submit" variant="outlined">
              Sign Up
            </Button>
        </form>

      </div>
    </div>
  )
}
