import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

export default function UserDropDown(props) {
  const [lists, setLists] = useState([]);
  const [list, setList] = useState("");
  const BASE_URL =
    process.env.NODE_ENV == "production"
      ? "https://jobbored-jps.herokuapp.com"
      : "http://localhost:5000";
  console.log(BASE_URL);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/testusers/lists`)
      .then((response) => {
        setLists(response.data);
      })
      //.then(console.log(users))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(target) {
    props.setEmail(target);
    setList(target);
  }

  return (
    <div>
      <label>Choose a list</label>
      <select
        required
        className="form-control"
        value={list}
        onChange={({ target }) => handleChange(target.value)}
      >
        {lists.map((list) => {
          return <option value={list.name}>{list.name}</option>;
        })}
      </select>
    </div>
  );
}
