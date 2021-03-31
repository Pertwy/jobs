import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Education(props){

    const [ expandEducation, setExpandEducation] = useState(false)
    const [ educationCountry, setEducationCountry] = useState("");
    const [ educationLevelOfEducation, setEducationLevelOfEducation] = useState("");
    const [ educationFieldOfStudy, setEducationFieldOfStudy] = useState("");
    const [ educationStartDate, setEducationStartDate] = useState("");
    const [ educationEndDate, setEducationEndDate] =useState("");
    const [ educationCollegeOrUniversity, setEducationCollegeOrUniversity] =useState("");
  
    
    
//Education ///////////////////////////////////////////////
function handleExpandEducation(){
    setExpandEducation(!expandEducation)
  }
  
  function handleSaveEducation(){
    let newEducation = props.props.education
  
    newEducation.push({
      country:educationCountry,
      levelOfEducation:educationLevelOfEducation,
      fieldOfStudy:educationFieldOfStudy,
      startDate:educationStartDate,
      endDate: educationEndDate,
      collegeOrUniversity:educationCollegeOrUniversity
    })
  
    props.setUserData({...props.props, education: newEducation})
    setExpandEducation(false)
  }
  
  function handleDeleteEducation(prop){
    const education = props.props.education.filter(education => education.levelOfEducation !== prop);
    props.setUserData({...props.props, education:education})
    setExpandEducation(false)
  }
  
  
  function handleCancelEducation(){
    setEducationCountry();
    setEducationLevelOfEducation();
    setEducationFieldOfStudy();
    setEducationStartDate();
    setEducationEndDate();
    setEducationCollegeOrUniversity();
    setExpandEducation(!expandEducation)
  }
  
  
  
  let Education
  if(props.props.education.length > 0 && !expandEducation){
    Education =
      <>
        <EducationMap></EducationMap>
      </>
    } else if(props.props.education.length > 0 && expandEducation){
      Education =
      <>
        <EducationMap></EducationMap>
        <>
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationCountry(target.value)} id="standard-basic" label="Country" />
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationLevelOfEducation(target.value)} id="standard-basic" label="Level Of Education"/>
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationFieldOfStudy(target.value)} id="standard-basic" label="Field Of Study" />
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationStartDate(target.value)} id="standard-basic" label="Start Date"/>
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationEndDate(target.value)} id="standard-basic" label="End Date"/>  
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationCollegeOrUniversity(target.value)} id="standard-basic" label="College/University"/>         
  
          
  
          <Button onClick={()=>handleSaveEducation()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelEducation()} variant="outlined">
            Cancel
          </Button>
        </>
      </>
    } else if(props.props.education.length == 0 && expandEducation){
      Education =
        <>
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationCountry(target.value)} id="standard-basic" label="Country" />
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationLevelOfEducation(target.value)} id="standard-basic" label="Level Of Education"/>
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationFieldOfStudy(target.value)} id="standard-basic" label="Field Of Study" />
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationStartDate(target.value)} id="standard-basic" label="Start Date"/>
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationEndDate(target.value)} id="standard-basic" label="End Date"/>  
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationCollegeOrUniversity(target.value)} id="standard-basic" label="College/University"/>     
  
          <Button onClick={()=>handleSaveEducation()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelEducation()} variant="outlined">
            Cancel
          </Button>
     </>
   
    } else{
      Education = <></>
    }
  
  
      function EducationMap(){
        return props.props.education.map(Education => {
          return (
            <div className={"pl-3 pr-3"}>
              <div className={"row space-between"}>
                <h4>{Education.country}</h4>
                <div className="row">
                    <button  onClick={()=>handleDeleteEducation(Education.levelOfEducation)}>Delete</button>
                    <button onClick={()=>handleDeleteEducation(Education.levelOfEducation)}>Edit</button>
                </div>
              </div>
              <p>Level Of Education: {Education.levelOfEducation}</p>
              <p>Field Of Study: {Education.fieldOfStudy}</p>
              <p>Start Date: {Education.startDate}</p>
              <p>End Date: {Education.endDate}</p>
              <p>College/University: {Education.collegeOrUniversity}</p>
        
            </div>
          )
        })
      }
    


  return (
    <div>
        <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Eduction</h4>
                <button onClick={() => handleExpandEducation()}>Add</button>
              </div>
              {Education}
        </section>
    </div>
  )
}
