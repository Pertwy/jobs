import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function BasicInfo(props){

  const [expandBasicInfo, setExpandBasicInfo] = useState(true)
  const [givenName, setGivenName] = useState("")
  const [surname, setSurname] = useState("")
  const [headline, setHeadline] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


//Basic Info ///////////////////////////////////////////////
function handleExpandBasicInfo(){
  setExpandBasicInfo(!expandBasicInfo)
}

function handleSaveBasicInfo(){
  if(givenName){
    props.setUserData({...props.props, givenName:givenName})
  }
  if(surname){
    props.setUserData({...props.props, surname:surname})
  }
  if(location){
    props.setUserData({...props.props, location:location})
  }
  if(email){
    props.setUserData({...props.props, email:email})
  }
  if(phoneNumber){
    props.setUserData({...props.props, phoneNumber:phoneNumber})
  }

  setExpandBasicInfo(!expandBasicInfo)
}

function handleCancelBasicInfo(){
  setGivenName("")
  setSurname("")
  setHeadline("")
  setEmail("")
  setPhoneNumber("")
  setExpandBasicInfo(!expandBasicInfo)
}

let BasicInfo 
if(expandBasicInfo){
  BasicInfo =
    <>
      {props.props.givenName && <p>Given Name: {capitalizeFirstLetter(props.props.givenName)}</p>}
      {props.props.surname && <p>Surname: {capitalizeFirstLetter(props.props.surname)}</p>}
      {props.props.headline && <p>Headline: {props.props.headline}</p>}
      {props.props.location && <p>Location: {props.props.location}</p>}
      {props.props.email && <p>Email: {props.props.email}</p>}
      {props.props.phoneNumber && <p>Phone Number: {props.props.phoneNumber}</p>}
    </>
  } else{
    BasicInfo = <>
          <TextField fullWidth  onChange={({ target }) =>     
                setGivenName(target.value)} id="standard-basic" label="Given Name" placeholder={props.props.givenName}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setSurname(target.value)} id="standard-basic" label="Surname" placeholder={props.props.surname}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setHeadline(target.value)} id="standard-basic" label="Headline" placeholder={props.props.headline}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setLocation(target.value)} id="standard-basic" label="Location" placeholder={props.props.location}/>  

          <TextField fullWidth  onChange={({ target }) =>     
                setEmail(target.value)} id="standard-basic" label="Email" placeholder={props.props.email}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setPhoneNumber(target.value)} id="standard-basic" label="Phone Number" placeholder={props.props.phoneNumber}/>

          <Button onClick={()=>handleSaveBasicInfo()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelBasicInfo()} variant="outlined">
            Cancel
          </Button>

    </>    }



  return (
    <div>
        <section className={"basic-info" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Basic Info</h4>
                <button onClick={() => handleExpandBasicInfo()}>Edit</button>
              </div>
              {BasicInfo}
            </section>
    </div>
  )
}
