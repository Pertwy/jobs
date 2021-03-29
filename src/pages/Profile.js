import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddList.css"
import JobPostProfile from "../components/JobPostProfile"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {produce} from "immer"
import { LensTwoTone } from '@material-ui/icons';

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
    eduction:[],
    skills:[{title:"skill1"},{title:"skill2"}],
    links:["link1", "Link2"],
    additionalInformation:"",
    languages:["Spanish", "English"],
  })
  const [expandPersonalDetails, setExpandPersonalDetails] = useState(true)
  const [expandBasicInfo, setExpandBasicInfo] = useState(true)

  const [givenName, setGivenName] = useState("")
  const [surname, setSurname] = useState("")
  const [headline, setHeadline] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [expandWorkExperience, setExpandWorkExperience] = useState(false)
  const [WEJobTitle, setWEJobTilte] = useState("")
  const [WECompany, setWECompany] = useState("")
  const [WELocation, setWELocation] = useState("")
  const [WEStartDate, setWEStartDate] = useState("")
  const [WEEndDate, setWEEndDate] = useState("")
  const [WEDescription, setWEDescription] = useState("")

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


//Work Experience ///////////////////////////////////////////////
function handleExpandWorkExperience(){
  setExpandWorkExperience(!expandWorkExperience)
}

function handleSaveWorkExperience(){
  let newWorkExperience = userData.workExperience
  newWorkExperience.push({
    jobTitle:WEJobTitle,
    company:WECompany,
    location:WELocation,
    startDate:WEStartDate,
    endDate:WEEndDate,
    description:WEDescription
  })
  setUserData({...userData, workExperience:newWorkExperience})
}


function handleCancelWorkExperience(){
  setWEJobTilte("")
  setWECompany("")
  setWELocation("")
  setWEStartDate("")
  setWEEndDate("")
  setWEDescription("")
  setExpandWorkExperience(!expandWorkExperience)
}



let WorkExperience
if(userData.workExperience.length > 0 && !expandWorkExperience){
  WorkExperience =
    <>
      <WorkExperienceMap></WorkExperienceMap>
    </>
  } else if(userData.workExperience.length > 0 && expandWorkExperience){
    WorkExperience =
    <>
      <WorkExperienceMap></WorkExperienceMap>
      <>
        <TextField fullWidth  onChange={({ target }) =>     
              setWEJobTilte(target.value)} id="standard-basic" label="Job Title" />

        <TextField fullWidth  onChange={({ target }) =>     
              setWECompany(target.value)} id="standard-basic" label="Company"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setWELocation(target.value)} id="standard-basic" label="Location" />

        <TextField fullWidth  onChange={({ target }) =>     
              setWEStartDate(target.value)} id="standard-basic" label="Start Date"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setWEEndDate(target.value)} id="standard-basic" label="End Date"/>  

        <TextField fullWidth  onChange={({ target }) =>     
              setWEDescription(target.value)} id="standard-basic" label="Description"/>         

        

        <Button onClick={()=>handleSaveWorkExperience()} variant="outlined">
          Save Changes
        </Button>
        <Button onClick={()=>handleCancelWorkExperience()} variant="outlined">
          Cancel
        </Button>
      </>
    </>
  } else if(userData.workExperience.length == 0 && expandWorkExperience){
    WorkExperience =
      <>
        <TextField fullWidth  onChange={({ target }) =>     
              setWEJobTilte(target.value)} id="standard-basic" label="Job Title" />

        <TextField fullWidth  onChange={({ target }) =>     
              setWECompany(target.value)} id="standard-basic" label="Company"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setWELocation(target.value)} id="standard-basic" label="Location" />

        <TextField fullWidth  onChange={({ target }) =>     
              setWEStartDate(target.value)} id="standard-basic" label="Start Date"/>

        <TextField fullWidth  onChange={({ target }) =>     
              setWEEndDate(target.value)} id="standard-basic" label="End Date"/>  

        <TextField fullWidth  onChange={({ target }) =>     
              setWEDescription(target.value)} id="standard-basic" label="Description"/>         

        

        <Button onClick={()=>handleSaveWorkExperience()} variant="outlined">
          Save Changes
        </Button>
        <Button onClick={()=>handleCancelWorkExperience()} variant="outlined">
          Cancel
        </Button>
   </>
 
  } else{
    WorkExperience = <></>
  }


    function WorkExperienceMap(){
      return userData.workExperience.map(WorkExperience => {
        return (
          <div className={"row space-between pl-3 pr-3"}>
            <p>{WorkExperience.jobTitle}</p>
            <p>{WorkExperience.company}</p>
            <p>{WorkExperience.location}</p>
            <p>{WorkExperience.startDate}</p>
            <p>{WorkExperience.endDate}</p>
            <p>{WorkExperience.description}</p>
      
            <button onClick={()=>console.log("delete this Work Experience")}>delete</button>
          </div>
        )
      })
    }



