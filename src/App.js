import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Adduser from "./pages/Adduser"
import AddBook from "./pages/AddBook"
import Profile from "./pages/Profile"
import AddList from "./pages/AddList"
import ViewBook from "./idPages/ViewBook"
import ViewUser from "./idPages/ViewUser"
// import FireAuth from "./components/fireAuth"

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
        <Route path="/test" exact component={Adduser} />
        <Route path="/booksearch" component={AddBook} />
        <Route path="/lists" component={AddList} />
        <Route path="/profile" component={Profile} />
        <Route path="/book/:id" component={ViewBook} />
        <Route path="/user/:id" component={ViewUser} />
      </div>
    </Router>
  );
}

export default App;
