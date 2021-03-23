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

  useEffect(() => {
    axios.get("http://localhost:5000/jobPosts/"+props.location.pathname.replace("/jobPosts/", ""))
      .then(response => (setJobPost(response.data)))
      //.then(response => (console.log(response.data)))
      
  },[])


  function handleApply(){

    let jobID = {
      "job":props.location.pathname.replace("/jobPosts/", "")
    }
    axios.post("http://localhost:5000/users/apply", jobID)
      .then(response => console.log(response))
  }


  function handleSave(){

    let jobID = {
      "job":props.location.pathname.replace("/jobPosts/", "")
    }
    axios.post("http://localhost:5000/users/save", jobID)
      .then(response => console.log(response))
  }



  return (
    <div>

      <h1>{jobPost.title}</h1>
      <h3>Salary: {jobPost.salary}</h3>
      <p>{jobPost.description}</p>
      <br></br>
      <br></br>
      <br></br>
      
      <h5>Company: {jobPost.company}</h5>
      <h5>Location: {jobPost.location}</h5>
      
      <h5>Industry: {jobPost.industry}</h5>
      <h5>{jobPost.remote}</h5>
      <h5>Easy apply? {jobPost.easyApplyBool}</h5>
      <h5>Cover Letter Needed? {jobPost.coverLetterBool}</h5>
      <h5>Apply on Company site? {jobPost.applyOnCompanySiteBool}</h5>
      <h5>Company site Link: {jobPost.applyOnCompanySiteLink}</h5>
      <h5>Type: {jobPost.type}</h5>

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
  )
}