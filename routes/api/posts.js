const express = require('express'),
  router = express.Router();

router.get('/test', (req, res) => { res.json({ test: 'test' }) });

module.exports = router;