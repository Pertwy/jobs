import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";



export default function HomePage(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [adminLists, setAdminLists] = useState([])
  const [listSize, setListSize] = useState(6)



  useEffect(() => {
    axios.get("http://localhost:5000/lists/admin")
      .then(response => (setAdminLists(response.data)))

    if(currentUser){
      let email = {"email":currentUser}
      axios.post('http://localhost:5000/testusers/',email)
        .then(response => (setUserData(response.data)))
      
      // console.log(userData.following)
    }
    else{
      axios.get('http://localhost:5000/books/')
        .then(response => (setUserData(response.data)))
    }
  },[currentUser])



  //Display all jobs
  function JobList() {
    return (userData.books.slice(0, listSize).map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
            <Link to={"/book/"+_id}>
              <img className="card-img-top" src={image} alt={title}></img>
            </Link>
        </section>
      )
    })
  )}

  return (
    <div>

      <div className="container">

        <div className="book-row-section">
          <h2 className="book-row-title">OPEN POSITONS</h2>
          <div className="row book-row">
            <JobList/>
          </div>
        </div>

      </div>
    </div>
  )
}