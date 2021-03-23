import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";



export default function HomePage(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [jobPostList, setJobPostList] = useState([])
  const [listSize, setListSize] = useState(6)



  useEffect(() => {
    
    try {
      axios.get("http://localhost:5000/jobPosts/")
      //.then(response => console.log(response.data))
      .then(response => (setJobPostList(response.data)))

    } catch (error) {
      console.log("Could not get job posts")
    }
    
  },[currentUser])



  //Display all jobs
  function JobList() {
    return jobPostList.map(currentJobPost => {

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
    <div>

      <div className="container">

        <div className="container">
          <h2 className="book-row-title">OPEN POSITONS</h2>
          <div className="row d-flex justify-content-between">
            <JobList/>
          </div>
        </div>

      </div>
    </div>
  )
}