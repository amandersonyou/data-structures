/*Original version created. Updated Assignment02.1 with class review revisions.
This version created a csv file with the requested information.*/

// create constant variables for fs and cheerio
const fs = require('fs');
const cheerio = require('cheerio'); // npm install cheerio

// load the AA Map 10 text file into a variable, `content`
// this is one of 10 text files from the AA maps
const content = fs.readFileSync('../week01/data/m010.txt');

// load `content` into a cheerio object
const $ = cheerio.load(content);


// create labels for csv file and write file using fs
const labels = [
    ['Building Name', 'Street Address', 'City', 'State', 'Zip Code']
];

let csvLabels = "";

labels.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvLabels += row;
});
    
fs.writeFileSync('AA_Addresses_m010.csv', csvLabels);


// parses addresses in html
function addressParser(elem, a1, a2) {
    var columnName = $(elem)
        .children()
        .html()
        .split('<br>')[a1,a2];
        return columnName;
}

// call function and loop through full html doc for each row in CSV
$('tr tr tr').each((i, elem) => {
    var row = [];
    var buildingName = addressParser(elem, 0, 0);
    /* sliced at 54 to select only the building name. Slice limit at 100 to 
    accomidate longer names, and split at '<'' to end before h4 tag.*/
    buildingName = buildingName.slice(54,100).split('<', 1)[0].trim();
    // used valueOf() to eliminate empty string
    if (buildingName.valueOf() != 'undefined' ) {
        row.push(buildingName);
    }
    var streetAddress = addressParser(elem, 1, 2);
    /* used typeof to remove undefined result and keep strings. Split 
    streetAddress to remove unnecessary information. Used trim() to remove 
    extra white space.*/
    if (typeof streetAddress === 'string') {
        streetAddress = streetAddress.split(',', 1)[0].split('@', 1)[0].trim();
        row.push(streetAddress);
        const cityName = 'New York City';
        row.push(cityName);
        const stateName = 'NY';
        row.push(stateName);
    }
    /* used typeof to remove undefined result and keep strings. Sliced at 
    negative indexes to select zipcode from end of string.*/
    var zipCode = addressParser(elem, 1, 3);
    if (typeof zipCode === 'string') {
        zipCode = zipCode.slice(-12,-7);
        row.push(zipCode);
    }
    /* used appendFileSync to add each row to the previously written file. */
    fs.appendFileSync('AA_Addresses_m010.csv', row + '\r\n', function (err) {
      if (err) throw err;
    });

});