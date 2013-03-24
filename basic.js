var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff();

client
  .after(1000, function() {
    this.up(1);
  })
/*  .after(4000, function() {
    this.stop();
    this.animate('thetaDance', 100);
    // nodding
  })*/
  

  .after(4000, function() {
    this.stop();
    //this.animate('yawDance', 1000);

    this.animate('thetaDance', 1000);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });