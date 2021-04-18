import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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


const eligibles = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  }]


const educations = [
  {
    value: 'none',
    label: 'none',
  },
  {
    value: 'GCSE',
    label: 'GCSE  or equivalent',
  },
  {
    value: 'A-Level',
    label: 'A-Level or equivalen',
  },
  {
    value: 'certificate',
    label: 'Certificate of higher education',
  },
  {
    value: 'Diploma',
    label: 'Diploma of higher education',
  },
  {
    value: 'bachelors',
    label: "Bachelor's",
  },
  {
    value: 'masters',
    label: "Master's",
  },
  {
    value: 'phd',
    label: "PhD",
  },
];


  const handleChangeEducation = (event) => {
    setHighestLevelOfDegree(event.target.value);
  };

  const handleChangeEligible = (event) => {
    setElegibleUK(event.target.value);
  };


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
          {/* <TextField fullWidth  onChange={({ target }) =>     
                setElegibleUK(target.value)} id="standard-basic" label="Eligible to work in the UK" placeholder={props.props.elegibleUK}/> */}

          <TextField
            id="standard-select-eligible"
            select
            value={props.props.elegibleUK}
            onChange={handleChangeEligible}
            helperText="Eligible to work in the UK"
          >
            {eligibles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>



          <TextField
            id="standard-select-education"
            select
            value={props.props.highestLevelOfDegree}
            onChange={handleChangeEducation}
            helperText="Highest level of Education"
          >
            {educations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>


          {/* <TextField fullWidth  onChange={({ target }) =>     
                setHighestLevelOfDegree(target.value)} id="standard-basic" label="Highest Level of Degree" placeholder={props.props.highestLevelOfDegree}/>
 */}

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
