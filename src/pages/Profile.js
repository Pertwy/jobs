import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "./AddList.css"

export default function Profile(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [update, setUpdate] = useState(0)



  useEffect(() => {
    console.log(currentUser)

    try {
      axios.post('http://localhost:5000/users/')
        .then(response => (setUserData(response.data)))
        .then(console.log(userData))
    } catch (error) {
      console.log(error)
    }

  
  },[currentUser, update])




 
  return (
    <div className="container">
      <UserDropDown setEmail={setCurrentUser}/>

      <div className="py-5 row container-fluid">
        
        <div className="col-sm-5 row">
          <h1 className="pr-5">Photo</h1>

          <div>
            <h4>Name: {userData.name}</h4>
            <h4>Email: {userData.email}</h4>
            <h4>Bio: {userData.bio}</h4>
          </div>
        </div>

      </div>



      <div className="book-row-section">
        <h3 className="book-row-title" >APPLIED TO</h3>
        <div className="row book-row">
          {/* jobs */}
        </div>
      </div>

      <div className="book-row-section">
        <h3 className="book-row-title" >SAVED</h3>
        <div className="row book-row">
          {/* jobs */}
        </div>
      </div>


    </div>
  )
}