const express = require('express');

const { getUser, updateUser, createUser, deleteUser } = require('../buisness/users.js');
const { baseUri } = require('../../config/app_config.js');

const router = express.Router();

/**
 * @typedef User
 * @property {integer} id.required
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} zip_code.required
 */

/**
 * @route GET /users/{id}
 * @group Users
 * @param {string} id.path.required - The id of the user
 * @returns {User.model} 200 - A user object
 */
router.get(`${baseUri}/users/:id`, getUser);

/**
 * @route PUT /users/{id}
 * @group Users
 * @param {string} id.path.required - The id of the user
 * @param {User.model} user.body.required - A user object to update an existing user
 * @returns {User.model} 200 - The updated user object
 */
router.put(`${baseUri}/users/:id`, updateUser);

/**
 * @route POST /users
 * @group Users
 * @param {User.model} user.body.required - A user object to create
 * @returns {User.model} 200 - The newly created user object
 */
router.post(`${baseUri}/users`, createUser);

/**
 * @route DELETE /users/{id}
 * @group Users
 * @param {string} id.path.required - The id of the user
 * @returns {bool} 200 - Success or failure
 */
router.delete(`${baseUri}/users/:id`, deleteUser);

module.exports = router;