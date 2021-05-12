/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
  const { username } = req.body;
  const { description } = req.body;
  const { duration } = req.body;
  const { date } = req.body;

  const newExercise = Exercise({
    username,
    description,
    duration,
    date,
  });
  newExercise
    .save()
    .then(() => res.json('Exercise add '))
    .catch((err) => res.status(400).json('ErrorM' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error' + err));
});
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exericese deleted'))
    .catch((err) => res.status(400).json('Error' + err));
});

router.route('/update/:id').put((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      // eslint-disable-next-line no-param-reassign
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = req.body.duration;
      exercise.date = req.body.date;

      exercise.save()
        .then(() => res.json('Exericese updated'))
        .catch((err) => res.status(400).json('Error' + err));
    })
    .catch((err) => res.status(400).json('Error' + err));
});

module.exports = router;
