import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function ViewBookClub(props){
  const [bookclub, setBookclub] = useState({})  

  useEffect(() => {
    axios.get("http://localhost:5000/bookclub/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBookclub(response.data)))
  },[])




  return (
    <div>

      <div className="content">
        <h1>Hello books</h1>
        <h2>{bookclub}</h2>

      </div>
    </div>
  )
}