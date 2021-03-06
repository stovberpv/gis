var app = require.main.require('../app');
// var debug = require('debug')('gis:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '8080'); // TODO : env
app.set('port', port);

var server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

/**
 *
 *
 * @param {*} val
 * @returns
 */
function normalizePort (val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }

    return false;
}

/**
 *
 *
 * @param {*} error
 */
function onError (error) {
    if (error.syscall !== 'listen') { throw error; }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default: throw error;
    }
}

/**
 *
 *
 */
function onListening () {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    // debug('Listening on ' + bind);
}

module.exports = { server: server, port: port, http: http };
