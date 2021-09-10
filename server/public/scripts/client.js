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
    //clear inputs 
    $('#nameIn').val('');
    $('#genderIn').val('');
    $('#ageIn').val('');
    $('#readyToTransferIn').val('');
    $('#notesIn').val('');
    
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  });
}

function getKoalas(){ //Danny
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response) {
    console.log('GET /koalas', response);
    appendKoalas(response);
  }).catch(function(error) {
    console.log('error in GET', error);
  });
} // end getKoalas

//append GET response to the DOM
function appendKoalas(koalas) {
  $('#viewKoalas').empty();
  for (let i = 0; i < koalas.length; i++) {
    $('#viewKoalas').append(`
    <tr>
      <td>${koalas[i].name}</td>
      <td>${koalas[i].age}</td>
      <td>${koalas[i].gender}</td>
      <td>${koalas[i].ready_to_transfer}</td>
      <td>${koalas[i].notes}</td>
    </tr>`);
  }
}

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

function setToReady() {
  const koalaId = $(this).data('id');
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
  }).then(function(response) {
    console.log('Set to ready!');
    getKoalas();
  }).catch(function(error) {
    alert('Something went wrong!');
    console.log('Error in PUT', error);
  });
}
 
