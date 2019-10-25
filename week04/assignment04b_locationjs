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


// Connect to the AWS RDS Postgres database
// const client = new Client(db_credentials);
// client.connect();

var content = fs.readFileSync('/home/ec2-user/environment/week07/data/Location/FullLocations/locationData10.json');
content = JSON.parse(content);
// console.log(content);

var addressesForDb = [];
var addressesCheck = [];
// Create new array that has no duplicate locations from last week's assignment.
for (var i = 0; i < content.length; i++) {
    var latLonCombined = content[i]['lat'] + content[i]['long'];
    if (addressesCheck.includes(latLonCombined) == false) {
        addressesForDb.push(content[i]);
        addressesCheck.push(latLonCombined);
    }
}

var zone = '10'; 
for (var i = 0; i < addressesForDb.length; i++){
  let id = zone+'_' + i;
  addressesForDb[i].id = id; 
}

console.log(addressesForDb);

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aa_location VALUES ('"+ value.id +"', '"+ value.building +"', E'" + value.address + "', " + value.lat + ", " + value.long + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 