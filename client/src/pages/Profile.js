import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddList.css"
import JobPostProfile from "../components/JobPostProfile"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import WorkExperience from "./profileSections/WorkExperience"
import Education from "./profileSections/Education"
import MilitaryService from "./profileSections/MilitaryService"
import BasicInfo from "./profileSections/BasicInfo"
import PersonalDetails from "./profileSections/PersonalDetails"
import Links from "./profileSections/Links"
import Languages from "./profileSections/Languages"
import Skills from "./profileSections/Skills"
import { EmailRounded } from '@material-ui/icons';

export default function Profile(){
  const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://jobbored-jps.herokuapp.com"
    : "http://localhost:5000";  

  const [currentUser, setCurrentUser] = useState("test@email.cm")

  const [userData, setUserData] = useState({
    givenName:"john",
    surname:"perkins",
    email:"test@email.cm",
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
    education:[],
    skills:[{title:"skill1", proficiency:"v good"},{title:"skill2", proficiency:"not so good"}],
    links:["link1", "Link2"],
    additionalInformation:"",
    languages:[{title:"English", proficiency:"v good"},{title:"Spanish", proficiency:"not so good"}],
  })
  
 
  useEffect(() => {
    let email = {"email":currentUser}
    try {
      axios.post(`/api/users/getuserdetails`, email)
        //.then(response => (console.log(response.data)))
        .then(response => setUserData(response.data))

    } catch (error) {
      console.log(error)
    }
  },[])


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
          <div className={"border  p-4"}>


            <BasicInfo props={userData} setUserData={setUserData}></BasicInfo>

            <section className={"pt-4"}>
              <PersonalDetails props={userData} setUserData={setUserData}></PersonalDetails>
            </section>

            <section className={"pt-4"}>
              <WorkExperience props={userData} setUserData={setUserData}></WorkExperience>
            </section>


            <section className={"pt-4"}>
              <Education props={userData} setUserData={setUserData}></Education>
            </section>

            <section className={"pt-4"}>
              <Skills props={userData} setUserData={setUserData}></Skills>
            </section>

            <section className={"pt-4"}>
              <Languages props={userData} setUserData={setUserData}></Languages>
            </section>

            <section className={"pt-4"}>
              <Links props={userData} setUserData={setUserData}></Links>
            </section>

            <section className={"pt-4"}>
              <MilitaryService props={userData} setUserData={setUserData}></MilitaryService>
            </section>
          
          </div>
        </div>

        <div className={"col-sm-4 col-md-12"} >
          <h3 className="book-row-title" >SAVED</h3>
          <div className="row book-row">
            <SavedJobs/>
          </div>

          <h3 className="book-row-title" >APPLIED TO</h3>
          <div className="row book-row">
            <AppliedTo/>
          </div>
        </div>

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