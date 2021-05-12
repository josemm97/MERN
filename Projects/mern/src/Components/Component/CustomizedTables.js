/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { selectExercises, createExercise } from '../../Features/exerciseSlice';
import DeleteDialog from '../DIalogs/DeleteDialog';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Exercise = (args) => (
  <StyledTableRow>
    <StyledTableCell>
      {args.exercise.username}
    </StyledTableCell>
    <StyledTableCell>
      {args.exercise.description}
    </StyledTableCell>
    <StyledTableCell>
      {args.exercise.duration}
      {' '}
      minutes
    </StyledTableCell>
    <StyledTableCell>
      {args.exercise.date.substring(0, 10)}
    </StyledTableCell>
    <StyledTableCell>
      <div>
        <Link to={`/edit/${args.exercise._id}`} target="_blank">
          <IconButton
            aria-label="Edit"
            onClick={() => args.dispatch(args.createExercise(args.exercise))}
          >
            <EditIcon />
          </IconButton>
        </Link>
        <a
          href="#"
          onClick={() => {
            args.setDialog(true);
            args.setId(args.exercise._id);
          }}
        >
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </a>
      </div>
    </StyledTableCell>

  </StyledTableRow>
);
export default function CustomizedTables(props) {
  const exercises = useSelector(selectExercises);
  const [dialog, setDialog] = React.useState(false);
  const [id, setId] = React.useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { tableHead, deleteExercise } = props;
  // eslint-disable-next-line no-console
  console.log(exercises);
  const handleClose = () => {
    setDialog(false);
  };
  const exerciseList = () => exercises.map((currentexercise) => (
    <Exercise
      exercise={currentexercise}
      deleteExercise={deleteExercise}
      key={currentexercise._id}
      setDialog={setDialog}
      setId={setId}
      dispatch={dispatch}
      createExercise={createExercise}
    />
  ));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map((head) => (
                <StyledTableCell>{head}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {exerciseList()}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog
        openDialog={dialog}
        handleClose={handleClose}
        id={id}
        deleteExercise={deleteExercise}
      />
    </div>
  );
}
