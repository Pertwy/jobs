import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddList.css"
import JobPostProfile from "../components/JobPostProfile"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function Profile(){
  const [userData, setUserData] = useState({
    givenName:"john",
    surname:"perkins",
    email:"j@gmail",
    headline:"",
    appliedTo:[],
    savedJobs:[],
    summary:"",
    photo:"",
    CV:"",
    location:"london",
    phoneNumber:"0121",
    elegibleUK:"Y",
    highestLevelOfDegree:"Y",
    industry:[],
    workExperience:[],
    militaryService:[],
    eduction:[],
    skills:[],
    links:[],
    additionalInformation:"",
    languages:[],
  })
  const [expandPersonalDetails, setExpandPersonalDetails] = useState(true)
  const [expandBasicInfo, setExpandBasicInfo] = useState(true)

  const [givenName, setGivenName] = useState("")
  const [surname, setSurname] = useState("")
  const [headline, setHeadline] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [highestLevelOfDegree, setHighestLevelOfDegree] = useState("")
  const [elegibleUK, setElegibleUK] = useState("")


  // useEffect(() => {
  //   try {
  //     axios.get('http://localhost:5000/users/')
  //       //.then(response => (console.log(response.data)))
  //       .then(response => setUserData(response.data))

  //   } catch (error) {
  //     console.log(error)
  //   }
  // },[])


  //Display applied to jobs
  function AppliedTo() {
    return userData.appliedTo.map(currentJobPost => {
      return (
        <JobPostProfile props={currentJobPost}/>
      )
    })
  }


  //Display applied to jobs
  function SavedJobs() {
      return userData.appliedTo.map(currentJobPost => {
        return (
          <JobPostProfile props={currentJobPost}/>
        )
      })
  }


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

//Personal Details ///////////////////////////////////////////////
  function handleExpandPersonalDetails(){
    setExpandPersonalDetails(!expandPersonalDetails)
  }

  function handleSavePersonalDetails(){
    if(elegibleUK){
      setUserData({...userData, elegibleUK:elegibleUK})
    }
    if(highestLevelOfDegree){
      setUserData({...userData, highestLevelOfDegree:highestLevelOfDegree})
    }
    setExpandPersonalDetails(!expandPersonalDetails)
  }

  function handleCancelPersonalDetails(){
    setElegibleUK("")
    setHighestLevelOfDegree("")
    setExpandPersonalDetails(!expandPersonalDetails)
  }

  let PersonalDetails 
  if(expandPersonalDetails){
    PersonalDetails =
      <>
        {userData.elegibleUK && <p>Eligible to Work in the UK</p>}
        {userData.highestLevelOfDegree && <p>Highest level of education</p>}
        {userData.industry.length > 0  && <p>Industry</p>}
      </>
    } else{
      PersonalDetails = <>
            <TextField fullWidth  onChange={({ target }) =>     
                  setElegibleUK(target.value)} id="standard-basic" label="Eligible to work in the UK" placeholder={userData.elegibleUK}/>

            <TextField fullWidth  onChange={({ target }) =>     
                  setHighestLevelOfDegree(target.value)} id="standard-basic" label="Highest Level of Degree" placeholder={userData.highestLevelOfDegree}/>

            <Button onClick={()=>handleSavePersonalDetails()} variant="outlined">
              Save Changes
            </Button>
            <Button onClick={()=>handleCancelPersonalDetails()} variant="outlined">
              Cancel
            </Button>

      </>    }


//Basic Info ///////////////////////////////////////////////
function handleExpandBasicInfo(){
  setExpandBasicInfo(!expandBasicInfo)
}

function handleSaveBasicInfo(){
  if(givenName){
    setUserData({...userData, givenName:givenName})
  }
  if(surname){
    setUserData({...userData, surname:surname})
  }
  if(location){
    setUserData({...userData, location:location})
  }
  if(email){
    setUserData({...userData, email:email})
  }
  if(phoneNumber){
    setUserData({...userData, phoneNumber:phoneNumber})
  }

  setExpandBasicInfo(!expandBasicInfo)
}

function handleCancelBasicInfo(){
  setGivenName("")
  setSurname("")
  setHeadline("")
  setEmail("")
  setPhoneNumber("")
  setExpandBasicInfo(!expandBasicInfo)
}

let BasicInfo 
if(expandBasicInfo){
  BasicInfo =
    <>
      {userData.givenName && <p>Given Name</p>}
      {userData.surname && <p>Surname</p>}
      {userData.headline && <p>Headline</p>}
      {userData.location && <p>Location</p>}
      {userData.email > 0  && <p>Email</p>}
      {userData.phoneNumber > 0  && <p>Phone Number</p>}
    </>
  } else{
    BasicInfo = <>
          <TextField fullWidth  onChange={({ target }) =>     
                setGivenName(target.value)} id="standard-basic" label="Given Name" placeholder={userData.givenName}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setSurname(target.value)} id="standard-basic" label="Surname" placeholder={userData.surname}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setHeadline(target.value)} id="standard-basic" label="Headline" placeholder={userData.headline}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setLocation(target.value)} id="standard-basic" label="Location" placeholder={userData.location}/>  

          <TextField fullWidth  onChange={({ target }) =>     
                setEmail(target.value)} id="standard-basic" label="Email" placeholder={userData.email}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setPhoneNumber(target.value)} id="standard-basic" label="Phone Number" placeholder={userData.phoneNumber}/>

          <Button onClick={()=>handleSaveBasicInfo()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelBasicInfo()} variant="outlined">
            Cancel
          </Button>

    </>    }






  return (
    <div className="container">


      <div className="row container-fluid">
          <div className="mb-4">
            <h4>{capitalizeFirstLetter(userData.givenName)} {capitalizeFirstLetter(userData.surname)} - {userData.email}</h4>
            <h5>Location</h5>
          </div>
      </div>
      

      <div className="row container-fluid">
        
        <div className={"col-sm-12"} >
          <div className={"border  p-3"}>


            <section className={"basic-info" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Basic Info</h4>
                <button onClick={() => handleExpandBasicInfo()}>Edit</button>
              </div>
              {BasicInfo}
            </section>


            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Personal Details</h4>
                <button onClick={() => handleExpandPersonalDetails()}>Edit</button>
              </div>
              {PersonalDetails}
            </section>


            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Work Experience</h4>
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Education</h4>
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Skills</h4>
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Links</h4>
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Aditional information</h4>
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Add Section</h4>
              <p>Languages</p>
              <p>Military service</p>
            </section>


          </div>
        </div>

        {/* <div className={"col-sm-4"} >
          <h3 className="book-row-title" >SAVED</h3>
          <div className="row book-row">
            <SavedJobs/>
          </div>

          <h3 className="book-row-title" >APPLIED TO</h3>
          <div className="row book-row">
            <AppliedTo/>
          </div>
        </div> */}

      </div>



      {/* <div className="book-row-section">
        <h3 className="book-row-title" >SAVED</h3>
        <div className="row book-row">
          <SavedJobs/>
        </div>
      </div> */}


    </div>
  )
}