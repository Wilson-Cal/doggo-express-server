const dbRequest = require('./db_request.js');

const getDog = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

const updateDog = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

const createDog = (req, res) => {
    const { owner_id, name, type, age, available, price, color, weight, height } = req.body;
    const validated = owner_id && name && type && age && available && price && color && weight && height;
    res.contentType('application/json');
    res.send(JSON.stringify({ validated }));
};

const deleteDog = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

module.exports = {
    getDog,
    updateDog,
    createDog,
    deleteDog
};