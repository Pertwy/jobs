import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"
import { makeStyles } from '@material-ui/core/styles';

export default function Footer() {

    return (
        <div class="container-fluid pb-0 mb-0 pt-3 footer-backgroud">
        <footer>
            <div class="row  justify-content-center py-3">
                <div class="col-11">
                    <div class="row ">
                        
                        <div class="col-xl-8 col-md-4 col-sm-4 col-12 mx-auto a">
                            <h3 class="text-muted mb-md-0 mb-3 bold-text">Job Bored</h3>

                            <h6 class="email mb-3 text-muted bold-text"><b>JOHN PERKINS</b></h6>
                            <small className={"email all-text"}> johnpatrickperkins@gmail.com</small>

                            <h6 class="email text-muted bold-text"><b>JAMES PLANT</b></h6>
                            <small className={"email all-text"}> jamesalexanderplant@gmail.com</small>
                        </div>
   
                        <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                            <h6 class="mb-3 mb-lg-4 bold-text "><b>MENU</b></h6>
                            <ul class="list-unstyled">
                       
                               <li className="">
                                    <Link to="/signin" className="footer-link">Sign In</Link>
                                </li>

                                <li className="">
                                    <Link to="/createaccount" className="footer-link">Sign Up</Link>
                                </li>

                                <li className="">
                                    <Link to="/profile" className="footer-link">Profile</Link>
                                </li>

                                <li className="">
                                    <Link to="/recruiterProfile" className="footer-link">Recruiters</Link>
                                </li>

                            </ul>
                        </div>
   
                        {/* <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                           <h6 class="mt-55 mt-2 text-muted bold-text"><b>JOHN PERKINS</b></h6><small> <span><i class="fa fa-envelope" aria-hidden="true"></i></span> johnpatrickperkins@gmail.com</small>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    </div>
    );

}