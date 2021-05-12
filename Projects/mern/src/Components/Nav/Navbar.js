/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Box } from '@material-ui/core';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <Box className={styles.container}>
      <Breadcrumbs aria-label="breadcrumb" className={styles.bread}>
        <div className={styles.link_container}>
          <Link to="/" className={styles.link}>
            <DirectionsWalkIcon />
            Exercises
          </Link>
        </div>
        <div className={styles.link_container}>
          <Link
            to="/create"
            className={styles.link}
          >
            <CreateIcon />
            Create Exercises
          </Link>
        </div>
        <div className={styles.link_container}>
          <Link
            to="/user"
            className={styles.link}
          >
            <PersonAddIcon />
            Create USer
          </Link>
        </div>
      </Breadcrumbs>
    </Box>
  );
}

export default Navbar;
