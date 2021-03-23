import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function ViewJobPost(props){
  const [book, setBook] = useState({})  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [review, setReview] = useState("")
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/jobPosts/"+props.location.pathname.replace("/jobPosts/", ""))
      .then(response => (setBook(response.data)))
      
  },[])


    const handleChange = (event) => {
      setValue(event.target.value);
    };
  

  return (
    <div>

      <UserDropDown setEmail={setCurrentUser}/>

      <div className="content">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <h4>Number of times read {book.numberOfTimesRead}</h4>
        <h4>Number of times favorited {book.numberOfTimesFavorited}</h4>
        {/* <h4>Number of reviews {book.reviews.length}</h4> */}
        <img src={book.image} alt={book.title}></img>
        

        {/* {book.reviews &&(
          <div>
            <h2>Reviews</h2>
            <Reviews/>
          </div>
        )} */}

{/* //numberOfTimesRead
//rating */}

      </div>
    </div>
  )
}