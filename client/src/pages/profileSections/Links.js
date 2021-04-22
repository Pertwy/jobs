import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Links(props){

  const [expandLinks, setExpandLinks] = useState(false)
  const [newLink, setNewLink] = useState("")


//Links /////////////////////////////////
let Links
if(props.props.links.length > 0){
  Links =<><LinkMap></LinkMap></>
  }else{Links = <><LinkMap></LinkMap></>}
  
let LinkInput
if(expandLinks){
  LinkInput =
    <>
      <div className={"row pl-3 pr-3 space-between"}>
        <TextField  onChange={({ target }) =>     
          setNewLink(target.value)} id="standard-basic" label="New Link" />
        <div className={"row pr-3"}>
          <button onClick={()=>handleAddNewLink()}>Save</button>
          <button onClick={()=>handleCancelLink()}>Cancel</button>
        </div>
      </div>
    </>
} else{ LinkInput = <></>}



  function LinkMap(){
    return props.props.links.map(link => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{link}</p>
          <button onClick={()=>handleDeleteLink(link)}>delete</button>
        </div>
      )
    })
  }

  function handleDeleteLink(prop){

    let info = {"email":"test@email.cm", "title":prop}

    try {
      axios.post(`/api/users/deletelink`, info)
        .then(response => (console.log(response.data)))
        // .then(response => setUserData(response.data))
    } catch (error) {
      console.log(error)
    }

    const lang = props.props.links.filter(link => link !== prop);
    props.setUserData({...props.props, links:lang})
  }




  function handleAddLink(){
    setExpandLinks(!expandLinks)
  }


  function handleAddNewLink(){

    let info = {"email":"test@email.cm", "link":newLink}

    try {
      axios.post(`/api/users/addlink`, info)
        .then(response => (console.log(response.data)))
        // .then(response => setUserData(response.data))
    } catch (error) {
      console.log(error)
    }

    let newLinkNow = props.props.links
    newLinkNow.push(newLink)
    props.setUserData({...props.props, links:newLinkNow})

    setExpandLinks(false)
    setNewLink("")
  }


  function handleCancelLink(){
    setNewLink("")
    setExpandLinks(!expandLinks)
  }


  return (
    <div>
      <section className={"personal-details" }>
        <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
          <h4> Links</h4>
          <button onClick={() => handleAddLink()}> + </button>
        </div>
        {Links}
        {LinkInput}
      </section>
    </div>
  )
}
