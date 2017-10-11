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
    console.log(decoded);
    return true;

  } catch (e) {
    return false;
  }
}

var authenticate = (req, res, next) => {
  try {
    console.log(req.cookies)
    const token = req.cookies.jwtToken;
    console.log('2')

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

// router.post('/users/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const { rows } = await pgPool.query('SELECT * FROM Users where email = $1', [email]);
//     if (rows.length === 0) {
//       return res.status(404).send();
//     }

//     const validLogin = await bcrypt.compare(password, rows[0].password);
//     if (!validLogin) {
//       return res.status(401).send();
//     }

//     const token = generateAuthToken(rows[0].id);
//     await pgPool.query('INSERT INTO Users_tokens(token, userID) VALUES($1, $2)', [token, rows[0].id]);
//     return res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true }).send();
//   } catch (e) {
//     console.log(e)
//     return res.status(400).send();
//   }
// });

// var generateAuthToken = (userID) => {
//   var access = 'auth';
//   var token = jwt.sign({id: userID, access}, process.env.JWT_SECRET).toString();
//   return token;
// }



module.exports = router;
