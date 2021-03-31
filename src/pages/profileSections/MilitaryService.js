import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function MilitaryService(props){

  const [expandMilitaryService, setExpandMilitaryService] = useState(false)
  const [militaryServiceCountry, setMilitaryServiceCountry] = useState("")
  const [militaryServiceUnit, setMilitaryServiceUnit] = useState("")
  const [militaryRank, setMilitaryRank] = useState("")
  const [militaryServiceStartDate, setMilitaryServiceStartDate] = useState("")
  const [militaryServiceEndDate, setMilitaryServiceEndDate] = useState("")
  const [militaryServiceDescription, setMilitaryServiceDescription] = useState("")
  const [militaryServiceComendations, setMilitaryServiceComendations] = useState("")

  
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



let MilitaryService
if(props.props.militaryService.length > 0 && !expandMilitaryService){
  MilitaryService =
    <>
      <MilitaryServiceMap></MilitaryServiceMap>
    </>
  } else if(props.props.militaryService.length > 0 && expandMilitaryService){
    MilitaryService =
    <>
      <MilitaryServiceMap></MilitaryServiceMap>
      <>
        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceCountry(target.value)} id="standard-basic" label="Country" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceUnit(target.value)} id="standard-basic" label="Unit"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryRank(target.value)} id="standard-basic" label="Rank" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceStartDate(target.value)} id="standard-basic" label="Start Date"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEndDate(target.value)} id="standard-basic" label="End Date"/>  

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceDescription(target.value)} id="standard-basic" label="Description"/>         

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceComendations(target.value)} id="standard-basic" label="Comendations"/>   

        

        <Button onClick={()=>handleSaveMilitaryService()} variant="outlined">
          Save Changes
        </Button>
        <Button onClick={()=>handleCancelMilitaryService()} variant="outlined">
          Cancel
        </Button>
      </>
    </>
  } else if(props.props.militaryService.length == 0 && expandMilitaryService){
    MilitaryService =
      <>
               <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceCountry(target.value)} id="standard-basic" label="Country" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceUnit(target.value)} id="standard-basic" label="Unit"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryRank(target.value)} id="standard-basic" label="Rank" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceStartDate(target.value)} id="standard-basic" label="Start Date"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEndDate(target.value)} id="standard-basic" label="End Date"/>  

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceDescription(target.value)} id="standard-basic" label="Description"/>         

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceComendations(target.value)} id="standard-basic" label="Comendations"/>           

        

        <Button onClick={()=>handleSaveMilitaryService()} variant="outlined">
          Save Changes
        </Button>
        <Button onClick={()=>handleCancelMilitaryService()} variant="outlined">
          Cancel
        </Button>
   </>
 
  } else{
    MilitaryService = <></>
  }


    function MilitaryServiceMap(){
      return props.props.militaryService.map(MilitaryService => {
        return (
          <div className={"pl-3 pr-3"}>
            <div className={"row space-between"}>
              <h4>{MilitaryService.jobTitle}</h4>
              <button onClick={()=>handleDeleteMilitaryService(MilitaryService.jobTitle)}>delete</button>
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
                <button onClick={() => handleExpandMilitaryService()}>Add</button>
              </div>
              {MilitaryService}
        </section>
    </div>
  )
}
