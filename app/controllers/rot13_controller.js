const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const Actions = require('../helpers/action_methods').ActionMethods;

// Hooks that the Xola app store sends across
const INSTALLATION_CREATE = 'installation.create';
const INSTALLATION_UPDATE = 'installation.update';
const INSTALLATION_DELETE = 'installation.delete';
const EMAIL_TRAVELER = "email.create";

router.get('/status', (req, res) => {
    res.status(200).send("OK");
});

router.use('*', bodyParser.json({limit: '256kb'}));

router.all('/register', (req, res) => {
    const eventName = Actions.getEventName(req);

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
    // This was only used to test using postman
    Actions.encodeEmail(req, res);
});

router.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.error);
});

module.exports = router;
