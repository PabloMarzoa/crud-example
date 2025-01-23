const express = require('express');
const router = express.Router();

const collectionsRouter = require('./foods.router');

router.use('/foods', collectionsRouter);

module.exports = router;
