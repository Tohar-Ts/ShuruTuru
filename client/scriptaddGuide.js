$(document).ready(function () {
    $("form[name='guide_form']").validate({
      rules: {
        "guide_name":{
          required: true,
          minlength: 2
        },
        "email":{
          required: true,
          "email" :true
        },
        "phone":{
          required: true,
          minlength: 9
        },
      },

      //validation error messages
      messages: {
        email: "insert correct email",
        guide_name:{
          minlength: "name must be at least 2 characters long"
        },
        phone:{
          minlength: "phone must be 9 digits and up"
        }
      },
    });
    $('#guide_form').submit(function (event) {
      if(!$("#guide_form").valid()) return;
      $.ajax({
          type: 'POST',
          url: '/guide',
          contentType: 'application/json',
          data: JSON.stringify({
                "name" : $("#guideName").val(),
                "email" : $("#email").val(),
                "cellular" : $("#phone").val(),
            },
          ),
          processData: false,
          encode: true,
          success: function( data){
            alert("New Guide was added");
            location.href = "/main";
          },
          error: function(request, status, error){
              if(error == "Bad Request"){
                  alert("There was a problem, Note- you can't create guide with name that already exist");
              }
              else{
                alert("Error! check fields");
              }
          }
      })
      event.preventDefault();
  });

});
