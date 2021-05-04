import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import JobPostFrontPage from "../components/JobPostFrontPage"
import {useHistory} from 'react-router-dom';

export default function HomePage(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [jobPostList, setJobPostList] = useState([])
  const [listSize, setListSize] = useState(6)
  const [postCode, setPostCode] = useState("")
  const [job, setJob] = useState("")
  const [salary, setSalary] = useState("")

console.log(process.env.NODE_ENV);

  useEffect(() => {
    
    try {
      axios.get(`/api/jobPosts/`)
      .then(response => (setJobPostList(response.data)))

    } catch (error) {
      console.log("Could not get job posts")
    }
    
  },[currentUser])



  const history = useHistory();

  function moveToSearch(){    
    history.push("/jobSearch")
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
            <h3>Find jobs with environmental accreditations</h3>
            
            <Button onClick={()=>moveToSearch()} variant="outlined">
              search
            </Button>

          </div>
        </div>
      </div>

    </div>
  )
}
