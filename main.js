// This urls is from airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=key2m8VgwGT2iztad';

var cardTemplate = function(name, address, picture) {
return `
  <div class="card col-sm-4">
    <img src="${picture}" class="card-img-top"alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${address}</p>
      <a href="#" class="btn btn-primary">See Details</a>
    </div>
  </div>`;
}

// This is where we get the JSON data from Airtable!
$.getJSON( airtable_list_url, function( data ) {
  var items = [];
  $.each( data.records, function( key, val ) {
    // console.log(val.fields)
    var name = val.fields['Name'];
    var address = val.fields['Address'];
    var picture = val.fields['Pictures'][0] ? val.fields['Pictures'][0].url : null;
    var html = cardTemplate(name, address, picture);
    items.push(html);
  });
  $(".list-view").append(items.join(''));
});
