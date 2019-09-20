const { Client } = require('pg');
var async = require('async');
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

var db_credentials = new Object();
db_credentials.user = 'amandersonyou';
db_credentials.host = 'data-structures.c1djtcjeelqp.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

var content = fs.readFileSync('/home/ec2-user/environment/week03/GeolocationData10.json');
content = JSON.parse(content);
// console.log(content.length);

// var addressesForDb = [ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];
var addressesForDb = [];
var addressesCheck = [];
// Create new array that has no duplicate locations from last week's assignment.
for (var i = 0; i < content.length; i++) {
    var latLonCombined = content[i]['geoLat'] + content[i]['geoLong'];
    if (addressesCheck.includes(latLonCombined) == false) {
        addressesForDb.push(content[i]);
        addressesCheck.push(latLonCombined);
    }
}

//console.log(addressesForDb);

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aa_geolocation VALUES (E'" + value.geoAddress.StreetAddress + "', " + value.geoLat + ", " + value.geoLong + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 