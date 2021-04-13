// import React, { useState} from 'react';
// import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import {Styles} from "../pages/styles"
// import {Formik, useField} from "formik";
// import * as Yup from "yup"


// const CustomTextInput = ({ label, ...props}) => {
//     const [field, meta] = useField(props);

//     return(
//         <>
//             <lable htmlFor={props.id || props.name}>{label}</lable>
//             <input className="test-input" {...field}{...props}/>
//             {meta.touched && meta.error ? (
//                 <div className = "error">{meta.error}</div>
//             ): null }
//         </>
//     )
// }


// const CustomCheckBox = ({ label, ...props}) => {
//     const [field, meta] = useField(props, "checkbox");

//     return(
//         <>
//             <lable className="checkbox">{label}</lable>
//             <input type="checkbox" {...field}{...props}/>
//             {meta.touched && meta.error ? (
//                 <div className = "error">{meta.error}</div>
//             ): null }
//         </>
//     )
// }



// export default function TestForm(){
//     return(
//         <Styles>
//             <Formik
//                 initialValues={{
//                     name: "",
//                     email: "",
//                     acceptedTerms: false,
//                     superPower: '',
//                 }}
//                 validationSchema={
//                     Yup.object({
//                         name: Yup.String()
//                             .min(3, "Must be at least 3 characters")
//                             .max(15, "Must be 15 characters or less")
//                             .required("Required"),
//                         email: Yup.string()
//                             .email("Invalid email")
//                             .required("Required"),
//                         acceptedTerms: Yup.boolean()
//                             .required("Required")
//                             .oneOf([true], "You must accept the terms and conditions"),
//                         superPower: Yup.string()
//                             .oneOf(["flight", "invisibility", "other"], "Invalid dream")
//                             .required("Required")
//                 })}
//             >
//             onSubmit = {(values, {setSubmitting, resetForm}) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2))
//                     resetForm();
//                     setSubmitting(false)
//                 }, 3000)
//             }}


//             </Formik>
//         </Styles>

//     )
//  }