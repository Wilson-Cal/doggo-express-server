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
    const insertQuery = `INSERT INTO dog(owner_id, dog_name, dog_type, age, available, price, color, dog_weight, dog_height) VALUES('${owner_id}', '${name}', '${type}', '${age}', '${available}', '${price}', '${color}', '${weight}', '${height}')`;
    try {
        dbRequest(insertQuery);
        const getQuery = 'SELECT * FROM dog';
        const dogs = dbRequest(getQuery);
        dogs.requestSql = insertQuery;
        res.contentType('application/json');
        res.send(JSON.stringify(dogs));
    } catch (err) {
        res.contentType('application/json');
        res.sendStatus(500);
        res.send(JSON.stringify(err));
    }
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