import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      id: ""
    };
  }
  SubmitUser = e => {
    e.preventDefault();
    if (this.state.password != this.state.password2)
      //windows.alert("passwords dont match");
      alert("passwords dont match");
    else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      axios.post("http://localhost:5000/users/signup", user).then(
        res => {
          //this.setState({ token: res.data.token });
          axios
            .get("http://localhost:5000/auth", {
              headers: {
                "x-auth-token": res.data.token,
                "Content-Type": "application/json"
              }
            })
            .then(
              async res => {
                this.setState({ id: res.data._id });
                console.log(this.state.id);
                return await this.props.history.push("/exercises", {
                  userid: this.state.id
                });
              },
              error => {
                console.log(error.response);
              }
            );

          //window.location = "/exercises";
        },
        error => {
          alert(error.response.data.errors[0].msg);
        }
      );
    }
  };

  render() {
    return (
      <>
        <>
          <h1 className="title">ToDo List</h1>
          <hr className="border"></hr>
          <input
            className="textbox"
            type="name"
            placeholder="enter you name"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          ></input>
          <br></br>
          <input
            className="textbox"
            type="email"
            placeholder="enter you email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          ></input>
          <br></br>
          <input
            className="textbox"
            type="password"
            placeholder="enter you password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          ></input>
          <br></br>
          <input
            className="textbox"
            type="password"
            placeholder="confirm password"
            onChange={e => {
              this.setState({ password2: e.target.value });
            }}
          ></input>
          <button className="signup_button" onClick={this.SubmitUser}>
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Click here</Link>{" "}
          </p>
        </>
      </>
    );
  }
}
export default Signup;
