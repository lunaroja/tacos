// Helper for getting the `?ID=` part form the URL
var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Airtable API Key, unique per user
var api_key = 'key2m8VgwGT2iztad';

// Template that generates the HTML for one item in our list view, given the parameters passed in
var listView = function(id, name, pictureUrl, neighborhood, rating) {
  return `<div class="col-sm-3">
    <div class="card mb-4 box-shadow">
      <a href="?id=${id}"><img class="card-img-top" src="${pictureUrl}"></a>
      <div class="card-body">
        <h2><a href="?id=${id}">${name}</a></h2>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${rating}</small>
        </div>
      </div>
    </div>
  </div>`;
}

// Get and display the data for all items
var getDataForList = function() {
  // 1. Gets the data from the Airtable API
  $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=${api_key}&view=Rating`, function( data ) {
    // console.log(data.records);
    var html = [];
    html.push(`<div class="row">`);
    // 2. Iterates over every record and uses the list template
    $.each( data.records, function( index, val ) {
      // console.log(val.fields)
      var id = val.id;
      var fields = val.fields;
      var name = fields["Name"];
      var pictureUrl = fields["Pictures"] ? fields["Pictures"][0].url : '';
      var neighborhood = fields["Neighborhood"];
      var rating = fields["Rating"];
      var itemHTML = listView(id, name, pictureUrl, neighborhood, rating);
      html.push(itemHTML);
    });
    html.push(`</div>`);
    // 3. Adds HTML for every item to our page
    $(".list-view").append(html.join(""));
  });
}

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, name, pictureUrl, neighborhood, rating, address, cost, website, lat, long) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${pictureUrl}">
      <div class="card-body">
        <h2>${name}</h2>
        <p class="card-text">${neighborhood}</p>
        <p class="card-text">${address}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${rating}</small>
          <small class="text-muted">${cost}</small>
        </div>
        ${website ? `<a href="${website}">${website}</a>`: ``}
        <hr />
        <a href="https://www.google.com/maps/search/${name} ${address}">
          <img alt="Map of Location" src="https://api.mapbox.com/v4/mapbox.streets/${long},${lat},15/600x200.jpg?access_token=pk.eyJ1IjoibHVuYXJvamEiLCJhIjoiY2o4b2x1NXlmMDN6NDMzbWtpMzExM3ppdiJ9.M8L9FACjOXRrZWrkurNjTg" />
        </a>
      </div>
    </div>
  </div>`;
}

// Get and display the data for one item based on on the ID
var getDataForId = function(id) {
  $.getJSON( `https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=${api_key}`, function( record ) {
    // console.log(data);
    var html = [];
    html.push(`<div class="row">`);
      // console.log(val)
      var id = record.id;
      var fields = record.fields;
      var name = fields["Name"];

      var pictureUrl = fields["Pictures"] ? fields["Pictures"][0].url : '';
      var neighborhood = fields["Neighborhood"];
      var rating = fields["Rating"];
      var address = fields["Address"];
      var cost = fields["Cost"];
      var website = fields["Website"];
      var delivery = fields["Delivery"];
      var lat = fields["Latitude"];
      var long = fields["Longitude"];

      var itemHTML = detailView(id, name, pictureUrl, neighborhood, rating, address, cost, website, lat, long);
      html.push(itemHTML);
    html.push(`</div>`);
    $(".detail-view").append(html.join(""));
  });
}

// Do we have an ID in the URL?
var id = getParameterByName("id");

// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}
