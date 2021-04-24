import React, { useState, Fragment} from 'react';
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

export default function WorkExperience(props){

    const [expandWE, setExpandWE] = useState(false)
    const [WEEdit, setWEEdit] = useState(false)

    const [WEJobTitle, setWEJobTilte] = useState("")
    const [WECompany, setWECompany] = useState("")
    const [WELocation, setWELocation] = useState("")
    const [WEStartDate, setWEStartDate] = useState(new Date())
    const [WEEndDate, setWEEndDate] = useState(new Date())
    const [WEDescription, setWEDescription] = useState("")

    const [WEEditJobTitle, setWEEditJobTitle] = useState("")
    const [WEEditCompany, setWEEditCompany] = useState("")
    const [WEEditLocation, setWEEditLocation] = useState("")
    const [WEEditStartDate, setWEEditStartDate] = useState(new Date())
    const [WEEditEndDate, setWEEditEndDate] = useState(new Date())
    const [WEEditDescription, setWEEditDescription] = useState("")



////CREATE//////////////////////////////////////////////////////////////////////////////
function handleExpandWorkExperience(){
  setExpandWE(!expandWE)
  setWEEdit(false)
}

function handleCancelWorkExperience(){
  setWEJobTilte("")
  setWECompany("")
  setWELocation("")
  setWEStartDate("")
  setWEEndDate("")
  setWEDescription("")
  setExpandWE(!expandWE)
}


function handleSaveWorkExperience(){

  let additionalWorkExperience ={
    jobTitle:WEJobTitle,
    company:WECompany,
    location:WELocation,
    startDate:WEStartDate,
    endDate:WEEndDate,
    description:WEDescription
  }

  let newWorkExperience = props.props.workExperience
  newWorkExperience.push(additionalWorkExperience)

  let info = {"email":"test@email.cm", "workExperience":additionalWorkExperience}

  try {
    axios.post(`/api/users/addworkexperience`, info)
      .then(response => (console.log(response.data)))
      // .then(response => setUserData(response.data))
  } catch (error) {
    console.log(error)
  }

  props.setUserData({...props.props, workExperience:newWorkExperience})
  setExpandWE(false)
}


////UPDATE//////////////////////////////////////////////////////////////////////////////
function handleEditWE(jobTitle, company, location, startDate, endDate, description){
  setWEDescription(description)
  setWEEdit(true)
  setExpandWE(false)


  const updateWE = props.props.workExperience.filter(updateWE => updateWE.description == description);
  updateWE[0].switch = true
  const allWE = props.props.workExperience.filter(updateWE => updateWE.description !== description);
  let pushWE = updateWE.concat(allWE)
  props.setUserData({...props.props, workExperience:pushWE})
  

  setWEEditJobTitle(jobTitle)
  setWEEditCompany(company)
  setWEEditLocation(location)
  setWEEditStartDate(startDate)
  setWEEditEndDate(endDate)
  setWEEditDescription(description)
}



function handleCancleEdit(unit){

  setWEEdit(false)
  
  const updateWE = props.props.workExperience.filter(updateWE => updateWE.unit == unit);
  updateWE[0].switch = false
  const allWE = props.props.workExperience.filter(updateWE => updateWE.unit !== unit);
  let pushWE = updateWE.concat(allWE)
  props.setUserData({...props.props, workExperience:pushWE})

  setWEEditJobTitle("")
  setWEEditCompany("")
  setWEEditLocation("")
  setWEEditStartDate("")
  setWEEditEndDate("")
  setWEEditDescription("")

}



function handleSaveWEEdit(description){
  
  let additionalWE ={
    jobTitle:WEEditJobTitle,
    company:WEEditCompany,
    location:WEEditLocation,
    startDate:WEEditStartDate,
    endDate:WEEditEndDate,
    description:WEEditDescription,
    switch:false
  }

  let info = {"email":"test@email.cm", "update":additionalWE, "current":description}
  try {
    axios.post(`/api/users/editworkexperience`, info)
      .then(response => (console.log(response.data)))
  } catch (error) {
    console.log(error)
  }

  const updateWE = props.props.workExperience.filter(updateWE => updateWE.description !== description);
  updateWE.push(additionalWE)
  props.setUserData({...props.props, workExperience:updateWE})

  setWEEdit(false)

}




////DELETE//////////////////////////////////////////////////////////////////////////////
function handleDeleteWorkExperience(prop){

  let info = {"email":"test@email.cm", "workExperience":prop}

  try {
    axios.post(`/api/users/deleteworkexperience`, info)
      .then(response => (console.log(response.data)))
      // .then(response => setUserData(response.data))
  } catch (error) {
    console.log(error)
  }

  const workExperience = props.props.workExperience.filter(workExperience => workExperience.jobTitle !== prop);
  props.setUserData({...props.props, workExperience:workExperience})
  setExpandWE(false)
}

    
////Create Form /////////////////////////////////////////////////////
let WorkExperienceInput
if(expandWE){
WorkExperienceInput =
<>
  <TextField fullWidth  onChange={({ target }) =>     
        setWEJobTilte(target.value)} label="Job Title" />

  <TextField fullWidth  onChange={({ target }) =>     
        setWECompany(target.value)} label="Company"/>

  <TextField fullWidth  onChange={({ target }) =>     
        setWELocation(target.value)} label="Location" />

  <TextField fullWidth  onChange={({ target }) =>     
        setWEDescription(target.value)} label="Description"/>   

  {/* <TextField
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
          /> */}

  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      views={["year", "month"]}
      label="Start Month"
      // helperText="Start Month"
      value={WEStartDate}
      onChange={setWEStartDate}
    /> 
    <DatePicker
      views={["year", "month"]}
      label="End Month"
      value={WEEndDate}
      onChange={setWEEndDate}
    /> 
  </MuiPickersUtilsProvider>      

  

  <Button onClick={()=>handleSaveWorkExperience()} variant="outlined">
    Save Changes
  </Button>
  <Button onClick={()=>handleCancelWorkExperience()} variant="outlined">
    Cancel
  </Button>
</>} else{WorkExperienceInput =<></>}
         


    
///Edit Form - includes placeholders //////////////////////////////////////////////////////////
let EditInputs =
    <div>
      <h1>edit</h1>
          <TextField fullWidth  placeholder={WEEditJobTitle} onChange={({ target }) =>     
                  setWEEditJobTitle(target.value)} label="Job Title" />

            <TextField fullWidth  placeholder={WEEditCompany} onChange={({ target }) =>     
                  setWEEditCompany(target.value)} label="Company"/>

            <TextField fullWidth  placeholder={WEEditLocation} onChange={({ target }) =>     
                  setWEEditLocation(target.value)} label="Location" />

            <TextField fullWidth  placeholder={WEEditDescription} onChange={({ target }) =>     
                  setWEEditDescription(target.value)} label="Description"/>   

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                views={["year", "month"]}
                label="Start Month"
                value={WEEditStartDate}
                onChange={setWEEditStartDate}
              /> 
              <DatePicker
                views={["year", "month"]}
                label="End Month"
                value={WEEditEndDate}
                onChange={setWEEditEndDate}
              /> 
            </MuiPickersUtilsProvider>  
    
      <Button onClick={()=>handleSaveWEEdit(WEDescription)} variant="outlined">
        Save Changes
      </Button>
      <Button onClick={() => handleCancleEdit(WEDescription)} variant="outlined">
        Cancel
      </Button>
    </div>



        
    
////Map all WE ////////////////////////////////////////////////////////////////////////////
let WorkExperience
if(props.props.workExperience.length > 0){
  WorkExperience =<><WorkExperienceMap/></>
  } else {WorkExperience = <></>}

  function WorkExperienceMap(){
    return props.props.workExperience.map(WorkExperience => {
      return (
        <>
          {!WorkExperience.switch &&(
            <div className={"pl-3 pr-3"}>
              <div className={"row space-between"}>
                <h4>{WorkExperience.jobTitle}</h4>
                <div className="row">
                  <Button onClick={()=>handleEditWE(WorkExperience.jobTitle, WorkExperience.company, WorkExperience.location, WorkExperience.startDate, WorkExperience.endDate, WorkExperience.description)}>Edit</Button> 
                  {/* <EditButton item={WorkExperience.jobTitle} handleEdit={handleDeleteWorkExperience}/> */}
                  <DeleteButton item={WorkExperience.jobTitle} handleDelete={handleDeleteWorkExperience}/>
                  </div>
              </div>
              <p>Company: {WorkExperience.company}</p>
              <p>Location: {WorkExperience.location}</p>
              {/* <p>Start Date: {WorkExperience.startDate}</p>
              <p>End Date: {WorkExperience.endDate}</p> */}
              <p>Description: {WorkExperience.description}</p>
            </div>)}
        </>
      )
    })
  }


  return (
    <div>
        <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Work Experience</h4>
                <ExpandButton expand={expandWE} handleExpand={handleExpandWorkExperience}/>
              </div>

              {WEEdit &&(
                <>
                {EditInputs}
                </>
              )}


              {WorkExperienceInput}
              {WorkExperience}

            </section>
    </div>
  )
}
