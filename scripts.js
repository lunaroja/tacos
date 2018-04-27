


var tacoListItem = function(id, name, pictureUrl, cuisine, rating) {
  return `<div class="col-sm-6">
    <div class="card mb-4 box-shadow">
      <a href="taqueria.html?id=${id}"><img class="card-img-top" src="${pictureUrl}"></a>
      <div class="card-body">
        <h2><a href="taqueria.html?id=${id}">${name}</a></h2>
        <p class="card-text">${cuisine}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="taqueria.html?id=${id}" class="btn btn-sm btn-outline-secondary">View details</a>
            <button type="button" class="btn btn-sm btn-outline-secondary">Add to favorites</button>
          </div>
          <small class="text-muted">${rating}</small>
        </div>
      </div>
    </div>
  </div>`;
}

$.getJSON( "https://api.airtable.com/v0/appSrgke7E0ElZhMY/Restaurants?api_key=key2m8VgwGT2iztad", function( data ) {
  // console.log(data.records);
  var items = [];
  items.push(`<div class="row">`);
  $.each( data.records, function( index, val ) {
    console.log(val.fields)
    var id = val.id;
    var name = val.fields["Name"];
    var pictureUrl = val.fields["Pictures"] ? val.fields["Pictures"][0].url : '';
    var cuisine = val.fields["Cuisine"];
    var rating = val.fields["Rating"];
    var itemHTML = tacoListItem(id, name, pictureUrl, cuisine, rating);
    items.push(itemHTML);
  });
  items.push(`</div>`);

  $(".taqueria-list" ).append(items.join(""));
});
