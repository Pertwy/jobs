import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./JobPostFrontPage.css"

export default function JobPostFrontPage(props) {
  //const [lists, setLists] = useState([])
  const {title, description, credit1, credit2, credit3, salary, createdAt, company, location, tags, industry, remote, easyApplyBool, coverLetterBool, applyOnCompanySiteBool, applyOnCompanySiteLink, type, _id} = props.props


  let creditOne
  if(credit1){
    creditOne=<div className="credit red"></div>
  }else{creditOne=<></>}

  let creditTwo
  if(credit2){
    creditTwo=<div className="credit blue"></div>
  }else{creditTwo=<></>}

  let creditThree
  if(credit3){
    creditThree=<div className="credit yellow"></div>
  }else{creditThree=<></>}



  return (
    <section className="col-sm-12 col-md-6 col-lg-4 mb-3" key={_id} >
        
        <Link className="link" to={"/jobPosts/"+_id}>
          <div className="job-box  p-4">
            <h4 className="title">{title}</h4>
            <h5 className="location">{location}</h5>
            <h5 className="salary">£{salary} per Annum</h5>
            <div className="description-box overflow">
                <p className="description">{description}</p>
            </div>

            <div className="row">
              {creditOne} {creditTwo} {creditThree}
            </div>

            <h6 className="createdAt">Posted at - {createdAt}</h6>
          </div>
        </Link>
        
    </section>
  )

}