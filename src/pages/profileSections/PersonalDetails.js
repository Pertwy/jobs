import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function PersonalDetails(props){

  const [expandPersonalDetails, setExpandPersonalDetails] = useState(true)
  const [highestLevelOfDegree, setHighestLevelOfDegree] = useState("")
  const [elegibleUK, setElegibleUK] = useState("")

//Personal Details ///////////////////////////////////////////////
function handleExpandPersonalDetails(){
  setExpandPersonalDetails(!expandPersonalDetails)
}

function handleSavePersonalDetails(){
  if(elegibleUK){
    props.setUserData({...props.props, elegibleUK:elegibleUK})
  }
  if(highestLevelOfDegree){
    props.setUserData({...props.props, highestLevelOfDegree:highestLevelOfDegree})
  }
  setExpandPersonalDetails(!expandPersonalDetails)
}

function handleCancelPersonalDetails(){
  setElegibleUK("")
  setHighestLevelOfDegree("")
  setExpandPersonalDetails(!expandPersonalDetails)
}

let PersonalDetails 
if(expandPersonalDetails){
  PersonalDetails =
    <>
      {props.props.elegibleUK && <p>Eligible to Work in the UK: {props.props.elegibleUK}</p>}
      {props.props.highestLevelOfDegree && <p>Highest level of education: {props.props.highestLevelOfDegree}</p>}
      {props.props.industry.length > 0  && <p>Industry</p>}
    </>
  } else{
    PersonalDetails = <>
          <TextField fullWidth  onChange={({ target }) =>     
                setElegibleUK(target.value)} id="standard-basic" label="Eligible to work in the UK" placeholder={props.props.elegibleUK}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setHighestLevelOfDegree(target.value)} id="standard-basic" label="Highest Level of Degree" placeholder={props.props.highestLevelOfDegree}/>

          <Button onClick={()=>handleSavePersonalDetails()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelPersonalDetails()} variant="outlined">
            Cancel
          </Button>

    </>    }


  return (
    <div>
        <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Personal Details</h4>
                <button onClick={() => handleExpandPersonalDetails()}>Edit</button>
              </div>
              {PersonalDetails}
            </section>
    </div>
  )
}
