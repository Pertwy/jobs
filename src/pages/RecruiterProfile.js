import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
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
      axios.post('http://localhost:5000/testusers/',email)
        .then(response => (setUserData(response.data)))
        .then(console.log(userData))
    }
    else{
      axios.get('http://localhost:5000/books/')
        .then(response => (setBooks(response.data)))
    }
  },[currentUser, update])




  function BookList(books) {
    return (books.books.map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
          <Link className="link" to={"/book/"+_id}>
            <img className="card-img-top" src={image} alt={title}></img>
          </Link>

        </section>
      )
    })
  )}

 
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
        <h3 className="book-row-title" >BOOKS I'VE READ</h3>
        <div className="row book-row">
          <BookList books={userData.books} type="books"/>
        </div>
      </div>


    </div>
  )
}