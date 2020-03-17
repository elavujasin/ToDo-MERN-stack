import React from "react";
import axios from "axios";
import ExerciseComponent from "./exercisecomponent";
import "../css/addexercise.css";
import { Link } from "react-router-dom";
class ExercisesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }
  componentDidMount() {
    console.log("state" + this.state.UserId);
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    axios
      .get(
        "http://localhost:5000/exercises/",
        { params: { userid: this.props.location.state.userid } },
        config
      )
      .then(response => {
        this.setState({ exercises: response.data });
        console.log(response.data);
      });
  }

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
        {this.state.exercises.length > 0 ? (
          this.state.exercises.map(exercise => (
            <ExerciseComponent
              title={exercise.title}
              description={exercise.description}
              duration={exercise.duration}
              date={exercise.date.substring(0, 10)}
              id={exercise._id}
              userid={this.props.location.state.userid}
            ></ExerciseComponent>
          ))
        ) : (
          <div className="containera">
            <p className="exrciseTitle1">
              <br></br>
              You have no exercises <br></br>
              <br></br> Exercices that you add will show here
              <br></br>
              <br></br>
            </p>
          </div>
        )}

        <button
          className="addexercise"
          onClick={() => {
            console.log("ela");
            console.log(this.props.location.state.userid);
            this.props.history.push("/create", {
              userid: this.props.location.state.userid
            });
          }}
        >
          ADD
        </button>
      </>
    );
  }
}
export default ExercisesList;
