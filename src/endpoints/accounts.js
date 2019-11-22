const express = require('express');

const { login, signup } = require('../buisness/accounts.js');
const { baseUri } = require('../../config/app_config.js');

const router = express.Router();

router.post(`${baseUri}/login`, login);

router.post(`${baseUri}/signup`, signup);

module.exports = router;