import React from "react";
import axios from "axios";
import "../css/signup.css";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      id: ""
    };
  }
  Signin = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post("http://localhost:5000/auth/signin", user).then(
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

              return await this.props.history.push("/exercises", {
                userid: this.state.id
              });
              //window.location = "/exercises";
            },
            error => {
              console.log(error.response);
            }
          );
        /*.then(
              let var= await res;
            this.props.history.push("/exercises", { userid: this.state.id })
          )*/

        //window.location = "/exercises";
      },
      error => {
        alert(error.response.data.errors[0].msg);
      }
    );
  };

  render() {
    return (
      <>
        <>
          <h1 className="title">ToDo List</h1>
          <hr className="border"></hr>
          <input
            type="email"
            className="textbox"
            placeholder="enter you email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          ></input>
          <br></br>
          <input
            type="password"
            className="textbox"
            placeholder="enter you password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          ></input>

          <button className="signup_button" onClick={this.Signin}>
            Sign in
          </button>
        </>
      </>
    );
  }
}
export default Login;
