const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const dbURI = require('./config/keys').mongoDB.mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    dbURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('mongodb connected!!'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// server static assets if in production
// because app contain both server and client, this dic will be hosted, and the client app need to be pointed to by the server, ( server is being run and hosted) the client app is being build by the server; "heroku-postbuild" script in the package.json
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  // for any route, look in in the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}/`)
);
