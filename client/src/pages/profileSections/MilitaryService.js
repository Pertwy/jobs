import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function MilitaryService(props){

  const [expandMilitaryService, setExpandMilitaryService] = useState(false)
  const [militaryServiceCountry, setMilitaryServiceCountry] = useState("")
  const [militaryServiceUnit, setMilitaryServiceUnit] = useState("")
  const [militaryRank, setMilitaryRank] = useState("")
  const [militaryServiceStartDate, setMilitaryServiceStartDate] = useState("")
  const [militaryServiceEndDate, setMilitaryServiceEndDate] = useState("")
  const [militaryServiceDescription, setMilitaryServiceDescription] = useState("")
  const [militaryServiceComendations, setMilitaryServiceComendations] = useState("")

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
//Military Service ///////////////////////////////////////////////
function handleExpandMilitaryService(){
  setExpandMilitaryService(!expandMilitaryService)
}

function handleSaveMilitaryService(){
  let newMilitaryService = props.props.militaryService
  newMilitaryService.push({
    country: militaryServiceCountry,
    unit: militaryServiceUnit,
    rank: militaryRank,
    startDate: militaryServiceStartDate,
    endDate: militaryServiceEndDate,
    description: militaryServiceDescription,
    comendations: militaryServiceComendations
  })

  props.setUserData({...props.props, militaryService:newMilitaryService})
  setExpandMilitaryService(false)
}

function handleDeleteMilitaryService(prop){
  const militaryService = props.props.militaryService.filter(militaryService => militaryService.jobTitle !== prop);
  props.setUserData({...props.props, militaryService:militaryService})
  setExpandMilitaryService(false)
}


function handleCancelMilitaryService(){
  setMilitaryServiceCountry("")
  setMilitaryServiceUnit("")
  setMilitaryRank("")
  setMilitaryServiceStartDate("")
  setMilitaryServiceEndDate("")
  setMilitaryServiceDescription("")
  setMilitaryServiceComendations("")
  setExpandMilitaryService(!expandMilitaryService)
}

let AddButton
if(props.props.militaryService.length > 0){
  AddButton=<></>
}else{AddButton = <button onClick={() => handleExpandMilitaryService()}>Add</button>}


let MilitaryService
if(props.props.militaryService.length > 0){
  MilitaryService = <><MilitaryServiceMap/></>
  } else{MilitaryService = <></>}
  
let MilitaryServiceInput
if(expandMilitaryService){
    MilitaryServiceInput =
      <>
        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceCountry(target.value)} label="Country" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceUnit(target.value)} label="Unit"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryRank(target.value)} label="Rank" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceStartDate(target.value)} label="Start Date"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEndDate(target.value)} label="End Date"/>  

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceDescription(target.value)} label="Description"/>         

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceComendations(target.value)} label="Comendations"/>   

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                variant="inline"
                openTo="year"
                views={["year", "month"]}
                label="Start Month"
                //helperText="Start Month"
                value={startDate}
                onChange={setStartDate}
              /> 
              <DatePicker
                variant="inline"
                openTo="year"
                views={["year", "month"]}
                label="End Month"
                //helperText="End Month"
                value={endDate}
                onChange={setEndDate}
              /> 
            </MuiPickersUtilsProvider> 
        

        <Button onClick={()=>handleSaveMilitaryService()} variant="outlined">
          Save Changes
        </Button>
        <Button onClick={()=>handleCancelMilitaryService()} variant="outlined">
          Cancel
        </Button>
      </>
  } else {MilitaryServiceInput =<></>}
 



    function MilitaryServiceMap(){
      return props.props.militaryService.map(MilitaryService => {
        return (
          <div className={"pl-3 pr-3"}>
            <div className={"row space-between"}>
              <h4>{MilitaryService.jobTitle}</h4>
              <button onClick={()=>handleDeleteMilitaryService(MilitaryService.jobTitle)}>delete</button>
              <button onClick={()=>handleDeleteMilitaryService(MilitaryService.jobTitle)}>edit</button>
            </div>
            <p>Country: {MilitaryService.country}</p>
            <p>Unit: {MilitaryService.unit}</p>
            <p>Start Date: {MilitaryService.startDate}</p>
            <p>End Date: {MilitaryService.endDate}</p>
            <p>Rank: {MilitaryService.rank}</p>
            <p>Description: {MilitaryService.description}</p>
            <p>Comendations: {MilitaryService.comendations}</p>
      
            
          </div>
        )
      })
    }
    


  return (
    <div>
        <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Military Service</h4>
                {AddButton}
                
              </div>
              {MilitaryService}
              {MilitaryServiceInput}
        </section>
    </div>
  )
}
