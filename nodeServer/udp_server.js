exports.listen = function(callback){
    // load up environment settings based on NODE_ENV
    var config = require('./config/config.js')()
    var dgram = require('dgram');
    var server_udp = dgram.createSocket('udp4');
    //var redis = require('redis'); // redis instance for subscribing (can't read/write while subscribing)
    //var redis_connection = redis.createClient(config.redis.port, config.redis.host);

    var PORT = config.udp_server.port;
    var HOST = config.udp_server.address;

    // var spreadsheet = require('../helpers/spreadsheet');
    // var log_count = 10000; // write to log after 10,000 iterations per user - keep eye on this, won't be good with tons of users
    // var reset_time = 10; // for logging purposes if a device doesn't check in after 10 sec, we consider the connection dropped and a new one to start

    // declare variables for device
    var Ax = 0;
    var Ay = 0;
    var Az = 0;
    var Gx = 0;
    var Gy = 0;
    var Gz = 0;
    var Mx = 0;
    var My = 0;
    var Mz = 0;
    var device_id = "";
    var device_no = 0;
    var packet_type = "";
    var counter = 0;

    var direction = "";
    var tap_count = "";

    var sendCounter = 0; // send data every 3 records 

    var deviceArray; // array of devices on UDP


    var udpmessage_handler = function(message, remote) {
    //console.log("afhdsf");
        //console.log(message);   
        packet_type = message.toString('hex', 1, 2);
        device_no = message.toString('hex', 0, 1);
        device_id = parseInt(device_no,16);  

        // consolidate accel, gyro, mag
        if (packet_type == 0 || packet_type == 1 || packet_type == 7) { 
            sendCounter++; 
        }

        // for logging purposes
        // in_list(device_id);

        switch (packet_type) {

            case "00":
                //console.log("type 0 hit")
                Ax = parseInt(message.toString('hex', 2, 4), 16);  
                if ((Ax & 0x8000) > 0) {
                    Ax = Ax - 0x10000;
                }
                Ay = parseInt(message.toString('hex', 4, 6), 16);
                if ((Ay & 0x8000) > 0) {
                    Ay = Ay - 0x10000;
                }
                Az = parseInt(message.toString('hex', 6, 8), 16);
                if ((Az & 0x8000) > 0) {
                    Az = Az - 0x10000;
                }
                
                deviceArray[device_id][0]= Ax/2048;
                deviceArray[device_id][1]= Ay/2048;
                deviceArray[device_id][2]= Az/2048;
                
                break;
                
             case "01":
                //console.log("type 1 hit");
                 Gx = parseInt(message.toString('hex', 2, 4), 16);
                 if ((Gx & 0x8000) > 0) {
                     Gx = Gx - 0x10000;
                 }
                 Gy = parseInt(message.toString('hex', 4, 6), 16);
                 if ((Gy & 0x8000) > 0) {
                    Gy = Gy - 0x10000;
                }
                Gz = parseInt(message.toString('hex', 6, 8), 16);
                if ((Gz & 0x8000) > 0) {
                    Gz = Gz - 0x10000;
                }

                deviceArray[device_id][3]= Gx/65.5;
                deviceArray[device_id][4]= Gy/65.5;
                deviceArray[device_id][5]= Gz/65.5;

                break;

            case "07":
                //console.log("type 7 hit");
                Mx = parseInt(message.toString('hex', 2, 4), 16);
                if ((Mx & 0x8000) > 0) {
                    Mx = Mx - 0x10000;
                }
                My = parseInt(message.toString('hex', 4, 6), 16);
                if ((My & 0x8000) > 0) {
                    My = My - 0x10000;
                }
                Mz = parseInt(message.toString('hex', 6, 8), 16);
                if ((Mz & 0x8000) > 0) {
                    Mz = Mz - 0x10000;
                }
    		
                deviceArray[device_id][6]= Mx;
                deviceArray[device_id][7]= My;
                deviceArray[device_id][8]= Mz;

                break;

            case "08":
                //console.log("type 8 hit");
                Ax = parseInt(message.toString('hex', 2, 4), 16);  
                if ((Ax & 0x8000) > 0) {
                    Ax = Ax - 0x10000;
                }
                Ay = parseInt(message.toString('hex', 4, 6), 16);
                if ((Ay & 0x8000) > 0) {
                    Ay = Ay - 0x10000;
                }
                Az = parseInt(message.toString('hex', 6, 8), 16);
                if ((Az & 0x8000) > 0) {
                    Az = Az - 0x10000;
                }
                Gx = parseInt(message.toString('hex', 8, 10), 16);
                 if ((Gx & 0x8000) > 0) {
                     Gx = Gx - 0x10000;
                 }
                Gy = parseInt(message.toString('hex', 10, 12), 16);
                if ((Gy & 0x8000) > 0) {
                    Gy = Gy - 0x10000;
                }
                Gz = parseInt(message.toString('hex', 12, 14), 16);
                if ((Gz & 0x8000) > 0) {
                    Gz = Gz - 0x10000;
                }
                Mx = parseInt(message.toString('hex', 14, 16), 16);
                if ((Mx & 0x8000) > 0) {
                    Mx = Mx - 0x10000;
                }
                My = parseInt(message.toString('hex', 16, 18), 16);
                if ((My & 0x8000) > 0) {
                    My = My - 0x10000;
                }
                Mz = parseInt(message.toString('hex', 18, 20), 16);
                if ((Mz & 0x8000) > 0) {
                    Mz = Mz - 0x10000;
                }

                sendCounter=3;

                deviceArray[device_id][0]= Ax/4096;
                deviceArray[device_id][1]= Ay/4096;
                deviceArray[device_id][2]= Az/4096;

                deviceArray[device_id][3]= Gx*0.07;
                deviceArray[device_id][4]= Gy*0.07;
                deviceArray[device_id][5]= Gz*0.07;
            
                deviceArray[device_id][6]= Mx/10;
                deviceArray[device_id][7]= My/10;
                deviceArray[device_id][8]= Mz/10;

                break;

            case "03":
                // console.log("hellow tap");
            
                // this section is where we need to parse events 

                //            Buffer 33 03 01 02 
                //            Device ID = 33
                //            Packet Type = 03
                //            Direction = 01
                //            Count = 02

                direction = parseInt(message.toString('hex', 2, 3), 16);
                tap_count = parseInt(message.toString('hex', 3, 4), 16);

                data_package = {
                    'packet_type': packet_type,
                    'id': device_id,
                    'dr': direction,
                    'ct': tap_count, // are these calibrated values - comparable to other accelerometers?
                    'tm': Date.now() // time SHOULD really be coming from the device
                }
                //console.log(data_package);

                // put event into redis stream
             //  redis_connection.publish(("mode:stream|device:" + device_id), JSON.stringify(data_package)); // publish to redis channel

                // put event into redis event 
                //redis_connection.publish(("mode:stream|event:" + device_id), JSON.stringify(data_package)); // publish to redis channel

                break;

            default:
                // catch all
            break;
        
       }
        // Send sensor data every 3 packets
        if (sendCounter % 3 == 0) {
            data_package = {
                'packet_type': packet_type,   // this should be 9x
                'id': device_id,   // is this necessary ? 
                'ax': deviceArray[device_id][0], //Ax / 2048,
                'ay': deviceArray[device_id][1], //Ay / 2048,
                'az': deviceArray[device_id][2], //Az / 2048,
                'gx': deviceArray[device_id][3], //Gx / 65.5, //131.072,
                'gy': deviceArray[device_id][4], //Gy / 65.5, //131.072,
                'gz': deviceArray[device_id][5], //Gz / 65.5, //131.072,
                'mx': deviceArray[device_id][6], //Mx,
                'my': deviceArray[device_id][7], //My,
                'mz': deviceArray[device_id][8], //Mz,
                'tm': Date.now() // time
            }
            
            callback(data_package); 
           // redis_connection.publish(("mode:stream|device:" + device_id), JSON.stringify(data_package)); // publish to redis channel
            sendCounter = 0; 
        }

    };

    var listen_handler = function() {
        var address = server_udp.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);

        deviceArray = new Array(50); // support up to 50 devices 
        for (i=0; i <50; i++) {
            deviceArray[i]=new Array(9) // each device has a 9 element array to store 
        }

        server_udp.on('message', udpmessage_handler);

    };
    server_udp.on('listening', listen_handler);
    server_udp.bind(PORT, HOST);
    /*
    redis_connection.auth(config.redis.pass, function() {
        server_udp.on('listening', listen_handler);
        server_udp.bind(PORT, HOST);
    });*/
}
