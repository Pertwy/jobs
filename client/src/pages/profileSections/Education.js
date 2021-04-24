import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DeleteButton from '../../components/buttons/DeleteButton';
import EditButton from '../../components/buttons/EditButton';
import ExpandButton from '../../components/buttons/ExpandButton';


export default function Education(props){

    const [ expandEducation, setExpandEducation] = useState(false)
    const [ educationEdit, setEducationEdit] = useState(false)

    const [ educationCountry, setEducationCountry] = useState("");
    const [ educationLevelOfEducation, setEducationLevelOfEducation] = useState("");
    const [ educationFieldOfStudy, setEducationFieldOfStudy] = useState("");
    const [ educationStartDate, setEducationStartDate] = useState(new Date());
    const [ educationEndDate, setEducationEndDate] =useState(new Date());
    const [ educationCollegeOrUniversity, setEducationCollegeOrUniversity] =useState("");

    const [ educationEditCountry, setEducationEditCountry] = useState("");
    const [ educationEditLevelOfEducation, setEducationEditLevelOfEducation] = useState("");
    const [ educationEditFieldOfStudy, setEducationEditFieldOfStudy] = useState("");
    const [ educationEditStartDate, setEducationEditStartDate] = useState(new Date());
    const [ educationEditEndDate, setEducationEditEndDate] =useState(new Date());
    const [ educationEditCollegeOrUniversity, setEducationEditCollegeOrUniversity] =useState("");
    
////CREATE//////////////////////////////////////////////////////////////////////////////
function handleExpandEducation(){
    setExpandEducation(!expandEducation)
    setEducationEdit(false)
  }
  
function handleCancelEducation(){
  setEducationCountry("");
  setEducationLevelOfEducation("");
  setEducationFieldOfStudy("");
  setEducationStartDate(new Date());
  setEducationEndDate(new Date());
  setEducationCollegeOrUniversity("");
  setExpandEducation(!expandEducation)
}


function handleSaveEducation(){
  
  let additionalEducation = {
    country:educationCountry,
    levelOfEducation:educationLevelOfEducation,
    fieldOfStudy:educationFieldOfStudy,
    startDate:educationStartDate,
    endDate: educationEndDate,
    collegeOrUniversity:educationCollegeOrUniversity,
    switch:false
  }
  
  let newEducation = props.props.education
  newEducation.push(additionalEducation)

  let info = {"email":"test@email.cm", "education":additionalEducation}

  try {
    axios.post(`/api/users/addeducation`, info)
      .then(response => (console.log(response.data)))
  } catch (error) {
    console.log(error)
  }

  props.setUserData({...props.props, education: newEducation})
  setExpandEducation(false)
}

 
////UPDATE//////////////////////////////////////////////////////////////////////////////
function handleEditEducation(country, levelOfEducation, fieldOfStudy, startDate, endDate, collegeOrUniversity){
  setEducationLevelOfEducation(levelOfEducation)
  setEducationEdit(true)
  setExpandEducation(false)


  const update = props.props.education.filter(update => update.levelOfEducation == levelOfEducation);
  update[0].switch = true
  const all = props.props.education.filter(update => update.levelOfEducation !== levelOfEducation);
  let push = update.concat(all)
  props.setUserData({...props.props, education:push})
  
  setEducationEditCountry(country);
  setEducationEditLevelOfEducation(levelOfEducation);
  setEducationEditFieldOfStudy(fieldOfStudy);
  setEducationEditStartDate(startDate);
  setEducationEditEndDate(endDate);
  setEducationEditCollegeOrUniversity(collegeOrUniversity);
}


function handleCancleEdit(levelOfEducation){

  setEducationEdit(false)
  
  const update = props.props.education.filter(update => update.levelOfEducation == levelOfEducation);
  update[0].switch = false
  const all = props.props.education.filter(update => update.levelOfEducation !== levelOfEducation);
  let push = update.concat(all)
  props.setUserData({...props.props, education:push})

  setEducationEditCountry("");
  setEducationEditLevelOfEducation("");
  setEducationEditFieldOfStudy("");
  setEducationEditStartDate(new Date());
  setEducationEditEndDate(new Date());
  setEducationEditCollegeOrUniversity("");
}


function handleSaveEducationEdit(levelOfEducation){
  
  let additionalEducation = {
    country:educationEditCountry,
    levelOfEducation:educationEditLevelOfEducation,
    fieldOfStudy:educationEditFieldOfStudy,
    startDate:educationEditStartDate,
    endDate: educationEditEndDate,
    collegeOrUniversity:educationEditCollegeOrUniversity,
    switch:false
  }

  let info = {"email":"test@email.cm", "update":additionalEducation, "current":levelOfEducation}
  try {
    axios.post(`/api/users/editeducation`, info)
      .then(response => (console.log(response.data)))
  } catch (error) {
    console.log(error)
  }

  const update = props.props.education.filter(update => update.levelOfEducation !== levelOfEducation);
  update.push(additionalEducation)
  props.setUserData({...props.props, education:update})

  setEducationEdit(false)

}

////DELETE//////////////////////////////////////////////////////////////////////////////
function handleDeleteEducation(prop){

  let info = {"email":"test@email.cm", "education":prop}

  try {
    axios.post(`/api/users/deleteeducation`, info)
      .then(response => (console.log(response.data)))
  } catch (error) {
    console.log(error)
  }

  const education = props.props.education.filter(education => education.levelOfEducation !== prop);
  props.setUserData({...props.props, education:education})
  setExpandEducation(false)
}
  
  
////Create Form ///////////////////////////////////////////////////////////
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
                setEducationCollegeOrUniversity(target.value)} label="College/University"/>     


          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                views={["year", "month"]}
                label="Start Month"
                value={educationStartDate}
                onChange={setEducationStartDate}
              /> 
              <DatePicker
              views={["year", "month"]}
              label="End Month"
              value={educationEndDate}
              onChange={setEducationEndDate}
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
  

