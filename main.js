var favoriteButton = function(id, favorite) {
return `
  <button
  class="star btn btn-light"
  data-favorite="${favorite}"
  data-id="${id}"
  title="${favorite == 'Yes' ? `Remove from Favorites` : `Add to Favorites`}"
  >
  ${favorite == 'Yes' ? '★' : '☆'}
  </button>
`
}

// Template that generates the HTML for one item in our list view, given the parameters passed in
var listView = function(id, name, pictureUrl, neighborhood, rating, favorite) {
  return `<div class="col-sm-3">
    <div class="card mb-4 box-shadow">
      ${favoriteButton(id, favorite)}
      <a href="index.html?id=${id}"><img class="card-img-top" src="${pictureUrl}"></a>
      <div class="card-body">
        <h4><a href="index.html?id=${id}">${name}</a></h4>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${neighborhood}</small>
          <small class="text-muted">${rating}</small>
          </div>
      </div>
    </div>
  </div>`;
};

// Get and display the data for all items
var getDataForList = function() {
  // 1. Gets the data from the Airtable API
  $.getJSON(
    `https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=${api_key}&view=Rating`,
    function(data) {
      // console.log(data);
      var html = [];
      html.push(`<div class="row">`);
      // 2. Iterates over every record and uses the list template
      $.each(data.records, function(index, record) {
        // console.log(record)
        var id = record.id;
        var fields = record.fields;
        var name = fields["Name"];
        var pictureUrl = fields["Pictures"] ? fields["Pictures"][0].url : "";
        var neighborhood = fields["Neighborhood"];
        var rating = fields["Rating"];
        var favorite = fields["Favorite"];
        // Pass all fields into the List Template
        var itemHTML = listView(id, name, pictureUrl, neighborhood, rating, favorite);
        html.push(itemHTML);
      });
      html.push(`</div>`);
      // 3. Adds HTML for every item to our page
      $(".list-view").append(html.join(""));
    },
  );
};

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, name, pictureUrl, neighborhood, rating, address, cost, website, about, type, favorite, lat, long) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      ${favoriteButton(id, favorite)}
      <img class="card-img-top" src="${pictureUrl}">
      <div class="card-body">
        <h2>${name}</h2>
        <p class="card-text">${type} in ${neighborhood}</p>
        <p class="card-text">${address}</p>
        ${about ? `<p class="card-text">${about}</p>` : ``}
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${rating}</small>
          <small class="text-muted">${cost}</small>
        </div>
        ${website ? `<a href="${website}">${website}</a>` : ``}
        <hr />
        <a href="https://www.google.com/maps/search/${name} ${address}">
        ${lat && long ? `<img class="img-fluid" alt="Map of Location" src="https://api.mapbox.com/v4/mapbox.streets/${long},${lat},15/600x200.jpg?access_token=pk.eyJ1IjoibHVuYXJvamEiLCJhIjoiY2o4b2x1NXlmMDN6NDMzbWtpMzExM3ppdiJ9.M8L9FACjOXRrZWrkurNjTg" />` : `Map of Location`}
        </a>
      </div>
    </div>
  </div>`;
};

// Get and display the data for one item based on on the ID
var getDataForId = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=${api_key}`,
    function(record) {
      // console.log(data);
      var html = [];
      html.push(`<div class="row">`);
      // console.log(record)
      var id = record.id;
      var fields = record.fields;

      var name = fields["Name"];
      var pictureUrl = fields["Pictures"] ? fields["Pictures"][0].url : "";
      var neighborhood = fields["Neighborhood"];
      var rating = fields["Rating"];
      var address = fields["Address"];
      var cost = fields["Cost"];
      var website = fields["Website"];
      var about = fields["About"];
      var type = fields["Type"];
      var favorite = fields["Favorite"];
      var lat = fields["Latitude"];
      var long = fields["Longitude"];

      // Pass all fields into the Detail Template
      var itemHTML = detailView(id, name, pictureUrl, neighborhood, rating, address, cost, website, about, type, favorite, lat, long);
      html.push(itemHTML);
      html.push(`</div>`);
      $(".detail-view").append(html.join(""));
    },
  );
};

// Do we have an ID in the URL?
var id = getParameterByName("id");

// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}

// Listener to update favorites
$(document).on('click', '.star', function(e) {
  var id = $(this).data('id');
  console.log($(this).data('favorite'))
  var  fields = {
    "Favorite": $(this).data('favorite') == 'Yes' ? 'No' : 'Yes'
  }
  $.ajax({
    url: `https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=${api_key}`,
    method: 'PATCH',
    data: {
      "fields": fields
    },
    success: function(data) {
      location.reload();
    }
  })

})
