/**
 * Created by leiko on 30/06/14.
 */
var mqtt = require('mqtt');

var host = 'mqtt.kevoree.org',
    port = 81,
    topic = 'kevoree';

var client = mqtt.createClient(port, host);
client.subscribe(topic);
console.log('connected & subscribed to mqtt://'+host+':'+port+'/'+topic);

client.on('message', function (topic, message) {
    console.log('topic', topic);
    console.log('message', message);
});

client.on('error', function (err) {
    console.log('MQTT Error: '+err.message);

});