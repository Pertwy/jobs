import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function WorkExperience(props){

    const [expandWorkExperience, setExpandWorkExperience] = useState(false)
    const [WEJobTitle, setWEJobTilte] = useState("")
    const [WECompany, setWECompany] = useState("")
    const [WELocation, setWELocation] = useState("")
    const [WEStartDate, setWEStartDate] = useState("")
    const [WEEndDate, setWEEndDate] = useState("")
    const [WEDescription, setWEDescription] = useState("")


//Work Experience ///////////////////////////////////////////////
function handleExpandWorkExperience(){
    setExpandWorkExperience(!expandWorkExperience)
    //console.log(props.props.workExperience)
  }
  
  function handleSaveWorkExperience(){
    let newWorkExperience = props.props.workExperience
    newWorkExperience.push({
      jobTitle:WEJobTitle,
      company:WECompany,
      location:WELocation,
      startDate:WEStartDate,
      endDate:WEEndDate,
      description:WEDescription
    })
    props.setUserData({...props.props, workExperience:newWorkExperience})
    setExpandWorkExperience(false)
  }
  
  function handleDeleteWorkExperience(prop){
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
    if(props.props.workExperience.length > 0 && !expandWorkExperience){
      WorkExperience =
        <>
          <WorkExperienceMap></WorkExperienceMap>
        </>
      } else if(props.props.workExperience.length > 0 && expandWorkExperience){
        WorkExperience =
        <>
          <WorkExperienceMap></WorkExperienceMap>
          <>
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEJobTilte(target.value)} id="standard-basic" label="Job Title" />
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWECompany(target.value)} id="standard-basic" label="Company"/>
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWELocation(target.value)} id="standard-basic" label="Location" />
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEStartDate(target.value)} id="standard-basic" label="Start Date"/>
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEEndDate(target.value)} id="standard-basic" label="End Date"/>  
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEDescription(target.value)} id="standard-basic" label="Description"/>         
    
            
    
            <Button onClick={()=>handleSaveWorkExperience()} variant="outlined">
              Save Changes
            </Button>
            <Button onClick={()=>handleCancelWorkExperience()} variant="outlined">
              Cancel
            </Button>
          </>
        </>
      } else if(props.props.workExperience.length == 0 && expandWorkExperience){
        WorkExperience =
          <>
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEJobTilte(target.value)} id="standard-basic" label="Job Title" />
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWECompany(target.value)} id="standard-basic" label="Company"/>
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWELocation(target.value)} id="standard-basic" label="Location" />
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEStartDate(target.value)} id="standard-basic" label="Start Date"/>
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEEndDate(target.value)} id="standard-basic" label="End Date"/>  
    
            <TextField fullWidth  onChange={({ target }) =>     
                  setWEDescription(target.value)} id="standard-basic" label="Description"/>         
    
            
    
            <Button onClick={()=>handleSaveWorkExperience()} variant="outlined">
              Save Changes
            </Button>
            <Button onClick={()=>handleCancelWorkExperience()} variant="outlined">
              Cancel
            </Button>
       </>
     
      } else{
        WorkExperience = <></>
      }
    
    
        function WorkExperienceMap(){
          return props.props.workExperience.map(WorkExperience => {
            return (
              <div className={"pl-3 pr-3"}>
                <div className={"row space-between"}>
                  <h4>{WorkExperience.jobTitle}</h4>
                  <button onClick={()=>handleDeleteWorkExperience(WorkExperience.jobTitle)}>delete</button>
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
                <button onClick={() => handleExpandWorkExperience()}>Edit</button>
              </div>
              {WorkExperience}
            </section>
    </div>
  )
}
