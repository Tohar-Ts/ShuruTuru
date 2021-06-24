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
          "email":{
            "email" :true
          },
          "phone":{
            minlength: 9
          },
          // "price":{
          //   min: 1
          // }
        },
        // Specify validation error messages
        messages: {
          name: "Your name must be at least 2 characters long",
          tour_id:{
            minlength: "Id must be at least 2 characters long"
          },
          phone:{minlength: "Phone must be at least 9 characters long"
        },
        email: "email structure is some@domain "
        },
        // price: "insert positive number"
      });

    // process the form
    $('#tour_form').submit(function (event) {
        // let guideSelected = $("#guide_name").find(":selected").val().trim()+""
        // console.log("guide selected: " +  guideSelected)
        if(!$("#tour_form").valid()) return;
        $.ajax({
            type: 'POST',
            url: '/trip',
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $("#tour_name").val(),
                "start_date": $("#start_date").val().split("-").reverse().join("-"),
                "duration": $("#duration").val(),
                "price": $("#price").val(),
                // "guide": guideSelected
            }),
            processData: false,
            encode: true,
            success: function( data){
              alert("Tour was added sucssefuly.");
              location.href = "/main";
            },
            error: function(request, status, error){
              if(error == "Bad Request"){
                alert("Tour with this name exists");
                console.log( "Error: Tour with this name already exists! " + error);
              }
              else{
                alert("Error in  the server, maybe validation error. Check the fields and try again.");
                console.log( "Error in the server. " + error);
              }
            }
        })
        event.preventDefault();
    });
    });

});
