/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercises',

  initialState: {
    exercise: {},
    test: null,
    exercisesData: [],
    users: [],
    user: {
      username: '',
    },
  },
  reducers: {
    setExercisesData: (state, action) => {
      state.exercisesData = action.payload;
    },
    setUsersData: (state, action) => {
      state.users = action.payload;
    },
    createExercise: (state, action) => {
      // ...state,
      state.exercise = action.payload;
      // username: action.payload.username,
      // description: action.payload.description,
      // duration: action.payload.duration,
      // date: action.payload.date,
    },
    createUser: (state, action) => {
      state.user = action.payload;
    },
    deleteExercise: (state, action) => {
      state.exercises = action.payload;
    },
    setTest: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const {
  setExercisesData, setTest, createExercise, createUser, setUsersData, deleteExercise,
} = exerciseSlice.actions;

export const selectExercise = (state) => state.exercise.exercise;
export const selectUser = (state) => state.exercise.user;
export const selectExercises = (state) => state.exercise.exercisesData;
export const selectUsers = (state) => state.exercise.users;

export default exerciseSlice.reducer;
