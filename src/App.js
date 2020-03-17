import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExercisesList from "./components/exerciseslist.component";
import EditExercises from "./components/editexercises.component";
import CreateExercises from "./components/createexercises.component";
import Signup from "./components/signup";
import Login from "./components/login";

function App() {
  return (
    <div className="background">
      <Router>
        <Route path="/" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/exercises" component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercises} />
        <Route path="/create" component={CreateExercises} />
      </Router>
    </div>
  );
}

export default App;
