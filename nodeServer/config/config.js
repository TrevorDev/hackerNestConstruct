module.exports = function() {

    var api_version = '/v1.0'; // this should be the same value as in server.js

    var config = {}
    config.redis = {};
    config.udp_server = {};
    config.websocket_server = {};
    config.web = {};
    config.socket_device = {};
    config.url = {};

    

    config.udp_server.port = 4000;
    config.udp_server.address = '10.16.102.123'

    config.redis.uri = 'redis://localhost';
    config.redis.user = '';
    config.redis.pass = ''; //make this what you like!
    config.redis.database = '';
    config.redis.host = 'localhost';
    config.redis.port = 6379;
    config.redis.transfer = 50; // the number of records stored to redis before persisting to mongo

    config.web.port = process.env.PORT || 5000;

    config.api = api_version;
    config.url.base = 'http://localhost';
    config.url.port = 'http://localhost' + ":" + config.web.port
    config.url.full = 'http://localhost' + ":" + config.web.port + api_version;
    config.url.force = 'localhost';

    return config;
 

};
