const db = require("../models");

// Defining methods for the reps Controller
module.exports = {
  findAll: function(req, res) {
    db.Reps
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Reps
      .find({ apiID: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByChamber: function(req, res) {
    db.Reps
      .find({ reptype: req.params.chamber })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    db.Reps
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Reps
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Reps
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRepsbyState: function(req, res) {
    db.Reps
      .find({ reptype: req.params.reptype, state: req.params.state })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
