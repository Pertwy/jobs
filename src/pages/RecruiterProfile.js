import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddList.css"


export default function RecruiterProfile(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [update, setUpdate] = useState(0)



  useEffect(() => {
    console.log(currentUser)
    if(currentUser){
      let email = {"email":currentUser}
      axios.post('/api/testusers/',email)
        .then(response => (setUserData(response.data)))
        .then(console.log(userData))
    }
    else{
      axios.get('/api/books/')
        .then(response => (setBooks(response.data)))
    }
  },[currentUser, update])




  
 
  return (
    <div className="container">

      <div className="py-5 row container-fluid">
        
        <div className="col-sm-5 row">
          <h1 className="pr-5">Photo</h1>

          <div>
            <h4>Email: {userData.email}</h4>
            <h4>Bio: {userData.bio}</h4>
          </div>
        </div>

      </div>




    </div>
  )
}