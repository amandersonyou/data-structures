# Week 02 Assignment 

For this week's assignment, we are tasked with using node.js and cheerio to 
read one of the assigned text files from Week 01 and save the addresses from 
that file in a variable. The addresses will be used in future assignments, so 
storing the data in a accessible way is important.


The starter code provided:
```
// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text());
});

// write the project titles to a text file
var thesisTitles = ''; // this variable will hold the lines of text

$('.project .title').each(function(i, elem) {
    thesisTitles += ($(elem).text()).trim() + '\n';
});

fs.writeFileSync('data/thesisTitles.txt', thesisTitles);
```


The html I'm working with lacks consistent structure, and therefore I need to 
use a few tools to narrow in on just the address information I need.

As I began, I realized I was repeating steps and decided to make a function to 
use when I loop through for the various elements. 
```
// parses addresses in html
function addressParser(elem, a1, a2) {
    var columnName = $(elem)
        .children()
        .html()
        .split('<br>')[a1,a2];
        return columnName;
}
```


The furthest into the DOM I could navigate and still obtain all the information
needed was through three 'tr' levels. I used a for loop to then create variables
for the Building Name, Street Address, City, State, and Zipcode. Each variable 
required some special attention using cheerio methods such as split(), slice(), 
and trim() to clean up the resulting html. I chose to work with html vs. text in
order to utilize symbols for splits.

For each variable in the for loop, I added row.push(variableName) to have each 
loop through the code block create an array.
```
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
```


![ExampleResult](images/TerminalViewArray.png?raw=true "Successful Terminal Output")

With a successful terminal output of arrays, I then moved on to creating a .csv 
file to store the information in for later use.
```
const labels = [
    ['Building Name', 'Street Address', 'City', 'State', 'Zip Code']
];

let csvLabels = "";

labels.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvLabels += row;
});
    
fs.writeFileSync('AA_Addresses_m010.csv', csvLabels);

```


Within the for loop, I then appended the previously written csv file to add 
each row:
```
    fs.appendFileSync('AA_Addresses_m010.csv', row + '\r\n', function (err) {
      if (err) throw err;
    });
```

The final result is a CSV file with each row containing an address.
![FinalResult](images/CSV_Success.png?raw=true "Successful CSV Output")


On a personal note, I'm new to working with JavaScript, HTML, navigating the 
DOM, and using js.node/Cheerio so this was a really tough assignment. I estimate
it took me about 25 hours of bumbling through, researching and trial and error 
to complete the assignment. I'm proud to have a usable final file!
