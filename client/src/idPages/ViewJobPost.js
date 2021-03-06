import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function ViewJobPost(props){
  const [jobPost, setJobPost] = useState({})  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [review, setReview] = useState("")
  const [value, setValue] = useState("");
  const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://jobbored-jps.herokuapp.com"
    : "http://localhost:5000";

    console.log(BASE_URL);
  useEffect(() => {
    axios.get(`/api/jobPosts/`+props.location.pathname.replace("/jobPosts/", ""))
      .then(response => (setJobPost(response.data)))
      //.then(response => (console.log(response.data)))
      
  },[])


  function handleApply(){

    let jobID = {
      "job":props.location.pathname.replace("/jobPosts/", "")
    }
    axios.post(`/api/users/apply`, jobID)
      .then(response => console.log(response))
  }


  function handleSave(){

    let jobID = {
      "job":props.location.pathname.replace("/jobPosts/", "")
    }
    axios.post(`/api/users/save`, jobID)
      .then(response => console.log(response))
  }

  let creditOne
  if(jobPost.credit1){
    creditOne=<div className="credit red"></div>
  }else{creditOne=<></>}

  let creditTwo
  if(jobPost.credit2){
    creditTwo=<div className="credit blue"></div>
  }else{creditTwo=<></>}

  let creditThree
  if(jobPost.credit3){
    creditThree=<div className="credit yellow"></div>
  }else{creditThree=<></>}

  return (
    <div >
      <div  className="container shadow-lg p-4 mb-4 bg-white">

      <h1>{jobPost.title}</h1>
      <h3>Salary: {jobPost.salary}</h3>

      <div className="row">
        {creditOne} {creditTwo} {creditThree}
      </div>

      <div>
        {jobPost.description}
      </div>

      <div>
        <h5>Company: {jobPost.company}</h5>
        <h5>Location: {jobPost.location}</h5>
        
        <h5>Industry: {jobPost.industry}</h5>
        <h5>{jobPost.remote}</h5>
        <h5>Easy apply? {jobPost.easyApplyBool}</h5>
        <h5>Cover Letter Needed? {jobPost.coverLetterBool}</h5>
        <h5>Apply on Company site? {jobPost.applyOnCompanySiteBool}</h5>
        <h5>Company site Link: {jobPost.applyOnCompanySiteLink}</h5>
        <h5>Type: {jobPost.type}</h5>
      </div>
      <button onClick={()=>handleSave()}>SAVE</button>
      <button onClick={()=>handleApply()}>APPLY</button>

      {/* {jobPost.tags} */}

      {/* <UserDropDown setEmail={setCurrentUser}/> */}


      {/* <div className="content">
        <h2>{jobPost.title}</h2>
        <h3>{jobPost.author}</h3>
        <h4>Number of times read {jobPost.numberOfTimesRead}</h4>
        <h4>Number of times favorited {jobPost.numberOfTimesFavorited}</h4>
        <img src={jobPost.image} alt={jobPost.title}></img>
        

      </div> */}

      </div>
    </div>
  )
}