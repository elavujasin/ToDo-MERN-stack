import React from "react";
import "../css/exercisecomponent-css.css";
import axios from "axios";
import { Link } from "react-router-dom";

class ExerciseComponent extends React.Component {
  delete = () => {
    axios
      .delete("http://localhost:5000/exercises/" + this.props.id)
      .then(res => {
        console.log(res.data);
        window.location = "/exercises";
      });
  };
  render() {
    return (
      <div className="container">
        <div className="decontainer">
          <button className="delete_edit" onClick={this.delete}>
            x
          </button>

          <Link to={"/edit/" + this.props.id}>
            <button className="delete_edit">E</button>
          </Link>
        </div>
        <div className="data">
          <p class="exerciseTitle"> {this.props.title}</p>

          <div className="containersmall">
            <p class="exrciseTitle1">Description:</p>
            <p className="text"> {this.props.description}</p>
          </div>
          <div className="containersmall">
            <p class="exrciseTitle1">Duration:</p>
            <p className="text"> {this.props.duration} min</p>
          </div>
          <div className="containersmall">
            <p class="exrciseTitle1">Date:</p>
            <p className="text">{this.props.date} </p>
          </div>
        </div>
      </div>
    );
  }
}
export default ExerciseComponent;
