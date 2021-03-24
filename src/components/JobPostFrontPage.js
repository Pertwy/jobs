import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./JobPostFrontPage.css"

export default function JobPostFrontPage(props) {
  //const [lists, setLists] = useState([])

  const {title, description, salary, createdAt, company, location, tags, industry, remote, easyApplyBool, coverLetterBool, applyOnCompanySiteBool, applyOnCompanySiteLink, type, _id} = props.props
  return (

    

    <section className="col-sm-4" key={_id} >
        
        <Link className="link" to={"/jobPosts/"+_id}>
          <div className="job-box  p-4">
            <h4>{title}</h4>
            <h5>{location}</h5>
            <h5 className="salary">£{salary} per Annum</h5>
            <div className="description-box overflow">
                <p>{description}</p>
            </div>
            <h6>Posted at - {createdAt}</h6>
          </div>
          {console.log(props.props)}
        </Link>
        
    </section>
  )

}