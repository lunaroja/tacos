$.getJSON( "https://api.airtable.com/v0/appSrgke7E0ElZhMY/Restaurants?api_key=key2m8VgwGT2iztad", function( data ) {
  // console.log(data.records);
 var items = [];
  $.each( data.records, function( index, val ) {
    console.log(val.fields["Name"])
    items.push( "<li id='" + val.id + "'>" + val.fields["Name"] + "</li>" );
  });

  $( "<ol/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});