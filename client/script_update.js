

$(document).ready(function () {
    var pathArray = window.location.pathname.split('/');
    console.log(pathArray[2]);
    var id = pathArray[2];
    $("form[name='update_form']").validate({
        // Specify validation rules
        "start_date": {
          required: true,
        },
        "duration": {
          required: true,
        },
        "price": {
          required: true,
        }
      });

    // process the form
    $('#update_form').submit(function (event) {
        if(!$("#update_form").valid()) return;
        console.log("in submit");

        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: 'http://localhost:3001/trips/' +id, // the url where we want to POST
            contentType: 'application/json',
            data:parseData(),
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

    function parseData(){
      let data = {};
      let start_date = $("#start_date").val().split("-").reverse().join("-");
      let duration = $("#duration").val();
      let price = $("#price").val();
  
      if(start_date)
          data["start_date"] = start_date;
      if(duration)
          data["duration"] = duration;
      if(price)
          data["price"] = price;
  
      let result = JSON.stringify(data);
      return result;
  }
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