import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Adduser from "./pages/Adduser"
import Profile from "./pages/Profile"
import RecruiterProfile from "./pages/RecruiterProfile"
import ViewJobPost from "./idPages/ViewJobPost"

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
        <Route path="/signup" exact component={Adduser} />
        <Route path="/profile" component={Profile} />
        <Route path="/recruiterProfile" component={RecruiterProfile} />
        <Route path="/book/:id" component={ViewJobPost} />
      </div>
    </Router>
  );
}

export default App;
