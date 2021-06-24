

$(document).ready(function () {
    var pathArray = window.location.pathname.split('/');
    console.log(pathArray[2]);
    var id = pathArray[2];

   
    $("form[name='update_form']").validate({
        // Specify validation rules
        rules: {
          "name":{
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
    $('#update_form').submit(function (event) {
        if(!$("#update_form").valid()) return;
        console.log("in submit");

        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: 'http://localhost:3001/trips/' +id, // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "start_date": $("#start_date").val().split("-").reverse().join("-"),
                "duration": $("#duration").val(),
                "price": $("#price").val(),
                "guide": {
                  "name" : $("#name").val(),
                  "email" : $("#email").val(),
                  "cellular" : $("#phone").val(),
              }
            }),
            processData: false,
            encode: true,
            success: function( data, textStatus, Qxhr ){
                console.log(data);
                location.href = "/main";
                alert("update");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( "ERROR:!!!" + errorThrown );
            }
        })
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
 //   $.ajax({
    //     url: 'http://localhost:3001/trips/' +id,
    //     type: 'PUT',
    //     data: JSON.stringify({
    //       "id": $("#tour_id").val(),
    //       "start_date": $("#start_date").val(),
    //       "duration": $("#duration").val(),
    //       "price": $("#price").val(),
    //       "guide": {
    //         "name" : $("#name").val(),
    //         "email" : $("#email").val(),
    //         "cellular" : $("#phone").val(),
    //     }
    //   }),
    //     processData: false,
    //     encode: true,
    //     success: function( data, textStatus, Qxhr ){
    //          console.log(data);
    //          location.href = "/main";
    //          alert("update");
    //      },
    //      error: function( jqXhr, textStatus, errorThrown ){
    //          console.log( "ERROR:" + errorThrown );
    //      }
    // });