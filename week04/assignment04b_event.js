const { Client } = require('pg');
var async = require('async');
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config({path: '/home/ec2-user/environment/.env'});

var db_credentials = new Object();
db_credentials.user = 'amandersonyou';
db_credentials.host = 'data-structures.c1djtcjeelqp.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


var content = fs.readFileSync('/home/ec2-user/environment/week07/data/Events/EventDetails10.JSON');
var eventContent = JSON.parse(content);
// console.log(content);


async.eachSeries(eventContent, function(meeting, callback) {
    async.eachSeries(meeting.meetings, function(value, callback) {
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO aa_event VALUES ('"+ meeting.id +"','"+ value.day +"','"+ value.startTime +"','" + value.endTime + "','" + value.type;
        if (value.specialInterest){ thisQuery += "','" + value.specialInterest}
        thisQuery += "');";
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
        setTimeout(callback, 1000); 
    });
    setTimeout(callback, 1000); 
}); 