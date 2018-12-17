if (process.env.NODE_ENV === 'production') {
  module.exports = {
    githubClientId: process.env.githubClientId,
    githubClientSecret: process.env.githubClientSecret
  };
} else {
  module.exports = require('./secretKeys').keys;
}
