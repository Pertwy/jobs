import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

export default function Skills(props){

  const [expandSkills, setExpandSkills] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [proficiency, setProficiency] = useState("Enter Proficiency")

//Skills /////////////////////////////////

const proficiencies = [
  {
    value: 'Less than one year',
    label: 'Less than one year',
  },
  {
    value: '1 Year',
    label: '1 Year',
  },
  {
    value: '2 Year',
    label: '2 Year',
  },
  {
    value: '3 Year',
    label: '3 Year',
  },
  {
    value: '4 Year',
    label: '4 Year',
  },
  {
    value: '5 Year',
    label: '5 Year',
  },
  {
    value: '6 Year',
    label: '6 Year',
  },
  {
    value: '7 Year',
    label: '7 Year',
  },
  {
    value: '8 Year',
    label: '8 Year',
  },
  {
    value: '9 Year',
    label: '9 Year',
  },
  {
    value: '10+ Year',
    label: '10+ Year',
  }
];


let Skills
if(props.props.skills.length > 0 && !expandSkills){
  Skills =
    <>
      <SkillMap></SkillMap>
    </>
  } else if(props.props.skills.length > 0 && expandSkills){
    Skills =
    <>
      <SkillMap></SkillMap>
      <div className={"row pl-3 pr-3 space-between"}>

        <TextField  onChange={({ target }) =>     
          setNewSkill(target.value)} id="standard-basic" label="New Skill" />

        <TextField
            id="standard-select-eligible"
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
          <button onClick={()=>handleAddNewSkill()}>Save</button>
          <button onClick={()=>handleCancelSkill()}>Cancel</button>
        </div>
      </div>
    </>
  } else{
    Skills = <>
    </>}

  function SkillMap(){
    return props.props.skills.map(skill => {
      return (
        <div className={"row space-between pl-3 pr-3"}>
          <p>{skill.title} - {skill.proficiency}</p>
          <button onClick={()=>handleDeleteSkill(skill.title)}>delete</button>
        </div>
      )
    })
  }

  function handleDeleteSkill(prop){
    const skill = props.props.skills.filter(skill => skill.title !== prop);
    props.setUserData({...props.props, skills:skill})
}

  function handleAddSkill(){
    setExpandSkills(!expandSkills)
  }

  function handleAddNewSkill(){
    let newSkillNow = props.props.skills
    newSkillNow.push({"title":newSkill, "proficiency":proficiency})
    props.setUserData({...props.props, skills:newSkillNow})
  
    setExpandSkills(false)
  }

  function handleCancelSkill(){
    setNewSkill("")
    setExpandSkills(!expandSkills)
  }
  
  return (
    <div>
      <section className={"personal-details" }>
        <div className={"row space-between pl-3 pr-3 border-top-0 border-right-0 border border-left-0" }>
          <h4> Skills</h4>
          <button onClick={() => handleAddSkill()}> + </button>
        </div>
        {Skills}
      </section>
    </div>
  )
}