
/* Define URL */
const PORT = 3001;
const LOCAL_HOST = "http://localhost:"
const URL = LOCAL_HOST+PORT;
const TOURS_URL = URL+"/trips";
const TOUR_URL = URL+"/trip/";
const SITES_URL = URL+"/path/";
const ADD_TOUR_URL = URL+"/add_tour";
const ADD_GUIDE_URL = URL+"/add_guide";
// const EDIT_TOUR_URL = URL+"/edit_tour/";
// const ADD_SITE_URL = URL+"/add_site/";

/* HTTP Methods */
const GET = "get";
const POST = "post";
const PUT = "put";
const DELETE = "delete";

/* Global variables */
let tours_data;
let table;

$(document).ready(function(){

  function ajaxCall(http_method, url, success_func) {
    $.ajax({
        type: http_method,
        url: url,
        timeout: 5000,
        processData: false,
        success: function (data) {
            success_func(data);
        },
        error: function (request, status, error) {
            console.log("Error: data was not load properly."+ error);
        },
    });
}
function setData(data){
  tours_data = data;
  console.log(tours_data);
  create_table();
}
ajaxCall(GET, TOURS_URL, setData);

        // $.ajax({
        //     url:"http://localhost:3001/trips",
        //     dataType:'json',
        //     timeout: 5000,
        //     success: function(data) {
        //         items=[]; 
        //         for(r in data)
        //         {
        //             var key =r;
        //             //var id =data[r].id;
        //             items.push({
        //                         "id": data[r].id,
        //                         "start_date" : data[r].start_date,
        //                         "duration": data[r].duration,
        //                         "price" : data[r].price,
        //                         "guide" : data[r].guide,
        //                         "path" : data[r].path
        //                         });
        //         }
        //         creat_arr(items);
        //         sort_name_up(items);
        //         create_table(items);
        //      },
        //     error: function(req, status, errorMessage) {
        //         console.log(errorMessage);
        //     }
        // });

        let arr;
        var body = document.body;
        // function creat_arr(items){
        //     arr = JSON.parse(JSON.stringify(items));
        // }


        function create_table(){
            $("table").empty();
            $("table").remove();
            body = document.body;
            let tbl  = document.createElement('table');
            tbl.setAttribute('class',"tableClass");
            tbl.style.border = '1px solid black';
            let det;
            var tr = tbl.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Trip name"));
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Start Date"));
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Duration"));
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Price"));
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Guide"));
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Path"));
            
            tours_data.forEach(function(myDoc) { 
              console.log( "trip name: " + myDoc.name ); 
              var tr = tbl.insertRow(); //new row:
              //cell
              var td = tr.insertCell();
              td.appendChild(document.createTextNode(myDoc.name));
              td.style.border = '1px solid black';
               //cell
               var td = tr.insertCell();
               td.appendChild(document.createTextNode(myDoc.start_date));
               td.style.border = '1px solid black';
               //cel
               var td = tr.insertCell();
               td.appendChild(document.createTextNode(myDoc.duration));
               td.style.border = '1px solid black';
               //cell
               var td = tr.insertCell();
               td.appendChild(document.createTextNode(myDoc.price) );
               td.style.border = '1px solid black';
               //cell
               var td = tr.insertCell();
               det = document.createElement("button");
               det.appendChild(document.createTextNode("Click for guide details"));
               $(det).on('click', {parameter:myDoc.guide}, guide_info);
               td.style.border = '1px solid black';
               td.appendChild(det);
               //cell
               var td = tr.insertCell();
               det = document.createElement("button");
               det.appendChild(document.createTextNode("Click to view trip path"));
               var param = [myDoc.path, myDoc.name];
               $(det).on('click', {parameter:param}, path_list);
               td.style.border = '1px solid black';
               td.appendChild(det);
               // td.style.border = '1px solid black';
               //cell
               var td = tr.insertCell();
               det = document.createElement("button");
               det.appendChild(document.createTextNode("delete"));
               $(det).on('click', {parameter:myDoc.name},delete_trip);
               td.style.border = '1px solid black';
               td.appendChild(det);
               //cell
               var td = tr.insertCell();
               det = document.createElement("button");
               det.appendChild(document.createTextNode("update"));
               $(det).on('click', {parameter:myDoc.name},update_trip);
               td.style.border = '1px solid black';
               td.appendChild(det);
               //cell
               var td = tr.insertCell();
               det = document.createElement("button");
               det.appendChild(document.createTextNode("add path"));
               $(det).on('click', {parameter:myDoc.name},add_path);
               td.style.border = '1px solid black';
               td.appendChild(det);
            });
            body.appendChild(tbl);
            var p = document.createElement("p");
            body.append(p);
    }

    function add_path(event){
      var tripName = event.data.parameter;
      $("form").empty();
      $("form").remove();
      var f = document.createElement("form");
      f.setAttribute('method',"PUT");
      f.setAttribute('id',"add_path");
      f.setAttribute('name',"add_path");
    //  f.setAttribute('action',"submit.php");
  
      var i = document.createElement("input"); //input element, text
      i.setAttribute('type',"text");
      i.setAttribute('name',"siteName");
      i.setAttribute("placeholder", "enter path name");
      i.setAttribute("id", "nameID");

      var j = document.createElement("input"); //input element, text
      j.setAttribute('type',"text");
      j.setAttribute('name',"country");
      j.setAttribute("placeholder", "enter country name");
      j.setAttribute("id", "countryID");

      var s = document.createElement("input"); //input element, Submit button
      s.setAttribute('type',"submit");
      s.setAttribute('value',"Submit");
      f.appendChild(i);
      f.appendChild(j);
      f.appendChild(s);
      f.setAttribute('class',"center");
      document.getElementsByTagName('body')[0].appendChild(f);

      $('#add_path').submit(function (event) {
        console.log("in submit");
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: 'http://localhost:3001/path/' +tripName, // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $("#nameID").val(),
                "country": $("#countryID").val(),
            }),
            processData: false,
            encode: true,
            success: function( data, textStatus, Qxhr ){
                console.log(data);
                location.href = "/main";
                alert("site added to path");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( "ERROR:" + errorThrown );
            }
        })
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
    }
    function update_trip(event){
      var name = event.data.parameter;
      var url = 'http://localhost:3001/updateTrip/' + name;
      window.location.href = url;
    }

    function path_list(event){
        $("ul").empty();
        let path = event.data.parameter[0];
        body = document.body;
        let ul  = document.createElement('ul');
        if(!path){
          console.log("path is empty");
          return;
        }
        for(j = 0 ; j < path.length ; j++){
          var param = [];
          param.push(path[j].name);
          param.push(event.data.parameter[1]);
            let li = document.createElement('li');
            li.innerHTML = " City Name: " + path[j].name + ", In country: " + path[j].country + "  ";
            det = document.createElement("button");
            det.appendChild(document.createTextNode("delete"));
            $(det).on('click',{parameter:param}, delete_site);
            li.appendChild(det);
            ul.appendChild(li);
        }
        ul.setAttribute('class',"center");
        body.appendChild(ul);
    }
    function delete_site(event){
      var site_name = event.data.parameter[0];
      console.log(site_name);
      var trip_id = event.data.parameter[1];
      console.log(trip_id);
      $.ajax({
          url: 'http://localhost:3001/path/' +trip_id +'/'+site_name,
          type: 'DELETE',
          //contentType:'application/json',  // <---add this
          success: function(result) {
              console.log(site_name +" in trip: "+trip_id+ " deleted");
              location.href="/main";
          },
          error: function(result){
              console.log("could not delete");
          }
      });
  }

    function delete_trip(event){
      var tripName = event.data.parameter;
      $.ajax({
        type: DELETE,
        url: URL+"/trips/"+tripName,
        timeout: 5000,
        processData: false,
        success: function (data) {
          window.location.reload();

          history.go(0);
          window.location.href="/main";
        },
        error: function(result){
          console.log("could not delete");
        }
    });
    }

    function guide_info(event){
        $("ul").empty();
        console.log( event.data.parameter)
        let guide = event.data.parameter;
        body = document.body;
        let ul  = document.createElement('ul');
        let li1 = document.createElement('li');
        li1.innerHTML = guide.name;
        ul.appendChild(li1);
        let li2 = document.createElement('li');
        li2.innerHTML = guide.email;
        ul.appendChild(li2);
        let li3 = document.createElement('li');
        li3.innerHTML = guide.cellular;
        ul.appendChild(li3);
        ul.setAttribute('class',"center");
        body.appendChild(ul);

    }
    //sort:==============================================================================================
    $("#sort").change(function () {
      var dpt = document.getElementById("sort");
      $("ul").remove();
      val = dpt.options[dpt.selectedIndex].value;
      if (val == "name down"){
          sort_name_down();
      }
      if (val == "name up"){
          sort_name_up();
      }
      if (val == "dur down"){
          sort_dur_down();
      }
      if (val == "dur up"){
          sort_dur_up();
      }
      if (val == "price up"){
          sort_price_up();
      }
      if (val == "price down"){
          sort_price_down();
      }
      if (val == "date up"){
          sort_date_up();
      }
      if (val == "date down"){
          sort_date_down();
      }
      create_table(arr);
  })
  
     //SORT FUNCTION: ===============================================================================
     function sort_date_down(){
        tours_data.sort(function(a, b) {
            var dur1 = new Date(a.start_date.split("-").reverse().join("-"));
            var dur2 = new Date(b.start_date.split("-").reverse().join("-"));
            if (dur1 > dur2) {
              return -1;
            }
            if (dur1 < dur2) {
              return 1;
            }
            return 0;
          });
    }
    function sort_date_up(){
      tours_data.sort(function(a, b) {
            var d1 = new Date(a.start_date.split("-").reverse().join("-"));
            var d2 = new Date(b.start_date.split("-").reverse().join("-"));
            if (d1 < d2) {
              return -1;
            }
            if (d1 > d2) {
              return 1;
            }
            return 0;
          });
    }
    function sort_price_down(){
      tours_data.sort(function(a, b) {
            var p1 = parseInt(a.price);
            var p2 = parseInt(b.price);
            //console.log(typeof(p1));
            if (p1 > p2) {
              return -1;
            }
            if (p1 < p2) {
              return 1;
            }
            return 0;
          });
    }
    function sort_price_up(){
      tours_data.sort(function(a, b) {
            var p1 = parseInt(a.price);
            var p2 = parseInt(b.price);
            if (p1 < p2) {
              return -1;
            }
            if (p1 > p2) {
              return 1;
            }
            return 0;
          });
    }
    function sort_dur_down(){
      tours_data.sort(function(a, b) {
            var dur1 = parseInt(a.duration);
            var dur2 = parseInt(b.duration);
            if (dur1 > dur2) {
              return -1;
            }
            if (dur1 < dur2) {
              return 1;
            }
            return 0;
          });
    }
    function sort_dur_up(){
      tours_data.sort(function(a, b) {
            var dur1 = parseInt(a.duration);
            var dur2 = parseInt(b.duration);
            if (dur1 < dur2) {
              return -1;
            }
            if (dur1 > dur2) {
              return 1;
            }
            return 0;
          });
    }
    function sort_name_down(){
      tours_data.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            return 0;
          });
    }
    function sort_name_up(){
      tours_data.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
    }

});