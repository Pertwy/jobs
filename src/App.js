import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import RecruiterProfile from "./pages/RecruiterProfile"
import ViewJobPost from "./idPages/ViewJobPost"
import CreateAccount from "./pages/CreateAccount"
// import TestForm from "./pages/TestForm"

axios.defaults.withCredentials = true

function App() {
  return (
    <Router>
      <div >
        <Navbar />
      </div>

      <div>
      <br/>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/createaccount" exact component={CreateAccount} />
        <Route path="/profile" component={Profile} />
        <Route path="/recruiterProfile" component={RecruiterProfile} />
        <Route path="/jobPosts/:id" component={ViewJobPost} />
        {/* <Route path="/testForm" component={TestForm}></Route> */}
      </div>
    </Router>
  );
}

export default App;
