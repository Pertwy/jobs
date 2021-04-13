import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import JobPostFrontPage from "../components/JobPostFrontPage"

export default function HomePage(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [jobPostList, setJobPostList] = useState([])
  const [listSize, setListSize] = useState(6)
  const [postCode, setPostCode] = useState("")
  const [job, setJob] = useState("")
  const [salary, setSalary] = useState("")
  const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://jobbored-jps.herokuapp.com/"
    : "http://localhost:5000";  



  useEffect(() => {
    
    try {
      axios.get(`{BASE_URL}/api/jobPosts/`)
      //.then(response => console.log(response.data))
      .then(response => (setJobPostList(response.data)))

    } catch (error) {
      console.log("Could not get job posts")
    }
    
  },[currentUser])



  //Display all jobs
  function JobList() {
    return jobPostList.map(currentJobPost => {
      return (
        <JobPostFrontPage props={currentJobPost}/>
      )
    })
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    input:{
      display:"inline-block",
      margin:"10px"
    }
  }));

  const classes = useStyles();


  return (
    <div>
      
      <div id="example-box">
        <div id="example1">
          <div className="central-box">
            <h3>Find your dream job and let's move on</h3>
            
            <form className={classes.root, "col-sm-6"} noValidate autoComplete="off" >

              {/* <div className={"col-sm-3"}>...</div> */}

              <TextField className={"col-sm-3 form-text"} id="standard-search" label="Job" type="search" 
                          onChange={({ target }) => setJob(target.value)} />


              <TextField className={"col-sm-3 form-text"} id="standard-search" onChange={({ target }) =>     
                    setPostCode(target.value)} label="Post Code" />

              <TextField className={"col-sm-3 form-text"} id="standard-search" onChange={({ target }) =>     
                    setSalary(target.value)} label="Salary" />

              {/* <Button onClick={() => handleLogin()} variant="outlined">
                Log in
              </Button> */}
            </form>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5 ">
          <h2 className="book-row-title pb-5">OPEN POSITONS</h2>
          <div className="row d-flex justify-content-between">
            <JobList/>
          </div>
      </div>
    </div>
  )
}