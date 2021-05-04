import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import JobPostFrontPage from "../components/JobPostFrontPage"

export default function JobSearch(){

  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [jobPostList, setJobPostList] = useState([])



  useEffect(() => {
    
    try {
      axios.get(`/api/jobPosts/`)
      .then(response => (setJobPostList(response.data)))

    } catch (error) {
      console.log("Could not get job posts")
    }
    
  },[currentUser])



  //Display all jobs
  function JobList() {
    return jobPostList && jobPostList.map(currentJobPost => {
      return (
        <JobPostFrontPage props={currentJobPost}/>
      )
    })
  }


  return (
    <div>
            <div className="container mt-5 mb-5 ">
          <h2 className="book-row-title pb-5">OPEN POSITONS</h2>
          <div className="row d-flex justify-content-between">
            <JobList/>
          </div>
      </div>
    </div>
  )
}
