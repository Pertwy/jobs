import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import EditButton from '../../components/buttons/EditButton';


export default function PersonalDetails(props){

  const [expandPersonalDetails, setExpandPersonalDetails] = useState(false)
  const [highestLevelOfDegree, setHighestLevelOfDegree] = useState(props.props.highestLevelOfDegree)
  const [eligibleUK, setEligibleUK] = useState(props.props.eligibleUK)

//Personal Details ///////////////////////////////////////////////
function handleExpandPersonalDetails(){
  setExpandPersonalDetails(!expandPersonalDetails)
}


function handleSavePersonalDetails(){

  let info = {"email":"test@email.cm", "eligibleUK":props.props.eligibleUK, "highestLevelOfDegree":props.props.highestLevelOfDegree}

    try {
      axios.put(`/api/users/updatepersonaldetails`, info)
        .then(response => (console.log(response.data)))
    } catch (error) {
      console.log(error)
    }

  setExpandPersonalDetails(!expandPersonalDetails)
}


function handleCancelPersonalDetails(){
  setEligibleUK("")
  setHighestLevelOfDegree("")
  setExpandPersonalDetails(!expandPersonalDetails)
}


const eligibles = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
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
    props.setUserData({...props.props, highestLevelOfDegree:event.target.value})
  };

  const handleChangeEligible = (event) => {
    props.setUserData({...props.props, eligibleUK:event.target.value})
  };


let PersonalDetails 
if(!expandPersonalDetails){
  PersonalDetails =
    <>
    
      <p>Eligible to Work in the UK: {props.props.eligibleUK}</p>
      <p>Highest level of education: {props.props.highestLevelOfDegree}</p>
      {props.props.industry.length > 0  && <p>Industry</p>}
    </>
  } else{
    PersonalDetails = <>
          {/* <TextField fullWidth  onChange={({ target }) =>     
                setEligibleUK(target.value)} id="standard-basic" label="Eligible to work in the UK" placeholder={props.props.eligibleUK}/> */}

          <TextField
            select
            value={props.props.eligibleUK}
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
                <EditButton handleEdit={handleExpandPersonalDetails}/>
              </div>
              {PersonalDetails}
            </section>
    </div>
  )
}
