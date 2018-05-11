$(".new-location").on( "submit", function( event ) {
  event.preventDefault();

  var data = {
    'fields': {
      "Name": $(this).find('[name="Name"]').val(),
      "Address": $(this).find('[name="Address"]').val(),
      "District": $(this).find('[name="District"]').val()
    }
  }
  console.log(data);

  $.ajax({
    method: 'POST',
    url:'https://api.airtable.com/v0/appSrgke7E0ElZhMY/Restaurants',
    'headers': {
      'Authorization': 'Bearer key2m8VgwGT2iztad',
      'Content-type': 'application/json',
    },
    'data': JSON.stringify(data)
  });

});
