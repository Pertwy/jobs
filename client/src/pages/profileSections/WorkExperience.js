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

    const [expandWorkExperience, setExpandWorkExperience] = useState(false)
    const [WEJobTitle, setWEJobTilte] = useState("")
    const [WECompany, setWECompany] = useState("")
    const [WELocation, setWELocation] = useState("")
    const [WEStartDate, setWEStartDate] = useState(new Date())
    const [WEEndDate, setWEEndDate] = useState(new Date())
    const [WEDescription, setWEDescription] = useState("")

    
  
    // const setStartDate = (date: Date | null) => {
    //   setSelectedDate(date);
    // };


//Work Experience ///////////////////////////////////////////////
function handleExpandWorkExperience(){
    setExpandWorkExperience(!expandWorkExperience)
    //console.log(props.props.workExperience)
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
    setExpandWorkExperience(false)
  }
  





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
    setExpandWorkExperience(false)
  }
  
  
  function handleCancelWorkExperience(){
    setWEJobTilte("")
    setWECompany("")
    setWELocation("")
    setWEStartDate("")
    setWEEndDate("")
    setWEDescription("")
    setExpandWorkExperience(!expandWorkExperience)
  }


    let WorkExperience
    if(props.props.workExperience.length > 0){
      WorkExperience =<><WorkExperienceMap/></>
      } else {WorkExperience = <></>}
        
    let WorkExperienceInput
    if(expandWorkExperience){
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
         
    
        function WorkExperienceMap(){
          return props.props.workExperience.map(WorkExperience => {
            return (
              <div className={"pl-3 pr-3"}>
                <div className={"row space-between"}>
                  <h4>{WorkExperience.jobTitle}</h4>
                  <div className="row">

                    <EditButton item={WorkExperience.jobTitle} handleEdit={handleDeleteWorkExperience}/>
                    <DeleteButton item={WorkExperience.jobTitle} handleDelete={handleDeleteWorkExperience}/>
                    </div>
                </div>
                <p>Company: {WorkExperience.company}</p>
                <p>Location: {WorkExperience.location}</p>
                <p>Start Date: {WorkExperience.startDate}</p>
                <p>End Date: {WorkExperience.endDate}</p>
                <p>Description: {WorkExperience.description}</p>
              </div>
            )
          })
        }
    


  return (
    <div>
        <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Work Experience</h4>
                <ExpandButton expand={expandWorkExperience} handleExpand={handleExpandWorkExperience}/>
              </div>
              {WorkExperienceInput}
              {WorkExperience}
            </section>
    </div>
  )
}
