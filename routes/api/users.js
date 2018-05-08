const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const User = require('../../models/User');
const passport = require('passport');

// load input validation
const validateRegisterInput = require('../../validation/regeister');
// @route GET api/user/test 
// @desc testing 
// @access Public 
router.get('/test', (req, res) => { res.json({ test: 'test, hello' }) });

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exisits'
      return res.status(400).json(errors)
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: gravatar.url(req.body.email, {
          s: '200', // s for size
          r: 'pg', // r for rating 
          d: '404' // d for default 
        })
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err)
            throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})
// @route GET api/users/login 
// @desc Login User / Returning JWT Token 
// @ access Public 
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({ email: 'User not found' });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // payload for JWT 
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        // user matched
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 }, // user will be signed out after 1 hr. token need to start off as 'Bearer ' +
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      }
      else
        return res.status(400).json({ password: 'Password Incorrect' })
    })
  })
})
// @route GET api/users/current 
// @desc return current user
// @ access Private 
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    // res.json(req.user)
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  })

module.exports = router;