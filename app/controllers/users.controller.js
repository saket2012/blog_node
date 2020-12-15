const { response } = require("express");
const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const logger = require("../logs");
// const logger = log.logger;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Username cannot be empty!"
    });
    logger.Log('error', 'Username cannot be empty!');
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Password cannot be empty!"
    });
    logger.Log('error', 'Password cannot be empty!')
    return;
  }

  if (!req.body.displayName) {
    res.status(400).send({
      message: "Display name cannot be empty!"
    });
    logger.Log('error', 'Display name cannot be empty!');
    return;
  }

  // Find if User is already present
  User.findOne({ where: {username: req.body.username}})
    .then(user => { 
      if (user) {
        res.status(400).send({
          message: "Username already in use, please enter a different username"
        });
    return;
    }})
    .catch(e => console.error(e));

  const user = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName
  };

  // Create User in the database
  User.create(user)
    .then(data => {
      res.send(data);
      logger.Log('info', 'User is created, Username: ')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating a user"
      });
    });
};



// exports.findAll = (req, res) => {
  
// };

// exports.findOne = (req, res) => {
  
// };

// exports.update = (req, res) => {
  
// };

// exports.delete = (req, res) => {
  
// };

// exports.deleteAll = (req, res) => {
  
// };

