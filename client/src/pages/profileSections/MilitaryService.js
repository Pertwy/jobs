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


export default function MilitaryService(props){

  const [expandMilitaryService, setExpandMilitaryService] = useState(false)
  const [militaryServiceEdit, setMilitaryServiceEdit] = useState(false)

  const [militaryServiceCountry, setMilitaryServiceCountry] = useState("")
  const [militaryServiceUnit, setMilitaryServiceUnit] = useState("")
  const [militaryServiceRank, setMilitaryServiceRank] = useState("")
  const [militaryServiceStartDate, setMilitaryServiceStartDate] = useState(new Date())
  const [militaryServiceEndDate, setMilitaryServiceEndDate] = useState(new Date())
  const [militaryServiceDescription, setMilitaryServiceDescription] = useState("")
  const [militaryServiceComendations, setMilitaryServiceComendations] = useState("")

  const [militaryServiceEditCountry, setMilitaryServiceEditCountry] = useState("")
  const [militaryServiceEditUnit, setMilitaryServiceEditUnit] = useState("")
  const [militaryServiceEditRank, setMilitaryServiceEditRank] = useState("")
  const [militaryServiceEditStartDate, setMilitaryServiceEditStartDate] = useState(new Date())
  const [militaryServiceEditEndDate, setMilitaryServiceEditEndDate] = useState(new Date())
  const [militaryServiceEditDescription, setMilitaryServiceEditDescription] = useState("")
  const [militaryServiceEditComendations, setMilitaryServiceEditComendations] = useState("")


////CREATE//////////////////////////////////////////////////////////////////////////////
let CreateButton
if(props.props.militaryService.length > 3){
  CreateButton=<></>
}else{ CreateButton = <ExpandButton expand={expandMilitaryService} handleExpand={handleExpand}/>}


function handleExpand(){
  setExpandMilitaryService(!expandMilitaryService)
  setMilitaryServiceEdit(false)
}

function handleCancelMilitaryService(){
  setMilitaryServiceCountry("")
  setMilitaryServiceUnit("")
  setMilitaryServiceRank("")
  setMilitaryServiceStartDate("")
  setMilitaryServiceEndDate("")
  setMilitaryServiceDescription("")
  setMilitaryServiceComendations("")
  setExpandMilitaryService(!expandMilitaryService)
}


function handleSaveMilitaryService(){
  
  let additionalMilitaryService = {
    country: militaryServiceCountry,
    unit: militaryServiceUnit,
    rank: militaryServiceRank,
    startDate: militaryServiceStartDate,
    endDate: militaryServiceEndDate,
    description: militaryServiceDescription,
    comendations: militaryServiceComendations,
    switch: false
  }
  
  let newMilitaryService = props.props.militaryService
  newMilitaryService.push(additionalMilitaryService)

  let info = {"email":"test@email.cm", "militaryService":additionalMilitaryService}

  try {
    axios.post(`/api/users/addmilitaryservice`, info)
      .then(response => (console.log(response.data)))
      // .then(response => setUserData(response.data))
  } catch (error) {
    console.log(error)
  }

  props.setUserData({...props.props, militaryService:newMilitaryService})
  setExpandMilitaryService(false)
}




////UPDATE//////////////////////////////////////////////////////////////////////////////
function handleEditMilitaryService(country, unit, rank, description, comendations, startDate, endDate){
  setMilitaryServiceUnit(unit)
  setMilitaryServiceEdit(true)
  setExpandMilitaryService(false)


  const updateMS = props.props.militaryService.filter(updateMS => updateMS.unit == unit);
  updateMS[0].switch = true
  const allMS = props.props.militaryService.filter(updateMS => updateMS.unit !== unit);
  let pushMS = updateMS.concat(allMS)
  props.setUserData({...props.props, militaryService:pushMS})
  

  setMilitaryServiceEditCountry(country)
  setMilitaryServiceEditUnit(unit)
  setMilitaryServiceEditRank(rank)
  setMilitaryServiceEditStartDate(startDate)
  setMilitaryServiceEditEndDate(endDate)
  setMilitaryServiceEditDescription(description)
  setMilitaryServiceEditComendations(comendations)
}


function handleCancleEdit(unit){

  setMilitaryServiceEdit(false)
  
  const updateMS = props.props.militaryService.filter(updateMS => updateMS.unit == unit);
  updateMS[0].switch = false
  const allMS = props.props.militaryService.filter(updateMS => updateMS.unit !== unit);
  let pushMS = updateMS.concat(allMS)
  props.setUserData({...props.props, militaryService:pushMS})

  setMilitaryServiceEditCountry("")
  setMilitaryServiceEditUnit("")
  setMilitaryServiceEditRank("")
  setMilitaryServiceEditStartDate(new Date())
  setMilitaryServiceEditEndDate(new Date())
  setMilitaryServiceEditDescription("")
  setMilitaryServiceEditComendations("")
}


function handleSaveMilitaryServiceEdit(unit){
  
  let additionalMilitaryService = {
    country: militaryServiceEditCountry,
    unit: militaryServiceEditUnit,
    rank: militaryServiceEditRank,
    startDate: militaryServiceEditStartDate,
    endDate: militaryServiceEditEndDate,
    description: militaryServiceEditDescription,
    comendations: militaryServiceEditComendations,
    switch: false
  }

  let info = {"email":"test@email.cm", "update":additionalMilitaryService, "current":unit}
  try {
    axios.post(`/api/users/editmilitaryservice`, info)
      .then(response => (console.log(response.data)))
  } catch (error) {
    console.log(error)
  }

  const updateMS = props.props.militaryService.filter(updateMS => updateMS.unit !== unit);
  updateMS.push(additionalMilitaryService)
  props.setUserData({...props.props, militaryService:updateMS})

  setMilitaryServiceEdit(false)

}

////DELETE//////////////////////////////////////////////////////////////////////////////
function handleDeleteMilitaryService(prop){
  let info = {"email":"test@email.cm", "militaryService":prop}

  try {
    axios.post(`/api/users/deletemilitaryservice`, info)
      .then(response => (console.log(response.data)))
  } catch (error) {
    console.log(error)
  }

  const militaryService = props.props.militaryService.filter(militaryService => militaryService.unit !== prop);
  props.setUserData({...props.props, militaryService:militaryService})
  setExpandMilitaryService(false)
}



////Create Form ///////////////////////////////////////////////////////////
let MilitaryServiceInput
if(expandMilitaryService){
    MilitaryServiceInput =
      <>
      <h1>New</h1>
        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceCountry(target.value)} label="Country" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceUnit(target.value)} label="Unit"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceRank(target.value)} label="Rank" />

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceDescription(target.value)} label="Description"/>         

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceComendations(target.value)} label="Comendations"/>   

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                views={["year", "month"]}
                label="Start Month"
                value={militaryServiceStartDate}
                onChange={setMilitaryServiceStartDate}
              /> 
              <DatePicker
                views={["year", "month"]}
                label="Start Month"
                value={militaryServiceEndDate}
                onChange={setMilitaryServiceEndDate}
              /> 
            </MuiPickersUtilsProvider> 
        

        <Button onClick={()=>handleSaveMilitaryService()} variant="outlined">
          Save Changes
        </Button>
        <Button onClick={()=>handleCancelMilitaryService()} variant="outlined">
          Cancel
        </Button>
      </>
  }else {MilitaryServiceInput =<></>} 
  


