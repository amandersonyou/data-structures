/* Not working code, attempt at parsing the wheelchair access*/

// create constant variables for fs and cheerio
const fs = require('fs');
const cheerio = require('cheerio'); // npm install cheerio
const content = fs.readFileSync('../week01/data/m010.txt');

// load `content` into a cheerio object
const $ = cheerio.load(content);

var meetingData = [];

$('span').each(function(i, elem) {
    if ($(elem).attr('style')=='color:darkblue; font-size:10pt;') {
        var thisMeeting = {};
        thisMeeting.accessible = ($(elem).html().split('<span>')[0].trim());
        meetingData.push(thisMeeting);
    }
});

        
console.log(meetingData);

// // Write the file as a JSON file to access later using geo services.
// fs.writeFileSync('wk2_AddressesOnly_m010.json', JSON.stringify(meetingData));









