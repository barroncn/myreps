import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Register.css";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Auth from "../../modules/Auth.js";
import axios from "axios";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: "",
      username: "",
      password: "",
      name: "",
      confirmPassword: "",
      userState: "",
      zip: "",
      message: "",
      redirect: undefined
    };

    this.processUser = this.processUser.bind(this);
  }

  //Ensures the user's input matches the format of an email address
  validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  //Updates the DOM with the user's input
  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  //sends our register user request through authendication
  processUser(userID) {
    //Axios request to /auth/login route
    axios.post("/auth/login", {
      "username": this.state.username,
      "password": this.state.password
    }).then(res => {
      //if the request fails, console log the failure
      if (!res.data.success) {
        console.log("FAILURE");
        console.log(res.data);
      }
      //if the request succeeds, then redirect the user to their profile page
      else {
        Auth.authenticateUser(res.data.token, userID);
        this.setState({
          "errors": {},
          "redirect": <Redirect to={"/profile/" + userID} />
        });
      }
    }).catch(err => console.log(err));
  }

  //When the user submits the register form
  handleSubmitClick = (event) => {
    event.preventDefault();
    //Check to make sure no fields are blank
    if (!this.state.name || !this.state.username || !this.state.password || !this.state.userState || !this.state.zip) {
      this.setState({ message: "Please complete all fields." });
    }
    //make sure the email matches the email format by calling the validateEmail function
    else if (!this.validateEmail(this.state.username)) {
      this.setState({ message: "Please enter a valid email address." });
    }
    //make sure the password is at least six characters long
    else if (this.state.password.length < 6) {
      this.setState({ message: "Password must be at least six characters long." });
    }
    //make sure the password and confirm password match
    else if (this.state.password !== this.state.confirmPassword) {
      console.log(this.state.password);
      console.log(this.state.confirmPassword);
      this.setState({
        password: "",
        confirmPassword: "",
        message: "Passwords do not match."
      });
    }
    //make sure the zip Code is 5 characters long
    else if (this.state.zip.length !== 5) {
      this.setState({ message: "Please enter a five digit zip code." });
    }
    //If the form is validated.
    else {
      const newUser = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        state: this.state.userState,
        zipCode: this.state.zip
      };
      //Add the user to the Users database
      API.saveUser(newUser)
        .then(res => {
          //if Mongoose returns an error code 11000, then the user email is already in the database
          if (res.data.code === 11000) {
            this.setState({ message: "This email is already registered." });
          }
          //otherwise, authentiate the user (which upon successful authentiation will send them to their 
          //new profile page)
          else {
            this.processUser(res.data._id.valueOf());
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      this.state.redirect ? this.state.redirect :
      <div>
      <Nav
          linkOne="/"
          linkOneDisplay="Home"
          linkTwo="/login"
          linkTwoDisplay="Login"
        />
      <div className="loginWrap">
          <br/>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Register</h4>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    name="name"
                    onChange={this.handleInputChange}
                    type="input" 
                    className="form-control" 
                    id="userName" 
                    aria-describedby="emailHelp"  
                    value={this.state.name}  
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    name="username"
                    onChange={this.handleInputChange}
                    type="email" 
                    className="form-control" 
                    id="emailInput" 
                    aria-describedby="emailHelp" 
                    value={this.state.username}  
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    name="password"
                    onChange={this.handleInputChange}
                    type="password" 
                    className="form-control" 
                    id="passwordInput"  
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    name="confirmPassword"
                    onChange={this.handleInputChange}
                    type="password" 
                    className="form-control" 
                    id="passwordConfirm" 
                    value={this.state.confirmPassword}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select 
                    name="userState"
                    onChange={this.handleInputChange}
                    id="inputState" 
                    className="form-control"
                    value={this.state.userState}
                  >
                              <option></option>
                              <option>AK</option>
                              <option>AL</option>
                              <option>AR</option>
                              <option>AZ</option>
                              <option>CA</option>
                              <option>CO</option>
                              <option>CT</option>
                              <option>DE</option>
                              <option>FL</option>
                              <option>GA</option>
                              <option>HI</option>
                              <option>IA</option>
                              <option>ID</option>
                              <option>IL</option>
                              <option>IN</option>
                              <option>KS</option>
                              <option>KY</option>
                              <option>LA</option>
                              <option>MA</option>
                              <option>MD</option>
                              <option>ME</option>
                              <option>MI</option>
                              <option>MN</option>
                              <option>MO</option>
                              <option>MS</option>
                              <option>MT</option>
                              <option>NC</option>
                              <option>ND</option>
                              <option>NE</option>
                              <option>NH</option>
                              <option>NJ</option>
                              <option>NM</option>
                              <option>NV</option>
                              <option>NY</option>
                              <option>OH</option>
                              <option>OK</option>
                              <option>OR</option>
                              <option>PA</option>
                              <option>RI</option>
                              <option>SC</option>
                              <option>SD</option>
                              <option>TN</option>
                              <option>TX</option>
                              <option>UT</option>
                              <option>VA</option>
                              <option>VT</option>
                              <option>WA</option>
                              <option>WI</option>
                              <option>WV</option>
                              <option>WY</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input 
                    name="zip"
                    onChange={this.handleInputChange}
                    type="text" 
                    className="form-control" 
                    id="inputZip"  
                    value={this.state.zip}
                  />
                </div>
                <button type="submit" onClick={this.handleSubmitClick} className="btn btn-dark">Submit</button><span className="errorMessage">{this.state.message}</span>
                <div className="text-center">Already have an account? <a href="/login">Login</a></div>
              </form>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default Register;
