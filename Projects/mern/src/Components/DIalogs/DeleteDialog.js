/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog(props) {
  const {
    openDialog, handleClose, id, deleteExercise,
  } = props;
  // eslint-disable-next-line no-console
  console.log('TextDialogs', deleteExercise);

  const [open, setOpen] = React.useState();
  // eslint-disable-next-line no-console
  console.log('id', id);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    deleteExercise(id);
    handleClose();
  };

  // const handleClose = () => {
  //   setOpen(false);
  //   // eslint-disable-next-line no-console
  //   console.log('open', open);
  // };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this one exercise ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
