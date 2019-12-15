var allMarkers;

$(function(){

    // this is jQuery! it listens for any time the user changes the drop down menu and when it does it calls the getResults() function.
    $('select').change(function() {
        // console.log(this.value);
        removeMarkers();
        getResults(this.value)
    });
});


function getResults(val) {
    // creates an object to store our variable(s) in that will be sent back to the server.
    // $('select[name="category"]').val() is jQuery and gets the current selected value from the dropdown.
    var parameters = {day:val};

    //this is AJAX and it calls the /blog endpoint on the serve r(in app.js) and sends the paramters object.
    $.get( '/aamap',parameters, function(data) {
        
        // data = data.filter(d=>d.day === val);
        // console.log(data);

        // When the server returns information, the returned data (hanlebars html) is added to the blogpost DIV.
        // Alternatively, if the server is sending back JSON data, you can use it to create a map or graph etc.
        // console.log(data)
        
        // var popupContent= (item.address);
        
        data.forEach(item => {
            // console.log(item.starttime);
            let itemSpecialInterest = item.specialinterest ? '<br>' + item.specialinterest : '';
            let itemMeetingType = item.meetingtype ? '<br>' + item.meetingtype : '';
            let itemMeetingAddress = item.address ? '<br>' + item.address : '';
            let itemMeetingBuilding = item.building ? '<br>' + item.building : '';
            let itemStartTime = item.starttime ? '<br>' + item.starttime : '';
            let itemEndTime = item.endtime ? "- " + item.endtime : '';
            L.marker( [item.lat, item.long] ).bindPopup(itemMeetingBuilding + itemMeetingAddress + itemMeetingType + itemSpecialInterest + itemStartTime + itemEndTime).addTo(allMarkers);
        });
    });
}

function removeMarkers() {
    allMarkers.clearLayers();
}


// put anything you would like to run on pageload inside here
function init() {
    
    map = L.map('map').setView([40.756902, -73.980421], 13);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
         subdomains: 'abcd',
         maxZoom: 19
    });
    CartoDB_Positron.addTo(map);
    allMarkers = L.layerGroup().addTo(map);
    
    getResults($('select').val())
        
}

// call the init function to start
init()