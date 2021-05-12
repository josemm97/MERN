/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { SettingsBluetoothSharp } from '@material-ui/icons';
import AlertDialog from '../DIalogs/AlertDialog';
import {
  selectExercise, createExercise, setUsersData,
  selectUsers,
} from '../../Features/exerciseSlice';
import styles from './CreateExercise.module.css';

const initialState = {
  dialogsText: [],
};

function reducer(state, action) {
  const { type, payload } = action;
  // eslint-disable-next-line no-console
  // console.log('payload', payload.title);
  // eslint-disable-next-line default-case
  switch (action.type) {
    // eslint-disable-next-line default-case
    case 'EXERCISE_ADDED':
      return {
        ...state,
        dialogsText: payload,
      };
    case 'EXERCISE_NOT_ADDED':
      return {
        ...state,
        dialogsText: payload,
      };
    default:
      return state;
  }
}

function CreateExercise() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const exercise = useSelector(selectExercise);
  const users = useSelector(selectUsers);
  // const [date, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [username, setUsername] = React.useState(null);
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState(null);
  const dispatchActions = useDispatch();
  const [response, setResponse] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);

  // eslint-disable-next-line no-console
  // console.log('conection', navigator.onLine);
  React.useEffect(() => {
    axios.get('http://localhost:5000/users')
    // eslint-disable-next-line no-console
      .then((res) => {
        // eslint-disable-next-line no-console
        dispatchActions(setUsersData(res.data));
      });
  }, []);
  // eslint-disable-next-line no-console
  // console.log('exercise', exercise);
  // React.useEffect(() => {
  //   useDispatch(setNewExercise(payload));
  // }, [payload]);
  const onChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    e.preventDefault();
    setDuration(e.target.value);
    // eslint-disable-next-line no-console
  };

  const handleClose = () => {
    setDialog(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username,
      description,
      duration,
      date: selectedDate,
    };
    // eslint-disable-next-line no-console
    // console.log('Payload', payload);
    if (!username || !description || !duration || !selectedDate || !navigator.onLine) {
      setResponse(false);
    }
    axios.post('http://localhost:5000/exercises/add', payload)
    // eslint-disable-next-line no-console
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('axios', res.data);
        if (res.data) {
          setResponse(true);
          setUsername('');
          setDescription('');
          setDuration('');
        } else {
          setResponse(false);
        }
      });
    // eslint-disable-next-line no-console
    dispatchActions(createExercise(payload));
    // eslint-disable-next-line no-console
    setDialog(true);
  };
  React.useEffect(() => {
    if (response) {
      dispatch({
        type: 'EXERCISE_ADDED',
        payload: {
          title: 'Exercise added',
          content: 'You have added an exercise',
        },
      });
    } else if (!response) {
      dispatch({
        type: 'EXERCISE_NOT_ADDED',
        payload: {
          title: 'Exercise not added',
          content: 'Please review your data or your network',
        },
      });
    }
  }, [response]);
  return (
    <div className={styles.container}>
      <Typography variant="h4" color="initial" className={styles.title}>
        Create
      </Typography>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.container__input}>
          <TextField
            id="user"
            select
            label="Username"
            helperText="Please select username"
            size="normal"
            className={styles.input}
            value={username}
            onChange={onChangeUsername}
            variant="outlined"
          >
            { users && users.length > 0 ? users.map((user) => (
              <MenuItem value={user.username}>
                {user.username}
              </MenuItem>
            )) : null}
          </TextField>
        </div>
        <div className={styles.container__input}>
          <TextField
            id="outlined-basic"
            label="Description"
            value={description}
            variant="outlined"
            className={styles.input}
            onChange={onChangeDescription}
          />
        </div>
        <div className={styles.container__input}>
          <TextField
            id="standard-number"
            label="Duration in minutes"
            value={duration}
            type="number"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            variant="outlined"
            className={styles.input}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={onChangeDuration}
          />

        </div>
        <div className={styles.container__input}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={styles.input}
              margin="normal"
              id="date-picker-dialog"
              label="Pick Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              variant="outlined"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={styles.container__input}>
          <Button type="submit" variant="outlined" color="primary" className={styles.button}>
            Create
          </Button>
        </div>
      </form>
      <AlertDialog openDialog={dialog} handleClose={handleClose} textDialogs={state} />
    </div>
  );
}

export default CreateExercise;
