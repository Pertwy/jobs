import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function Education(props){

    const [ expandEducation, setExpandEducation] = useState(false)
    const [ educationCountry, setEducationCountry] = useState("");
    const [ educationLevelOfEducation, setEducationLevelOfEducation] = useState("");
    const [ educationFieldOfStudy, setEducationFieldOfStudy] = useState("");
    const [ educationStartDate, setEducationStartDate] = useState("");
    const [ educationEndDate, setEducationEndDate] =useState("");
    const [ educationCollegeOrUniversity, setEducationCollegeOrUniversity] =useState("");
  
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    
//Education ///////////////////////////////////////////////
function handleExpandEducation(){
    setExpandEducation(!expandEducation)
  }
  
  function handleSaveEducation(){
    
    let additionalEducation = {
      country:educationCountry,
      levelOfEducation:educationLevelOfEducation,
      fieldOfStudy:educationFieldOfStudy,
      startDate:educationStartDate,
      endDate: educationEndDate,
      collegeOrUniversity:educationCollegeOrUniversity
    }
    
    let newEducation = props.props.education
    newEducation.push(additionalEducation)

    let info = {"email":"test@email.cm", "education":additionalEducation}

    try {
      axios.post(`/api/users/addeducation`, info)
        .then(response => (console.log(response.data)))
        // .then(response => setUserData(response.data))
    } catch (error) {
      console.log(error)
    }
  
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
  if(props.props.education.length > 0){
    Education =<><EducationMap/></>
    } else {Education=<></>}
    
  let EducationInput
    if(expandEducation){
      EducationInput =
        <>
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationCountry(target.value)} label="Country" />
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationLevelOfEducation(target.value)} label="Level Of Education"/>
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationFieldOfStudy(target.value)} label="Field Of Study" />
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationStartDate(target.value)} label="Start Date"/>
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationEndDate(target.value)} label="End Date"/>  
  
          <TextField fullWidth  onChange={({ target }) =>     
                setEducationCollegeOrUniversity(target.value)} label="College/University"/>     


          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                variant="inline"
                openTo="year"
                views={["year", "month"]}
                label="Year and Month"
                helperText="Start Month"
                value={startDate}
                onChange={setStartDate}
              /> 
              <DatePicker
                variant="inline"
                openTo="year"
                views={["year", "month"]}
                label="Year and Month"
                helperText="End Month"
                value={endDate}
                onChange={setEndDate}
              /> 
            </MuiPickersUtilsProvider>    
  
          
  
          <Button onClick={()=>handleSaveEducation()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelEducation()} variant="outlined">
            Cancel
          </Button>
        </>
    } else {EducationInput =<></>}
  


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
              {EducationInput}
              {Education}
        </section>
    </div>
  )
}
