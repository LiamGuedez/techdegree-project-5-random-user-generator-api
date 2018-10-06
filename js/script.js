
  function sendAJAX() {
      var array = [];
      var url = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob';
      var data = {};
      var callback = function(response) {
        array = response.results;
        console.log(array);
        console.log(response.results);
      };
      $.get(url, data, callback);
      console.log(array);
      return array;
  }

  // // //Image
  //
 // // // Name
 // // // Email
 // // // City or location
 // // // Cell Number
 // // // Detailed Address, including street name and number, state or country, and post code.
 // // // Birthday

  let anarray = sendAJAX();
  console.log(anarray);
