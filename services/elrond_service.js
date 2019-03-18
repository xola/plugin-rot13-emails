const axios = require('axios');
const config = require('config');

const ElrondService = {
    getEventName: (req) => {
        return (req.body && req.body.eventName) ? req.body.eventName : null;
    }
};

module.exports = {
    ElrondService: ElrondService
};
