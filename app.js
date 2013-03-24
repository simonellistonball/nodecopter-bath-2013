// Run this to receive a png image stream from your drone.

var arDrone = require('ar-drone');
var cv = require('opencv');
var http    = require('http');
var fs = require('fs');

console.log('Connecting png stream ...');

var stream  = arDrone.createUdpNavdataStream();
var client = arDrone.createClient();
var udpControl = arDrone.createUdpControl();

var processingImage = false;
var lastPng;
//var face_cascade = new cv.CascadeClassifier('node_modules/opencv/data/haarcascade_frontalface_alt2.xml');
var navData;
var flying = false;
var startTime = new Date().getTime();
var log = function(s){
var time = ( ( new Date().getTime() - startTime ) / 1000 ).toFixed(2);
  console.log(time+" \t"+s);
}

//udpControl.config('video:video_channel','1');
//udpControl.flush();

/*client.config('general:navdata_demo','TRUE');
client.config('general:video_enabled','TRUE');
client.config('video:video_channel',0);
*/

var pngStream = arDrone.createPngStream();
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    console.log("got image");
    lastPng = pngBuffer;
  });
     

/*setInterval(function() {
	udpControl.config('video:video_channel','1');
	udpControl.flush();
}, 30);
*/

/*client.takeoff();
client.after(5000,function(){ 
  log("going up");
  this.up(1);
}).after(1000,function(){ 
  log("stopping");
  this.stop(); 
  flying = true;
});


client.after(10000, function() {
    flying = false;
    this.stop();
    this.land();
  });
*/
client.on('navdata', function(navdata) {
  navData = navdata;
})
/*
var server = http.createServer(function(req, res) {
	if (navData) {
		res.writeHead(200, { 'Content-Type': 'application/json'});
		res.end(JSON.stringify(navData));
	}
});
server.listen(8080, function() {});
*/
var imageserver = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});


imageserver.listen(8081, function() {
  console.log('Serving latest png on port 8081 ...');
});

