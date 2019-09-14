const express = require('express')

const Users = require('./auth-model.js');
const bcrypt = require('bcryptjs')

const restricted = require('./authenticate-middleware.js')

const router = require('express').Router();

router.post('/register', (req, res) => {
  let user = req.body

  user.password = bcrypt.hashSync(user.password, 10)

  Users.add(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json({message: "There was an error during sign up."})
  })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body

  Users.findByUsername(username)
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      req.session.user = user
      res.status(200).json({message: "Welcome!"})
      console.log(req.session.user)
    } else {
      res.status(500).json({message: "Invalid Credentials."})
    }
  })
  .catch(error => {
    res.status(500).json({message: "Invalid Credentials."})
  })
});

module.exports = router;
