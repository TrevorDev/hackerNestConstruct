var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;
var request = require('request')
var bliss = require('tweet-bliss').createClient({
        consumer_key: 'Uwvepx6tB74QLytb0sg7Ng',
        consumer_secret: 'Dy9qIa2ULxFgTf7ACvrtNqpDC9xa0WKhoezZiJf0yiE',
        access_token_key: '942738733-LiB7TgcRvptg7iZfxw3H7jNsss6Zkt4SvLPBdH7v',
        access_token_secret: 'umzizaOMrMVbmz0VeiaMWM8Bog8cJeqLZElPdJv9fyiIO'
    });


bliss.streamUser('2357009004', function(user, text){
    if(user != ''){
        var searchAr = text.replace("@hackathonUOG","").split("-");
        if(searchAr.length >= 2){
            var what = searchAr[0]
            var where = searchAr[1]
            request('http://api.sandbox.yellowapi.com/FindBusiness/?pg=1&what='+what+'&where='+where+'&pgLen=5&lang=en&fmt=json&sflag=&apikey=xsdm6nnbkfwecmqjwbdeguhp&UID=1', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                places = JSON.parse(body) // Print the google web page.
                if(places.listings.length>=1){
                    var tweetResp = "@"+ user +" "+what+" located at "+places.listings[0].address.street + " " + places.listings[0].address.city;
                    bliss.composeTweet(tweetResp, function(err){});
                }
              }
            })
        }
    }    
});
 
var app = http.createServer(function(request, response) {
 
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");



var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
    console.log("hit")
  /*socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/
  socket.on('disconnect', function () {
    
  });
});

require('./udp_server.js').listen(function(obj){
  //console.log(obj);
  io.sockets.emit('kiwi', obj);
})