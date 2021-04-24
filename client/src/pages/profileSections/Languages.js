import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteButton from '../../components/buttons/DeleteButton';
import ExpandButton from '../../components/buttons/ExpandButton';
import SaveButton from '../../components/buttons/SaveButton';
import CancelButton from '../../components/buttons/CancelButton';


export default function Languages(props){

  const [expandLanguages, setExpandLanguages] = useState(false)
  const [newLanguage, setNewLanguage] = useState("")
  const [proficiency, setProficiency] = useState("Enter Proficiency")

//Languaes /////////////////////////////////

const proficiencies = [
  {
    value: 'Expert',
    label: 'Expert',
  },
  {
    value: 'Fluent',
    label: 'Fluent',
  },
  {
    value: 'Intermediate',
    label: 'Intermediate',
  },
  {
    value: 'Beginner',
    label: 'Beginner',
  }
];



let Languages
if(props.props.languages.length > 0){
  Languages =<><LanguageMap/></>
  } else{Languages = <></>}
  
let LanguageInput
if(expandLanguages){
    LanguageInput =
    <>
      <div className={"row pl-3 pr-3 space-between"}>
        <TextField  onChange={({ target }) =>     
          setNewLanguage(target.value)} id="standard-basic" label="New Language" />

          <TextField
            id="standard-select-proficiency"
            select
            value={proficiency}
            onChange={({ target }) => setProficiency(target.value)}
            helperText="Proficiency"
          >
            {proficiencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

      
        <div className={"row pr-3"}>
          <SaveButton handleSave={handleAddNewLanguage}/>
          <CancelButton handleCancel={handleCancelLanguage}/>
        </div>
      </div>
    </>
  } else{LanguageInput = <></>}



  function LanguageMap(){
    return props.props.languages.map(language => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{language.title} - {language.proficiency}</p>
          <DeleteButton item={language} handleDelete={handleDeleteLanguage}/>
        </div>
      )
    })
  }


  function handleDeleteLanguage(prop){

    let info = {"email":"test@email.cm", "title":prop.title}

    try {
      axios.post(`/api/users/deletelanguage`, info)
        .then(response => (console.log(response.data)))
        // .then(response => setUserData(response.data))
    } catch (error) {
      console.log(error)
    }

      const lang = props.props.languages.filter(lang => lang !== prop);
      props.setUserData({...props.props, languages:lang})
  }



  function handleAddLanguage(){
    setExpandLanguages(!expandLanguages)
  }


  function handleAddNewLanguage(){

    let info = {"email":"test@email.cm", "title":newLanguage, "proficiency":proficiency}

    try {
      axios.post(`/api/users/addlanguage`, info)
        .then(response => (console.log(response.data)))
        // .then(response => setUserData(response.data))
    } catch (error) {
      console.log(error)
    }

    let newLanguageNow = props.props.languages
    newLanguageNow.push({"title":newLanguage, "proficiency":proficiency})
    props.setUserData({...props.props, languages:newLanguageNow})
    
    setExpandLanguages(false)
    setNewLanguage("")
  }


  function handleCancelLanguage(){
    setNewLanguage("")
    setExpandLanguages(!expandLanguages)
  }


  return (
    <div>
      <section className={"personal-details" }>
        <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
          <h4> Languages</h4>
          <ExpandButton expand={expandLanguages} handleExpand={handleAddLanguage}/>
        </div>
        {Languages}
        {LanguageInput}
        
      </section>
    </div>
  )
}
