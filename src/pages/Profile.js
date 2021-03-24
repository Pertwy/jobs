import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "./AddList.css"

export default function Profile(){
  const [userData, setUserData] = useState({
    givenName:"",
    surname:"",
    email:"",
    appliedTo:[{title:"", salary:"", _id:""}],
    savedJobs:[{title:"", salary:"", _id:""}]
  })


  useEffect(() => {
    try {
      axios.get('http://localhost:5000/users/')
        //.then(response => (console.log(response.data)))
        .then(response => setUserData(response.data))

    } catch (error) {
      console.log(error)
    }
  },[])


  //Display applied to jobs
  function AppliedTo() {
    return userData.appliedTo.map(currentJobPost => {

      const {title, description, salary, company, location, tags, industry, remote, easyApplyBool, coverLetterBool, applyOnCompanySiteBool, applyOnCompanySiteLink, type, _id} = currentJobPost
      return (

        <section key={_id} >
            
            <Link className="link" to={"/jobPosts/"+_id}>
              <div className="p-3">
                <h3>{title}</h3>
                <h3>£{salary}</h3>
              </div>
            </Link>
            
        </section>
      )
    })
  }


  //Display applied to jobs
  function SavedJobs() {
    return userData.savedJobs.map(currentJobPost => {

      const {title, description, salary, company, location, tags, industry, remote, easyApplyBool, coverLetterBool, applyOnCompanySiteBool, applyOnCompanySiteLink, type, _id} = currentJobPost
      return (

        <section key={_id} >
            
            <Link className="link" to={"/jobPosts/"+_id}>
              <div className="p-3">
                <h3>{title}</h3>
                <h3>£{salary}</h3>
              </div>
            </Link>
            
        </section>
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
        
        <div className={"col-sm-8"} >
        <h3 className="book-row-title" >About Me</h3>
        </div>

        <div className={"col-sm-4"} >
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