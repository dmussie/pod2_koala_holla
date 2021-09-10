console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    let koalaToSend = {
      name: $('#nameIn').val(),
      gender: $('#genderIn').val(),
      age: $('#ageIn').val(),
      ready_to_transfer: $('#readyToTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  });
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

//take the data from setUpClickListeners and sent it to the server
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
    // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala, //post koala object
    }).then(function(response) { //log response from server
      console.log('Response from server.', response);
      getKoalas();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add a koala. Please try again later.');
    });
}
 
