const app = require('./app.js');
const chalk = require('chalk');
const config = require('config');
const port = config.port;

var server = app.listen(port, function () {
    const startMessage ='The Rot13 app has started on port: ' + port;
    console.log(chalk.whiteBright(startMessage));
});
