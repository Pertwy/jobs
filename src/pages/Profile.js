import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddList.css"
import JobPostProfile from "../components/JobPostProfile"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import WorkExperience from "./profileSections/WorkExperience"
import Education from "./profileSections/Education"
import MilitaryService from "./profileSections/MilitaryService"
import BasicInfo from "./profileSections/BasicInfo"

export default function Profile(){
  const [userData, setUserData] = useState({
    givenName:"john",
    surname:"perkins",
    email:"j@gmail",
    headline:"",
    appliedTo:[],
    savedJobs:[],
    summary:"",
    photo:"",
    CV:"",
    location:"london",
    phoneNumber:"0121",
    elegibleUK:"Y",
    highestLevelOfDegree:"Y",
    industry:[],
    workExperience:[],
    militaryService:[],
    education:[],
    skills:[{title:"skill1"},{title:"skill2"}],
    links:["link1", "Link2"],
    additionalInformation:"",
    languages:["Spanish", "English"],
  })
  const [expandPersonalDetails, setExpandPersonalDetails] = useState(true)



  const [expandSkills, setExpandSkills] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const [expandLinks, setExpandLinks] = useState(false)
  const [newLink, setNewLink] = useState("")

  const [expandLanguages, setExpandLanguages] = useState(false)
  const [newLanguage, setNewLanguage] = useState("")

  const [highestLevelOfDegree, setHighestLevelOfDegree] = useState("")
  const [elegibleUK, setElegibleUK] = useState("")


  // useEffect(() => {
  //   try {
  //     axios.get('http://localhost:5000/users/')
  //       //.then(response => (console.log(response.data)))
  //       .then(response => setUserData(response.data))

  //   } catch (error) {
  //     console.log(error)
  //   }
  // },[])


  //Display applied to jobs
  function AppliedTo() {
    return userData.appliedTo.map(currentJobPost => {
      return (
        <JobPostProfile props={currentJobPost}/>
      )
    })
  }


  //Display applied to jobs
  function SavedJobs() {
      return userData.appliedTo.map(currentJobPost => {
        return (
          <JobPostProfile props={currentJobPost}/>
        )
      })
  }


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

//Personal Details ///////////////////////////////////////////////
  function handleExpandPersonalDetails(){
    setExpandPersonalDetails(!expandPersonalDetails)
  }

  function handleSavePersonalDetails(){
    if(elegibleUK){
      setUserData({...userData, elegibleUK:elegibleUK})
    }
    if(highestLevelOfDegree){
      setUserData({...userData, highestLevelOfDegree:highestLevelOfDegree})
    }
    setExpandPersonalDetails(!expandPersonalDetails)
  }

  function handleCancelPersonalDetails(){
    setElegibleUK("")
    setHighestLevelOfDegree("")
    setExpandPersonalDetails(!expandPersonalDetails)
  }

  let PersonalDetails 
  if(expandPersonalDetails){
    PersonalDetails =
      <>
        {userData.elegibleUK && <p>Eligible to Work in the UK: {userData.elegibleUK}</p>}
        {userData.highestLevelOfDegree && <p>Highest level of education: {userData.highestLevelOfDegree}</p>}
        {userData.industry.length > 0  && <p>Industry</p>}
      </>
    } else{
      PersonalDetails = <>
            <TextField fullWidth  onChange={({ target }) =>     
                  setElegibleUK(target.value)} id="standard-basic" label="Eligible to work in the UK" placeholder={userData.elegibleUK}/>

            <TextField fullWidth  onChange={({ target }) =>     
                  setHighestLevelOfDegree(target.value)} id="standard-basic" label="Highest Level of Degree" placeholder={userData.highestLevelOfDegree}/>

            <Button onClick={()=>handleSavePersonalDetails()} variant="outlined">
              Save Changes
            </Button>
            <Button onClick={()=>handleCancelPersonalDetails()} variant="outlined">
              Cancel
            </Button>

      </>    }




//Skills /////////////////////////////////
let Skills
if(userData.skills.length > 0 && !expandSkills){
  Skills =
    <>
      <SkillMap></SkillMap>
    </>
  } else if(userData.skills.length > 0 && expandSkills){
    Skills =
    <>
      <SkillMap></SkillMap>
      <div className={"row pl-3 pr-3 space-between"}>
        <TextField  onChange={({ target }) =>     
          setNewSkill(target.value)} id="standard-basic" label="New Skill" />
        <div className={"row pr-3"}>
          <button onClick={()=>handleAddNewSkill()}>Save</button>
          <button onClick={()=>handleCancelSkill()}>Cancel</button>
        </div>
      </div>
    </>
  } else{
    Skills = <>
    </>}

  function SkillMap(){
    return userData.skills.map(skill => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{skill.title}</p>
          <button onClick={()=>handleDeleteSkill(skill.title)}>delete</button>
        </div>
      )
    })
  }

  function handleDeleteSkill(prop){
    const skill = userData.skills.filter(skill => skill.title !== prop);
    setUserData({...userData, skills:skill})
}

  function handleAddSkill(){
    setExpandSkills(!expandSkills)
  }

  function handleAddNewSkill(){
    let newSkillNow = userData.skills
    newSkillNow.push({"title":newSkill})
    setUserData({...userData, skills:newSkillNow})
  }

  function handleCancelSkill(){
    setNewSkill("")
    setExpandSkills(!expandSkills)
  }
  

