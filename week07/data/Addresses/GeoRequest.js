// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config({path: '/home/ec2-user/environment/.env'});


// TAMU api key, keeping it safe & hidden!
dotenv.config();
const apiKey = process.env.TAMU_KEY;


/* Reading and parsing the week 2 JSON file. I saved out a special version with 
just the street addresses and not the building names etc. for using with the 
Geocoding API.*/
var data = fs.readFileSync('wk7_AddressesOnly_m09.json');
data = JSON.parse(data);


/* Initializing an empty array called meetingsData to later push locationData 
from tamuGeo into. Using a for loop to loop through the addresses in the week 2 
JSON file. */
var meetingsData = [];
let addresses = [];
for(var i = 0; i < data.length; i++) {
    addresses.push(data[i].streetAddress);
}


/* eachSeries in the async module iterates over an array and operates on each 
item in the array in series, %20 joins the split space with a space for the url.*/ 
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    
    
    /* Make a request to the API. Create variable locationData to select the 
    address, the latitude, and the longitude. Push the locationData into the 
    array meetingsData.*/
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            var locationData = {
                geoAddress: tamuGeo['InputAddress'],
                geoLat: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'],
                geoLong: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude']
            };
            console.log(tamuGeo["FeatureMatchingResultType"]);
            meetingsData.push(locationData);
        }
    });
    
    /* Use setTimeout to slow down the loop and handle asyncronicity. 
    Write meetingsData to a json file. Use console.logs to double check 
    process is working.*/
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('GeolocationData09.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});