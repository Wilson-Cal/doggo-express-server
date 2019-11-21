const express = require('express');

const { getDog, getDogs, updateDog, createDog, deleteDog } = require('../buisness/dogs.js');
const { baseUri } = require('../../config/app_config');

const router = express.Router();

/**
 * @typedef Dog
 * @property {integer} id
 * @property {integer} owner_id
 * @property {string} name.required
 * @property {string} type.required
 * @property {object} breed.required
 * @property {integer} age.required
 * @property {object} family.required
 * @property {boolean} available.required
 * @property {number} price.required
 * @property {string} color.required
 * @property {number} weight.required
 * @property {number} height.required
 */

/**
 * @route GET /dogs/{id}
 * @group Dogs
 * @param {string} id.path.required - The id of the dog
 * @returns {Dog.model} 200 - A dog object
 * @security JWT
 */
router.get(`${baseUri}/dogs/:id`, getDog);

/**
 * @route GET /{user_id}/dogs
 * @group Dogs
 * @param {integer} user_id.path.required - The id of the user
 * @returns {Array<Dog.model>} 200 - A dog object
 * @security JWT
 */
router.get(`${baseUri}/dogs/:id`, getDogs);

/**
 * @route PUT /dogs/{id}
 * @group Dogs
 * @param {string} id.path.required - The id of the dog
 * @param {Dog.model} dog.body.required - A dog object to update an existing dog
 * @returns {Dog.model} 200 - The updated dog object
 * @security JWT
 */
router.put(`${baseUri}/dogs/:id`, updateDog);

/**
 * @route POST /dogs
 * @group Dogs
 * @param {Dog.model} dog.body.required - A dog object to create
 * @returns {Dog.model} 200 - The newly created dog object
 * @security JWT
 */
router.post(`${baseUri}/dogs`, createDog);

/**
 * @route DELETE /dogs/{id}
 * @group Dogs
 * @param {string} id.path.required - The id of the dog
 * @returns {bool} 200 - Success or failure
 * @security JWT
 */
router.delete(`${baseUri}/dogs/:id`, deleteDog);

module.exports = router;