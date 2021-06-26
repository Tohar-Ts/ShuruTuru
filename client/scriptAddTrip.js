$(document).ready(function () {
   
    $("form[name='tour_form']").validate({
        // Specify validation rules
        rules: {
          "name":{
            minlength: 2
          },
          "tour_id": {
            required: true,
            minlength: 2
          },
        },
        // Specify validation error messages
        messages: {
          name: "Your name must be at least 2 characters long",
          tour_id:{
            minlength: "Id must be at least 2 characters long"
          },
        },
      });

    // process the form
    $('#tour_form').submit(function (event) {
        if(!$("#tour_form").valid()) return;
        console.log("in submit");
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/trips', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
              "name": $("#tour_name").val(),
                "start_date": $("#start_date").val().split("-").reverse().join("-"),
                "duration": $("#duration").val(),
                "price": $("#price").val(),
                "guide": $("#guideName").val(),
              "path": []
            }),
            processData: false,
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data, textStatus, Qxhr ){
                console.log(data);
                location.href = "/main";
                alert("new trip added");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( "ERROR!:" + errorThrown );
            }
        })
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
