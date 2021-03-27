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
    email:"",
    appliedTo:[],
    savedJobs:[],
    summary:"",
    photo:"",
    CV:"",
    location:"",
    phoneNumber:"",
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
  const [givenName, setGivenName] = useState("")
  const [surname, setSurname] = useState("")
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

            <section className={"main-info" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Name</h4>
              <p>headline</p>
              <p>Location</p>
              <p>email</p>
              <p>phone number</p>
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