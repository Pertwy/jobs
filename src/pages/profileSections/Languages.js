import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

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
if(props.props.languages.length > 0 && !expandLanguages){
  Languages =
    <>
      <LanguageMap></LanguageMap>
    </>
  } else if(props.props.languages.length > 0 && expandLanguages){
    Languages =
    <>
      <LanguageMap></LanguageMap>
      <div className={"row pl-3 pr-3 space-between"}>
        <TextField  onChange={({ target }) =>     
          setNewLanguage(target.value)} id="standard-basic" label="New Language" />

          <TextField
            id="standard-select-proficiency"
            select
            value={proficiency}
            onChange={setProficiency}
            helperText="Proficiency"
          >
            {proficiencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

      
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
    return props.props.languages.map(language => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{language}</p>
          <button onClick={()=>handleDeleteLanguage(language)}>delete</button>
        </div>
      )
    })
  }

  function handleDeleteLanguage(prop){
      const lang = props.props.languages.filter(lang => lang !== prop);
      props.setUserData({...props.props, languages:lang})
  }

  function handleAddLanguage(){
    setExpandLanguages(!expandLanguages)
  }
  function handleAddNewLanguage(){
    let newLanguageNow = props.props.languages
    newLanguageNow.push(newLanguage)
    props.setUserData({...props.props, languages:newLanguageNow})
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
          <button onClick={() => handleAddLanguage()}> + </button>
        </div>
        {Languages}
      </section>
    </div>
  )
}
