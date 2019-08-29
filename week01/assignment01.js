// npm install request
// mkdir data

// set up variables to use node.js within a function
var request = require('request');
var fs = require('fs');

var urls = [
    'https://parsons.nyc/aa/m01.html', 
    'https://parsons.nyc/aa/m02.html',
    'https://parsons.nyc/aa/m03.html',
    'https://parsons.nyc/aa/m04.html',
    'https://parsons.nyc/aa/m05.html',
    'https://parsons.nyc/aa/m06.html',
    'https://parsons.nyc/aa/m07.html',
    'https://parsons.nyc/aa/m08.html',
    'https://parsons.nyc/aa/m09.html',
    'https://parsons.nyc/aa/m10.html'];

// create a function to get the urls including request() within this function

function getUrl(i) {
    request(urls[i], function(error, response, body){
    if (!error && response.statusCode == 200) {
        // console.log ('/home/ec2-user/environment/data/m0'+i+'.txt', body);
        fs.writeFileSync('/home/ec2-user/environment/data/m0'+(i+1)+'.txt', body);
    }
    else {console.log("Request failed!")}
    })
};


// create a for loop to cycle through the 10 html files saving each utilizing the 
// getURL funtion 

for (var i=0; i<10; i++) {
    // console.log (urls[i]);
    getUrl(i)
}