//Basic Info ///////////////////////////////////////////////
function handleExpandBasicInfo(){
  setExpandBasicInfo(!expandBasicInfo)
}

function handleSaveBasicInfo(){
  if(givenName){
    setUserData({...userData, givenName:givenName})
  }
  if(surname){
    setUserData({...userData, surname:surname})
  }
  if(location){
    setUserData({...userData, location:location})
  }
  if(email){
    setUserData({...userData, email:email})
  }
  if(phoneNumber){
    setUserData({...userData, phoneNumber:phoneNumber})
  }

  setExpandBasicInfo(!expandBasicInfo)
}

function handleCancelBasicInfo(){
  setGivenName("")
  setSurname("")
  setHeadline("")
  setEmail("")
  setPhoneNumber("")
  setExpandBasicInfo(!expandBasicInfo)
}

let BasicInfo 
if(expandBasicInfo){
  BasicInfo =
    <>
      {userData.givenName && <p>Given Name: {userData.givenName}</p>}
      {userData.surname && <p>Surname: {userData.surname}</p>}
      {userData.headline && <p>Headline: {userData.headline}</p>}
      {userData.location && <p>Location: {userData.location}</p>}
      {userData.email && <p>Email: {userData.email}</p>}
      {userData.phoneNumber && <p>Phone Number: {userData.phoneNumber}</p>}
    </>
  } else{
    BasicInfo = <>
          <TextField fullWidth  onChange={({ target }) =>     
                setGivenName(target.value)} id="standard-basic" label="Given Name" placeholder={userData.givenName}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setSurname(target.value)} id="standard-basic" label="Surname" placeholder={userData.surname}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setHeadline(target.value)} id="standard-basic" label="Headline" placeholder={userData.headline}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setLocation(target.value)} id="standard-basic" label="Location" placeholder={userData.location}/>  

          <TextField fullWidth  onChange={({ target }) =>     
                setEmail(target.value)} id="standard-basic" label="Email" placeholder={userData.email}/>

          <TextField fullWidth  onChange={({ target }) =>     
                setPhoneNumber(target.value)} id="standard-basic" label="Phone Number" placeholder={userData.phoneNumber}/>

          <Button onClick={()=>handleSaveBasicInfo()} variant="outlined">
            Save Changes
          </Button>
          <Button onClick={()=>handleCancelBasicInfo()} variant="outlined">
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
          <button onClick={()=>console.log("delete this skill")}>delete</button>
        </div>
      )
    })
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
          <button onClick={()=>console.log("delete this link")}>delete</button>
        </div>
      )
    })
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
    return userData.languages.map(languages => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{languages}</p>
          <button onClick={()=>console.log("delete this language")}>delete</button>
        </div>
      )
    })
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


            <section className={"basic-info" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Basic Info</h4>
                <button onClick={() => handleExpandBasicInfo()}>Edit</button>
              </div>
              {BasicInfo}
            </section>


            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Personal Details</h4>
                <button onClick={() => handleExpandPersonalDetails()}>Edit</button>
              </div>
              {PersonalDetails}
            </section>


            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4 >Work Experience</h4>
                <button onClick={() => handleExpandWorkExperience()}>Edit</button>
              </div>
              {WorkExperience}
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Education</h4>
            </section>

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
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Aditional information</h4>
            </section>

            <section className={"personal-details" }>
              <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
                <h4> Languages</h4>
                <button onClick={() => handleAddLanguage()}> + </button>
              </div>
              {Languages}
            </section>

            <section className={"personal-details" }>
              <h4 className={"border-top-0 border-right-0 border border-left-0" }>Add Section</h4>
              <p>Military service</p>
            </section>


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