$("#submit-location").on('submit', function(e){
  e.preventDefault();
  var data = {};
  data.fields = {
    'Name': $(this).find('#Name').val(),
    'Address': $(this).find('#Address').val(),
    'Website': $(this).find('#Website').val(),
    'About': $(this).find('#About').val(),
    'Neighborhood': $(this).find('#Neighborhood').val(),
    'Pictures': [
      {
        'url': $(this).find('#Picture').val()
      }
    ],
    'Rating': $(this).find('#Rating').val(),
    'Rating': $(this).find('#Rating').val(),
    'Cost': $(this).find('#Cost').val(),
  };
  $.post(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=${api_key}`,
    data, function () {
      // On Success
      $("#submit-location").html(`<h2>Thanks for submitting!</h2>`);
    }
  );
});
