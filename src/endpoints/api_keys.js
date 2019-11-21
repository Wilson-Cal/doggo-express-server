const express = require('express');

const { createApiKey, deleteApiKey } = require('../buisness/api_keys.js');
const { baseUri } = require('../../config/app_config.js');

const router = express.Router();

/**
 * @typedef APIRequest
 * @property {integer} user_id.required
 */

/**
 * @route POST /api_keys
 * @group Developer Keys
 * @param {APIRequest.model} user_id.body.required - The id of the user
 * @returns {string} 200 - A newly created API key
 * @security JWT
 */
router.post(`${baseUri}/api_keys`, createApiKey);

/**
 * @route DELETE /api_keys/{id}
 * @group Developer Keys
 * @param {string} id.path.required - The id of the API key
 * @returns {bool} 200 - Success or failure
 * @security JWT
 */
router.delete(`${baseUri}/api_keys/:id`, deleteApiKey);

module.exports = router;