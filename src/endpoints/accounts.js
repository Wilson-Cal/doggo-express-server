const express = require('express');

const { login } = require('../buisness/accounts.js');
const { baseUri } = require('../../config/app_config.js');

const router = express.Router();

router.post(`${baseUri}/login`, login);

module.exports = router;