//Edit Form - includes placeholders //////////////////////////////////////////////////////////
let EditInputs =
    <div>
      <h1>edit</h1>
            <TextField fullWidth  placeholder={educationEditCountry} onChange={({ target }) =>     
              setEducationEditCountry(target.value)} label="Country" />
                
              <TextField fullWidth  placeholder={educationEditLevelOfEducation} onChange={({ target }) =>     
                    setEducationEditLevelOfEducation(target.value)} label="Level Of Education"/>

              <TextField fullWidth  placeholder={educationEditFieldOfStudy} onChange={({ target }) =>     
                    setEducationEditFieldOfStudy(target.value)} label="Field Of Study" />

              <TextField fullWidth  placeholder={educationEditCollegeOrUniversity} onChange={({ target }) =>     
                    setEducationEditCollegeOrUniversity(target.value)} label="College/University"/>     


              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    views={["year", "month"]}
                    label="Start Month"
                    value={educationEditStartDate}
                    onChange={setEducationEditStartDate}
                  /> 
                  <DatePicker
                  views={["year", "month"]}
                  label="End Month"
                  value={educationEditEndDate}
                  onChange={setEducationEditEndDate}
                  /> 
                </MuiPickersUtilsProvider>  
    
       <Button onClick={()=>handleSaveEducationEdit(educationFieldOfStudy)} variant="outlined">
         Save Changes
       </Button>
       <Button onClick={() => handleCancleEdit(educationFieldOfStudy)} variant="outlined">
         Cancel
       </Button>
     </div>





////Map all Education ////////////////////////////////////////////////////////////////////////////
let Education
  if(props.props.education.length > 0){
    Education =<><EducationMap/></>
    } else {Education=<></>}

function EducationMap(){
  return props.props.education.map(Education => {
    return (
      <div className={"pl-3 pr-3"}>
        {!Education.switch &&(
          <>
          <div className={"row space-between"}>
            <h4>{Education.country}</h4>
            <div className="row">
              <Button onClick={()=>handleEditEducation(Education.country, Education.levelOfEducation, Education.fieldOfStudy, Education.startDate, Education.endDate, Education.collegeOrUniversity)}>Edit</Button> 
              {/* <EditButton item={Education} handleEdit={handleDeleteEducation}/> */}
              <DeleteButton item={Education.levelOfEducation} handleDelete={handleDeleteEducation}/>
            </div>
          </div>
          
          <p>Level Of Education: {Education.levelOfEducation}</p>
          <p>Field Of Study: {Education.fieldOfStudy}</p>
          {/* <p>Start Date: {Education.startDate}</p>
          <p>End Date: {Education.endDate}</p> */}
          <p>College/University: {Education.collegeOrUniversity}</p>
        </>
        )}
  
      </div>
    )
  })
}
    


return (
  <div>
      <section className={"personal-details" }>
            <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
              <h4 >Eduction</h4>
              <ExpandButton expand={expandEducation} handleExpand={handleExpandEducation}/>
            </div>

            {educationEdit &&(
              <>
              {EditInputs}
              </>
            )}

            {EducationInput}
            {Education}
      </section>
  </div>
)}