///Edit Form - includes placeholders //////////////////////////////////////////////////////////
let EditInputs =
    <div>
      <h1>edit</h1>
        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEditCountry(target.value)} label="Country" placeholder={militaryServiceEditCountry}/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEditUnit(target.value)} label="Unit" placeholder={militaryServiceEditUnit}/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEditRank(target.value)} label="Rank" placeholder={militaryServiceEditRank}/>

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEditDescription(target.value)} label="Description" placeholder={militaryServiceEditDescription}/>         

        <TextField fullWidth  onChange={({ target }) =>     
              setMilitaryServiceEditComendations(target.value)} label="Comendations" placeholder={militaryServiceEditComendations}/>   

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                          
              views={["year", "month"]}
              label="Start Month"
              value={militaryServiceEditStartDate}
              onChange={setMilitaryServiceEditStartDate}
            /> 
            <DatePicker
              views={["year", "month"]}
              label="Start Month"
              value={militaryServiceEditEndDate}
              onChange={setMilitaryServiceEditEndDate}
            /> 
          </MuiPickersUtilsProvider> 
    
      <Button onClick={()=>handleSaveMilitaryServiceEdit(militaryServiceUnit)} variant="outlined">
        Save Changes
      </Button>
      <Button onClick={() => handleCancleEdit(militaryServiceUnit)} variant="outlined">
        Cancel
      </Button>
    </div>



////Map all MS ////////////////////////////////////////////////////////////////////////////
let MilitaryServiceInfo
if(props.props.militaryService.length > 0){
  MilitaryServiceInfo = <><MilitaryServiceMap/></>
  } else{MilitaryServiceInfo = <></>}
  
function MilitaryServiceMap(){
  return props.props.militaryService.map(MilitaryService => {
    return (
      
      <div className={"pl-3 pr-3 row space-between"}>

        {!MilitaryService.switch &&(
          <>
          <div>
            <p>Country: {MilitaryService.country}</p>
            <p>Unit: {MilitaryService.unit}</p>
            <p>Start Date:</p>
            <p>End Date:</p>
            <p>Start Date: {MilitaryService.startDate}</p>
            <p>End Date: {MilitaryService.endDate}</p>
            <p>Rank: {MilitaryService.rank}</p>
            <p>Description: {MilitaryService.description}</p>
            <p>Comendations: {MilitaryService.comendations}</p>
          </div>
    
          <div className={"row "}>
            <Button onClick={()=>handleEditMilitaryService(MilitaryService.country, MilitaryService.unit, MilitaryService.rank, MilitaryService.description, MilitaryService.comendation, MilitaryService.startDate, MilitaryService.endDate)}>Edit</Button> 
            {/* <EditButton item={MilitaryService.jobTitle} handleDelete={handleDeleteMilitaryService}/> */}
            <DeleteButton item={MilitaryService.unit} handleDelete={handleDeleteMilitaryService}/>
          </div>
        </>)}
    
      </div>
    )
  })

}


  return (
    <div>
      <section className={"personal-details" }>
        
            <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
              <h4 >Military Service</h4>
              {CreateButton}
            </div>


            {militaryServiceEdit &&(
              <>
              {EditInputs}
              </>
            )}


            {MilitaryServiceInput}
            {MilitaryServiceInfo}

      </section>
    </div>
  )
}
