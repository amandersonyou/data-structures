// create constant variables for fs and cheerio
const cheerio = require('cheerio'); // npm install cheerio
var fs = require('fs');
const { Client } = require('pg');
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config({path: '/home/ec2-user/environment/.env'});

// load the text files one by one into variable content
var zone = '10'
var content = fs.readFileSync('/home/ec2-user/environment/week07/data/WebsiteTextFiles/m'+zone+'.txt');

// use cheerio to parse the content
var $ = cheerio.load(content);

// Include the PostgresSQL table to align with Location ID from location table
// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'amandersonyou';
db_credentials.host = 'data-structures.c1djtcjeelqp.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aa_location;";


// Note: majorly helped with the below by classmate Lulu's code shared on her github!
client.query(thisQuery, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        var meetingData = []; 
        let locationData = res.rows;
        client.end();
        
        $('tr').each(function(l, trElem) {
            
            var address;
            
            $(trElem).children().each(function(i,elem) {
                
                if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
                    var streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];
                    address = streetAddress; 
                }
                /* locating the day, start time, endtime, and meeting type 
                within the txt file by navigating through the style tag */
                if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3;width:350px;"){
                    // console.log(address);
                    var meetingDetails = $(elem).text().trim(); 
                    meetingDetails = meetingDetails.replace(/[ \t] + /g, " ").trim(); 
                    meetingDetails = meetingDetails.replace(/[ \r\n | \n]/g, " ").trim(); 
                    meetingDetails = meetingDetails.replace(/[ \t]/g, " ").trim();
                    meetingDetails = meetingDetails.split('                    '); 
                    // console.log(meetingDetails); 
                    
                    // matching to the location id in the location SQL table
                    var thisMeeting = {}; 
                    for (var i = 0; i < locationData.length; i++){
                        if (locationData[i].address == address){
                           var idF = locationData[i].locationid;
                           thisMeeting.id = idF;
                        }
                    }
                    
                    /* Parsing the meeting time information. Each location id is 
                    an object, and within the meetings there is an array of objects 
                    where each object is a specific meeting day, time, and type.*/
                    var thisMeetingDetails = [];
                    for (var i=0;i<meetingDetails.length;i++) {
                        var thisMeetingDetailObj = {};
                        thisMeetingDetailObj.day = meetingDetails[i].trim().split(" ")[0];
                        thisMeetingDetailObj.startTime = meetingDetails[i].trim().split("From")[1].trim().split('to')[0]; 
                        thisMeetingDetailObj.endTime = meetingDetails[i].trim().split("to")[1].trim().split('Meeting')[0];
                        if (meetingDetails[i].trim().split("Type")[1]) {
                            thisMeetingDetailObj.type = meetingDetails[i].trim().split("Type")[1].trim().split("Special")[0];
                        } else {
                            //console.log('no meeting type found : \n', meetingDetails);
                            thisMeetingDetailObj.type = 'none';
                        }

                        // include special interest details where available
                        thisMeetingDetailObj.specialInterest = meetingDetails[i].trim().split("Interest")[1];
                        thisMeetingDetails.push(thisMeetingDetailObj);
                    }
                    thisMeeting.meetings = thisMeetingDetails;
                    // console.log(thisMeeting);
                    
                    meetingData.push(thisMeeting); 
                }
            }); 
        });
        // console.log(meetingData[0]);
        fs.writeFileSync('/home/ec2-user/environment/week07/data/Events/EventDetails'+zone+'.JSON', JSON.stringify(meetingData));
    }
});







// Notes below for future reference.

/*Find the table data cell (td) that contains a unique identifier within style.
Use this to find, split and trim the event name. Create an object for each meeting 
called thisMeeting, and save all meetings into an array called meetingData.*/
// $('td').each(function(i, elem) {
//     // if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px') {
//         // var thisMeeting = {};
//         // thisMeeting.eventName = ($(elem).html().split('<b>')[1].trim().split('</b>')[0]);
//     if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3;width:350px;') {
//         var thisMeeting = {};
//         thisMeeting.day =($(elem).html().split('<b>')[1].trim().split('From')[0]);
//         thisMeeting.startTime =($(elem).html().split('</b>')[1].trim().split('<b>')[0]);
//         thisMeeting.endTime =($(elem).html().split('</b>')[2].trim().split('<br>')[0]);
//         thisMeeting.type =($(elem).html().split('</b>')[3].trim().split('meeting')[0]);
//         thisMeeting.specialInterest =($(elem).html().split('<br>')[2].trim().split('</b>'));

//         meetingData.push(thisMeeting);
//     }
// // }
// });

        
// console.log(meetingData);

// // Write the file as a JSON file to access later using geo services.
// fs.writeFileSync('wk7_eventName_m09.json', JSON.stringify(meetingData));









