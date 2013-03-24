var cv = require('opencv');
//console.log(cv.methods, cv.ImageStream);


cv.readImage('face-0.png', function(err, im) {
	console.log(im);
});