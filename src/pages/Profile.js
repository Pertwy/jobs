import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "./AddList.css"

export default function Profile(){
  const [userData, setUserData] = useState({
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

        <section className="col-sm-4" key={_id} >
            
            <Link className="link" to={"/jobPosts/"+_id}>
              <div className="border p-3">
                <h1>{title}</h1>
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

        <section className="col-sm-4" key={_id} >
            
            <Link className="link" to={"/jobPosts/"+_id}>
              <div className="border p-3">
                <h1>{title}</h1>
                <h3>£{salary}</h3>
              </div>
            </Link>
            
        </section>
      )
    })
  }




 
  return (
    <div className="container">

      <div className="py-5 row container-fluid">
        <div className="col-sm-5 row">
          <h1 className="pr-5">Photo</h1>

          <div>
            <h4>Name: {userData.givenName} {userData.surname}</h4>
            <h4>Email: {userData.email}</h4>
          </div>
        </div>

      </div>



      <div className="book-row-section">
        <h3 className="book-row-title" >APPLIED TO</h3>
        <div className="row book-row">
          <AppliedTo/>
        </div>
      </div>

      <div className="book-row-section">
        <h3 className="book-row-title" >SAVED</h3>
        <div className="row book-row">
          <SavedJobs/>
        </div>
      </div>


    </div>
  )
}