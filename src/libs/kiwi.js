var socket = io.connect('http://build.kiwiwearables.com:8080');
var Kiwi = {};
Kiwi.xSpd = 0;
Kiwi.ySpd = 0;
var hit = 0;
socket.on('connect', function() {
socket.emit('listen', {device_id: '38', password: '123'});
});
socket.on('listen_response', function(data) {
var kiwi_data = JSON.parse(data.message);
//console.log(kiwi_data); // Kiwi sensor data is a JSON object

var packet_type = kiwi_data.packet_type; 
console.log("hit")
// Capture accelerometer and gyroscope data, or tap motion events
// 00 = raw sensor data
// 03 = motion events
if(!hit){
	console.log(kiwi_data)
	hit=1;
}

Kiwi.xSpd = kiwi_data.ax;
Kiwi.ySpd = kiwi_data.ay;
var acceleration_z = kiwi_data.az;
});