# Week 01 Assignment

### For this week's assignment, we are tasked with requesting and saving "Meeting List Agendas" pages from the html links provided utilizing Node.js.


```
https://parsons.nyc/aa/m01.html  
https://parsons.nyc/aa/m02.html  
https://parsons.nyc/aa/m03.html  
https://parsons.nyc/aa/m04.html  
https://parsons.nyc/aa/m05.html  
https://parsons.nyc/aa/m06.html  
https://parsons.nyc/aa/m07.html  
https://parsons.nyc/aa/m08.html  
https://parsons.nyc/aa/m09.html  
https://parsons.nyc/aa/m10.html 
```


Starter code was provided by our Instructor, Aaron Hill:


```
// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/thesis-2019/', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', body);
    }
    else {console.log("Request failed!")}
});
```


The starter code needed to be adjusted to write into our proper directories. 
It also needed to be formatted differently to successfully loop through all 10 
files and overcome the asynchronous behavior of JavaScript.


To do this, I created a function called getURL that would run the request() code.
I set the file names to write utilizing i+1 within the file location string.


```
function getUrl(i) {
    request(urls[i], function(error, response, body){
    if (!error && response.statusCode == 200) {
        // console.log ('/home/ec2-user/environment/data/m0'+i+'.txt', body);
        fs.writeFileSync('/home/ec2-user/environment/week01/data/m0'+(i+1)+'.txt', body);
    }
    else {console.log("Request failed!")}
    })
};
```


Then I created a for loop that would call the getURL function and loop through all 10 files.


```
for (var i=0; i<10; i++) {
    // console.log (urls[i]);
    getUrl(i)
}
```


This resulted in saving all 10 txt files to a data folder within my week01 environment.
I verified that the file content writed matched the appropriate html files provided by 
cross referencing the locations noted in the content between both files.
