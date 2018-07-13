// This urls is from airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=key2m8VgwGT2iztad';

// This is where we get the JSON data from Airtable!

$.getJSON( airtable_list_url, function( data ) {
  var items = [];
  $.each( data.records, function( key, val ) {
    console.log(val.fields)
    items.push(`<h2>${val.fields['Name']}</h2>`);
  });
  $(".list-view").append(items.join(''));
});
