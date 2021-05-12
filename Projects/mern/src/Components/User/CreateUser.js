/* eslint-disable no-console */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import styles from './CreateUser.module.css';

const initialState = {
  username: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_USER':
      return {
        ...state,
        username: payload,
      };
    default:
      return state;
  }
};

function CreateUser() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users/add', state)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data);
      }).catch((err) => {
        console.log(err.status);
      });
  };
  const onChange = (e) => {
    e.preventDefault();
    const username = e.target.value;
    console.log(username);
    dispatch({ type: 'ADD_USER', payload: username });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.container}>
      <Typography variant="h5" color="initial">
        Create User
      </Typography>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input_container}>
          <TextField
            id=""
            label="Username"
            className={styles.input}
            onChange={onChange}
          />
        </div>
        <div className={styles.input_container}>
          <Button type="submit" variant="outlined" color="primary" className={styles.button}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
