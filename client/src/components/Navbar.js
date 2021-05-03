import React from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Navbar.css"


export default function Navbar2() {


     return (

      <>
      <Navbar className="nav-background container"  expand="lg">
       <Link to="/" className=" nav-text navbar-brand"><h2 className="">Job Bored</h2></Link>
         
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="ml-auto">
           
           <ul className="navbar-nav ">
             
              <li className="navbar-item">
                <Link to="/signin" className="nav-text nav-link"><h6 className="nav-text">Sign In</h6></Link>
              </li>

              <li className="navbar-item">
                <Link to="/createaccount" className="nav-text nav-link"><h6 className="nav-text">Sign Up</h6></Link>
              </li>

              <li className="navbar-item">
                <Link to="/profile" className="nav-text nav-link"><h6 className="nav-text">Profile</h6></Link>
              </li>

              <li className="navbar-item">
                <Link to="/recruiterProfile" className="nav-text nav-link"><h6 className="nav-text">Recruiters</h6></Link>
              </li>

            
            </ul>
           
         </Nav>
         
       </Navbar.Collapse>
     </Navbar>
   </>


      // <div className= "container-fullwidth">
      //   <nav class="navbar navbar-dark bg-dark navbar-expand-sm">

      //     <Link to="/" className="navbar-brand">Job Board</Link>
     
      //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      //       <span class="navbar-toggler-icon"></span>
      //     </button>

      //     <div class="collapse navbar-collapse" id="navbar-list-2">
      //         <ul className="navbar-nav ml-auto">
                    
      //               <li className="navbar-item">
      //               <Link to="/signin" className="nav-link">Sign In</Link>
      //               </li>

      //               <li className="navbar-item">
      //               <Link to="/createaccount" className="nav-link">Sign Up</Link>
      //               </li>

      //               <li className="navbar-item">
      //               <Link to="/profile" className="nav-link">Profile</Link>
      //               </li>

      //               <li className="navbar-item">
      //               <Link to="/recruiterProfile" className="nav-link">Recruiters</Link>
      //               </li>

      //               {/* <li className="navbar-item">
      //               <Link to="/testForm" className="nav-link">Test Form</Link>
      //               </li> */}

      //             </ul>
      //         </div>

      //     </nav>

      // </div>
    );

}