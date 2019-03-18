const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const Actions = require('../helpers/action_methods').ActionMethods;
const ElrondService = require('../../services/elrond_service').ElrondService;

// Known Email Events that Xola Provides
const ORDER_CREATE_EMAIL = 'order.create.email';
const ORDER_UPDATE_EMAIL = 'order.update.email';
const ORDER_CANCEL_EMAIL = 'order.cancel.email';

// Hooks that the Xola app store sends across
const INSTALLATION_CREATE = 'installation.create';
const INSTALLATION_UPDATE = 'installation.update';
const INSTALLATION_DELETE = 'installation.delete';
const EMAIL_TRAVELER = "email.traveler";

router.get('/status', (req, res) => {
    res.status(200).send("OK");
});

router.use('*', bodyParser.json({limit: '256kb'}));

router.all('/register', (req, res) => {
    // Todo: Remove
    // console.log("\n");
    // console.log(req.body);
    // console.log("\n");

    const eventName = ElrondService.getEventName(req);

    console.log(eventName);
    switch(eventName) {
        case INSTALLATION_CREATE:
            Actions.installPlugin(req, res);
            break;
        case INSTALLATION_UPDATE:
            Actions.updatePlugin(req, res);
            break;
        case INSTALLATION_DELETE:
            Actions.uninstallPlugin(req, res);
            break;
        case EMAIL_TRAVELER:
            Actions.encodeEmail(req, res);
            break;
        default:
            res.status(400).send('This is not a valid request.');
    }
});

router.all('/encode', (req, res) => {
    Actions.encodeEmail(req, res);
});

router.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.error);
});

module.exports = router;
