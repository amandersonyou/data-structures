// create constant variables for fs and cheerio
const fs = require('fs');
const cheerio = require('cheerio'); // npm install cheerio

// load the AA Map 10 text file into a variable, `content`
// this is one of 10 text files from the AA maps
const content = fs.readFileSync('m010.txt');

// load `content` into a cheerio object
const $ = cheerio.load(content);

var meetingData = [];

/*Find the table data cell (td) that contains a unique identifier within style.
Use this to find, split and trim the building name and the street address. Add
New York, New York for each address as all are in Manhattan. Create an object 
for each meeting called thisMeeting, and save all meetings into an array called
meetingData.*/
$('td').each(function(i, elem) {
    if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px') {
        var thisMeeting = {};
        thisMeeting.buildingName = ($(elem).html().split('<h4 style="margin:0;padding:0;">')[1].trim().split('</h4>')[0]);
        thisMeeting.streetAddress =($(elem).html().split('<br>')[2].trim().split(',')[0]).split(' @')[0];
        thisMeeting.city = 'New York';
        thisMeeting.state = 'New York';
        meetingData.push(thisMeeting);
    }
});

        
console.log(meetingData);

// // Write the file as a JSON file to access later using geo services.
// fs.writeFileSync('wk7_AddressesOnly_m09.json', JSON.stringify(meetingData));









