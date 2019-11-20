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
    const insertQuery = `INSERT INTO dog(owner_id, dog_name, dog_type, age, available, price, color, dog_weight, dog_height) VALUES(${owner_id}, '${name}', '${type}', ${age}, ${available}, ${price}, '${color}', ${weight}, ${height})`;
    dbRequest(insertQuery);
    const getQuery = 'SELECT * FROM dog';
    const dogs = dbRequest(getQuery);
    res.contentType('application/json');
    res.send(JSON.stringify(dogs));
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