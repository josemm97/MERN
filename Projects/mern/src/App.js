/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ExercisesList from './Components/Exercises/ExercisesList';
import EditExercise from './Components/Exercises/EditExercise';
import CreateExercise from './Components/Exercises/CreateExercise';
import CreateUser from './Components/User/CreateUser';
import Navbar from './Components/Nav/Navbar';
// import VerticalTabs from './Components/Nav/VerticalTabs';
import PersistentDrawerLeft from './Components/Nav/PersistentDrawerLeft';

function App() {
  return (
  // eslint-disable-next-line react/react-in-jsx-scope
  // eslint-disable-next-line react/jsx-filename-extension
    <Router>
      <div className="app">
        <PersistentDrawerLeft />
        <Route exact path="/" component={ExercisesList} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
        <Route path="/edit/:id" component={EditExercise} />

      </div>
    </Router>
  );
}

export default App;
