const { Client } = require('pg'); // npm install dotenv
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config({path: '/home/ec2-user/environment/.env'});

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

// // Sample SQL statement to create a table: 
// // Original: var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
// var thisQuery = "CREATE TABLE aa_location (locationID varchar(100), building varchar(100), address varchar(100), lat double precision, long double precision);";
var thisQuery = "CREATE TABLE aa_event (locationID varchar(100), day varchar(100), startTime varchar(100), endTime varchar(100), meetingType varchar(100), specialInterest varchar(100));";
// // Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aa_main;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
console.log('successful');