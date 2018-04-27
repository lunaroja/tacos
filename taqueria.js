var tacoDetail = function(id, name, pictureUrl, cuisine, rating, address) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <a href="taqueria.html?id=${id}"><img class="card-img-top" src="${pictureUrl}"></a>
      <div class="card-body">
        <h2><a href="taqueria.html?id=${id}">${name}</a></h2>
        <p class="card-text">${cuisine}</p>
        <p class="card-text">${address}</p>
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
 function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var id = getParameterByName("id", window.location.href);


$.getJSON( `https://api.airtable.com/v0/appSrgke7E0ElZhMY/Restaurants/${id}?api_key=key2m8VgwGT2iztad`, function( val ) {
  // console.log(data);
  var items = [];
  items.push(`<div class="row">`);

    console.log(val.fields)
    var id = val.id;
    var name = val.fields["Name"];
    var pictureUrl = val.fields["Pictures"] ? val.fields["Pictures"][0].url : '';
    var cuisine = val.fields["Cuisine"];
    var rating = val.fields["Rating"];
    var address = val.fields["Address"];
    var itemHTML = tacoDetail(id, name, pictureUrl, cuisine, rating, address);
    items.push(itemHTML);

  items.push(`</div>`);

  $(".taqueria-list" ).append(items.join(""));
});