//Links /////////////////////////////////
let Links
if(userData.links.length > 0 && !expandLinks){
  Links =
    <>
      <LinkMap></LinkMap>
    </>
  } else if(userData.links.length > 0 && expandLinks){
    Links =
    <>
      <LinkMap></LinkMap>
      <div className={"row pl-3 pr-3 space-between"}>
        <TextField  onChange={({ target }) =>     
          setNewLink(target.value)} id="standard-basic" label="New Link" />
        <div className={"row pr-3"}>
          <button onClick={()=>handleAddNewLink()}>Save</button>
          <button onClick={()=>handleCancelLink()}>Cancel</button>
        </div>
      </div>
    </>
  } else{
    Links = <>
    </>}

  function LinkMap(){
    return userData.links.map(link => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{link}</p>
          <button onClick={()=>handleDeleteLink(link)}>delete</button>
        </div>
      )
    })
  }

  function handleDeleteLink(prop){
    const lang = userData.links.filter(link => link !== prop);
    setUserData({...userData, links:lang})
  }

  function handleAddLink(){
    setExpandLinks(!expandLinks)
  }
  function handleAddNewLink(){
    let newLinkNow = userData.links
    newLinkNow.push(newLink)
    setUserData({...userData, links:newLinkNow})
  }
  function handleCancelLink(){
    setNewLink("")
    setExpandLinks(!expandLinks)
  }


//Languaes /////////////////////////////////
let Languages
if(userData.languages.length > 0 && !expandLanguages){
  Languages =
    <>
      <LanguageMap></LanguageMap>
    </>
  } else if(userData.languages.length > 0 && expandLanguages){
    Languages =
    <>
      <LanguageMap></LanguageMap>
      <div className={"row pl-3 pr-3 space-between"}>
        <TextField  onChange={({ target }) =>     
          setNewLanguage(target.value)} id="standard-basic" label="New Language" />
        <div className={"row pr-3"}>
          <button onClick={()=>handleAddNewLanguage()}>Save</button>
          <button onClick={()=>handleCancelLanguage()}>Cancel</button>
        </div>
      </div>
    </>
  } else{
    Languages = <>
    </>}

  function LanguageMap(){
    return userData.languages.map(language => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{language}</p>
          <button onClick={()=>handleDeleteLanguage(language)}>delete</button>
        </div>
      )
    })
  }

  function handleDeleteLanguage(prop){
      const lang = userData.languages.filter(lang => lang !== prop);
      setUserData({...userData, languages:lang})
  }

  function handleAddLanguage(){
    setExpandLanguages(!expandLanguages)
  }
  function handleAddNewLanguage(){
    let newLanguageNow = userData.languages
    newLanguageNow.push(newLanguage)
    setUserData({...userData, languages:newLanguageNow})
  }
  function handleCancelLanguage(){
    setNewLanguage("")
    setExpandLanguages(!expandLanguages)
  }



  return (
    <div className="container">


      <div className="row container-fluid">
          <div className="mb-4">
            <h4>{capitalizeFirstLetter(userData.givenName)} {capitalizeFirstLetter(userData.surname)} - {userData.email}</h4>
            <h5>Location</h5>
          </div>
      </div>
      

      <div className="row container-fluid">
        
        <div className={"col-sm-12"} >
          <div className={"border  p-3"}>


            <BasicInfo props={userData} setUserData={setUserData}></BasicInfo>


            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Personal Details</h4>
                <button onClick={() => handleExpandPersonalDetails()}>Edit</button>
              </div>
              {PersonalDetails}
            </section>

            <WorkExperience props={userData} setUserData={setUserData}></WorkExperience>

            <Education props={userData} setUserData={setUserData}></Education>

            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4> Skills</h4>
                <button onClick={() => handleAddSkill()}> + </button>
              </div>
              {Skills}
            </section>

            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4> Links</h4>
                <button onClick={() => handleAddLink()}> + </button>
              </div>
              {Links}
            </section>

            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4> Languages</h4>
                <button onClick={() => handleAddLanguage()}> + </button>
              </div>
              {Languages}
            </section>

            <MilitaryService props={userData} setUserData={setUserData}></MilitaryService>

            


          </div>
        </div>

        {/* <div className={"col-sm-4"} >
          <h3 className="book-row-title" >SAVED</h3>
          <div className="row book-row">
            <SavedJobs/>
          </div>

          <h3 className="book-row-title" >APPLIED TO</h3>
          <div className="row book-row">
            <AppliedTo/>
          </div>
        </div> */}

      </div>



      {/* <div className="book-row-section">
        <h3 className="book-row-title" >SAVED</h3>
        <div className="row book-row">
          <SavedJobs/>
        </div>
      </div> */}


    </div>
  )
}