import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../css/createexercise.css";
import { Link } from "react-router-dom";

class EditExercises extends React.Component {
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

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/exercises/" +
          this.props.location.pathname.substring(
            6,
            this.props.location.pathname.length
          )
      )
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          userid: response.data.userid
        });
      });
  }

  save = e => {
    e.preventDefault();
    const exercise = {
      title: this.state.title,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      userid: this.state.userid
    };

    axios
      .post(
        "http://localhost:5000/exercises/update/" +
          this.props.location.pathname.substring(
            6,
            this.props.location.pathname.length
          ),
        exercise
      )
      .then(res => {
        console.log(res.data);
        this.props.history.push("/exercises", {
          userid: this.state.userid
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
        <form onSubmit={this.save}>
          <div className="container1">
            <div>
              <div className="row">
                <h3 className="labela">Title</h3>
                <input
                  value={this.state.title}
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
                  value={this.state.description}
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
                  value={this.state.duration}
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
            <button className="submitcss">SAVE</button>
          </div>
        </form>
      </>
    );
  }
}
export default EditExercises;
