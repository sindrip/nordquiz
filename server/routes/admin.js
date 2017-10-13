const path = require('path');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

let generateAuthToken = (userID) => {
  var access = 'auth';
  var token = jwt.sign({id: userID, access}, process.env.JWT_SECRET).toString();
  return token;
}

var verifyToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    return true;

  } catch (e) {
    return false;
  }
}

var authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!verifyToken(token)) {
      throw null;
    }

    next();
  } catch (e) {
    return res.redirect('/admin/login');  
  }
}

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/login.html'));
});

router.post('/login', (req, res) => {
    const { user, password } = req.body;
    
    // GOOD HARDCODE YES, IS WORK THOUGH
    if (user != 'admin' && password != 'admin') {
      return res.sendFile(path.join(__dirname + '/../../public/login.html'));
    }

    const token = generateAuthToken('admin');
    return res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true })
      .redirect('/admin/dashboard');
});

router.get('/dashboard', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/admin.html'));
});

router.get('/logout', (req, res) => {
  return res.cookie('jwtToken', '', { maxAge: 900000, httpOnly: true })
    .redirect('/admin/login');
});

module.exports = router;
