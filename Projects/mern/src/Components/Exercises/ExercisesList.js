/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import EnhancedTable from '../Component/EnhancedTable';
import CustomizedTables from '../Component/CustomizedTables';
import { selectExercises, setExercisesData } from '../../Features/exerciseSlice';

function ExercisesList() {
  const exercises = useSelector(selectExercises);
  const [exerciseData, setExerciseData] = React.useState([]);
  // const [exercisesData, setExercisesData] = React.useState([]);
  const dispatch = useDispatch();
  console.log('exercises', exercises);

  const fetchExercise = async () => {
    const data = await axios.get('http://localhost:5000/exercises');
    // setExercisesData(data);
    console.log(data);
    dispatch(setExercisesData(data));
  };

  React.useEffect(() => {
    // fetchExercise();
    axios.get('http://localhost:5000/exercises')
      .then((res) => {
        // console.log(res.data);
        dispatch(setExercisesData(res.data));
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    dispatch(setExercisesData(exercises.filter((exercise) => exercise._id !== id)));
  };

  const tableHead = ['Username', 'Description', 'Duration', 'Date', 'Actions'];
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <p> Exercises List</p>
      <CustomizedTables tableHead={tableHead} deleteExercise={deleteExercise} />
    </div>
  );
}

export default ExercisesList;
