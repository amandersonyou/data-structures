$(function(){

    // this is jQuery! it listens for any time the user changes the drop down menu and when it does it calls the getResults() function.
    $('select').change(function() {
        getResults()
    });
});


function getResults(){
    // creates an object to store our variable(s) in that will be sent back to the server.
    // $('select[name="project"]').val() is jQuery and gets the current selected value from the dropdown.
    var parameters = {project: $('select[name=project]').val()};
        // console.log(parameters)

    //this is AJAX and it calls the /blog endpoint on the server(in app.js) and sends the paramters object.
    $.get( '/blog',parameters, function(data) {
            // console.log("test")
            console.log(data)
        // When the server returns information, the returned data (handlebars html) is added to the blogpost DIV.
        // Alternatively, if the server is sending back JSON data, you can use it to create a map or graph etc.
        $('.blogposts').html(data)
    });
}
 getResults()
