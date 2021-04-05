import React, { useState, Fragment} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


export default function WorkExperience(props){

    const [expandWorkExperience, setExpandWorkExperience] = useState(false)
    const [WEJobTitle, setWEJobTilte] = useState("")
    const [WECompany, setWECompany] = useState("")
    const [WELocation, setWELocation] = useState("")
    const [WEStartDate, setWEStartDate] = useState("")
    const [WEEndDate, setWEEndDate] = useState("")
    const [WEDescription, setWEDescription] = useState("")

    // const [startDate, setSelectedDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
  
    // const setStartDate = (date: Date | null) => {
    //   setSelectedDate(date);
    // };


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
         
           <div>
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
            




            {/* <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              helperText="With min and max"
              minDate={new Date("2018-03-01")}
              maxDate={new Date("2018-06-01")}
              value={startDate}
              // onChange={setStartDate}
              onChange={({ target }) => setSelectedDate(target.value)}
            /> */}
    
            
    
            <Button onClick={()=>handleSaveWorkExperience()} variant="outlined">
              Save Changes
            </Button>
            <Button onClick={()=>handleCancelWorkExperience()} variant="outlined">
              Cancel
            </Button>
            </div>
   
     
      } else{
        WorkExperience = <></>
      }
    
    
        function WorkExperienceMap(){
          return props.props.workExperience.map(WorkExperience => {
            return (
              <div className={"pl-3 pr-3"}>
                <div className={"row space-between"}>
                  <h4>{WorkExperience.jobTitle}</h4>
                  <div className="row">
                    <button onClick={()=>handleDeleteWorkExperience(WorkExperience.jobTitle)}>delete</button>
                    <button onClick={()=>handleDeleteWorkExperience(WorkExperience.jobTitle)}>delete</button>
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
                <button onClick={() => handleExpandWorkExperience()}>Add</button>
              </div>
              {WorkExperience}
            </section>
    </div>
  )
}
