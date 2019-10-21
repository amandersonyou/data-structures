/* Assignment02.1 is a revision of Assignment02 after reviewing in class. I'm 
keeping both versions to show two different paths to obtain the requested 
information. This version created the .json file.*/

// create constant variables for fs and cheerio
const fs = require('fs');
const cheerio = require('cheerio'); // npm install cheerio

// load the AA Map 10 text file into a variable, `content`
// this is one of 10 text files from the AA maps
const content = fs.readFileSync('m01.txt');

// load `content` into a cheerio object
const $ = cheerio.load(content);

var meetingData = [];

/*Find the table data cell (td) that contains a unique identifier within style.
Use this to find, split and trim the event name. Create an object for each meeting 
called thisMeeting, and save all meetings into an array called meetingData.*/
$('td').each(function(i, elem) {
    // if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px') {
        // var thisMeeting = {};
        // thisMeeting.eventName = ($(elem).html().split('<b>')[1].trim().split('</b>')[0]);
    if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3;width:350px;') {
        var thisMeeting = {};
        thisMeeting.day =($(elem).html().split('<b>')[1].trim().split('From')[0]);
        thisMeeting.startTime =($(elem).html().split('</b>')[1].trim().split('<b>')[0]);
        thisMeeting.endTime =($(elem).html().split('</b>')[2].trim().split('<br>')[0]);
        thisMeeting.type =($(elem).html().split('</b>')[3].trim().split('meeting')[0]);
        thisMeeting.specialInterest =($(elem).html().split('<br>')[2].trim().split('</b>'));

        meetingData.push(thisMeeting);
    }
// }
});

        
console.log(meetingData);

// // Write the file as a JSON file to access later using geo services.
// fs.writeFileSync('wk7_eventName_m09.json', JSON.stringify(meetingData));









