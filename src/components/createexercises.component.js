import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../css/createexercise.css";
import { Link } from "react-router-dom";

class CreateExercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      duration: 0.0,
      date: new Date(),
      userid: ""
    };
  }

  submit = e => {
    e.preventDefault();
    const exercise = {
      title: this.state.title,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      userid: this.props.location.state.userid
    };

    axios.post("http://localhost:5000/exercises/add", exercise).then(res => {
      console.log(res.data);
      this.props.history.push("/exercises", {
        userid: this.props.location.state.userid
      });
    });
  };

  render() {
    return (
      <>
        <div className="titlecontainer">
          <h1 className="Title">ToDo List</h1>

          <p
            className="Logout"
            onClick={() => {
              this.props.history.push("/", {
                userid: ""
              });
            }}
          >
            Log Out
          </p>
        </div>
        <hr className="border"></hr>
        <form onSubmit={this.submit}>
          <div className="container1">
            <div>
              <div className="row">
                <h3 className="labela">Title</h3>

                <input
                  className="textboxcss"
                  type="textbox"
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                ></input>
              </div>
              <div className="row">
                <h3 className="labela">Description</h3>
                <input
                  className="textboxcss"
                  type="textbox"
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                ></input>
              </div>

              <div className="row">
                <h3 className="labela">Duration</h3>
                <input
                  className="textboxcss"
                  placeholder="Enter a number in minutes"
                  type="number"
                  min="0"
                  max="300"
                  onChange={e => {
                    this.setState({ duration: e.target.value });
                    this.setState({ value: e.target.value });
                  }}
                />
              </div>
              <div className="row">
                <h3 className="labela">Date</h3>
                <DatePicker
                  className="textboxcss"
                  value={this.state.date}
                  selected={this.state.date}
                  onChange={date => {
                    this.setState({ date: date });
                  }}
                ></DatePicker>
              </div>
            </div>
            <button className="submitcss">SUBMIT</button>
          </div>
        </form>
      </>
    );
  }
}
export default CreateExercises;
