import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Link } from 'react-router-dom';
import "./JobPostProfile.css"

export default function JobPostProfile(props) {

  const {title, description, salary, createdAt, company, location, tags, industry, remote, easyApplyBool, coverLetterBool, applyOnCompanySiteBool, applyOnCompanySiteLink, type, _id} = props.props
  return (     

        <section key={_id} >
            
            <Link className="link" to={"/jobPosts/"+_id}>
              <div className="p-3">
                <h4>{title}</h4>
                <h5>{location}</h5>
                <h5 className="salary">£{salary} per Annum</h5>
                <h5>Applied date</h5>
                <h5>Reply?</h5>
              </div>
            </Link>
            
        </section>
  )

}