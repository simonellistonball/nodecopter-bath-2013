NodeCopter Bath
===============

So, on 23 Mar 2013, we struggled through the Cambridge snow to go to a NodeCopter in Bath. 

A hack day is not the time for pretty code, so here is some really ugly code. 

* basic.js is a set of basic test animations, used to get the hang of the drone, and how we could express things.
* cvtest.js is our scratchpad for throwing images through the opencv lab. 
* repl.js was just there to take immediate control. It also got used a fair amount to just make the drone land after other programs quit out unexpectedly. Something which happened a lot.

So, onto the real stuff. 

The plan was to use opencv to do something, so we started off with a few samples based on [https://github.com/paulhayes/copterface copter face] and hacked it around to do a few extra things. Copterface gave us most of the 'find a face and centre on it' functionality. We wanted it to find people and respond to them properly.

Essentially, we trained it to behave like my cat. A stranger gets close, it reacts (nods a greeting), get too close and it freaks out and runs away. 

So we have app.js and the more worked on *face.js*

To run it needs opencv module, which requires ffmpeg (yeah, that took some time to find). 

We did try taking on the main opencv library haarcascade files to add smile detection, so the drone could be more friendly. *smile.js* is the result of this. However, the decision tree didn't seem very successful, managing to detect more or less everything in the shot that wasn't a smile (smiles.png).