var getStreetViewImage = function (what, where) {
  var requestUrl = 'http://api.sandbox.yellowapi.com/FindBusiness/?pg=1&what=' + what + '&where=' + where + '&pgLen=1&lang=en&fmt=json&sflag=&apikey=xsdm6nnbkfwecmqjwbdeguhp&UID=1';

  $.ajax({
    url: requestUrl,
    type: "GET",
    async: true,
    success: function(response, textStatus, jqXHR) {
      console.log(response);

      if (response.listings.length == 1)
      {
        $('#image-container').empty();

        var latitude = response.listings[0].geoCode.latitude;
        var longitude = response.listings[0].geoCode.longitude;
        var googleUrl = 'http://maps.googleapis.com/maps/api/streetview?size=640x360&location=' + latitude + ',' + longitude + '&sensor=false&fov=100';
        $('#image-container').append('<h3>Choose your FIGHTING location!</h3>');

        for (var i = 0; i < 8; ++i) {
          var realUrl = googleUrl + '&heading=' + i*45;
          var newImage = $('<a href="game.html?imageUrl=' + encodeURIComponent(realUrl) + '"><img class="background-image-' + i + '" src="' + realUrl + '"></img></a>');
          $('#image-container').append(newImage);
        }
      }
    },
    error:function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}
 $( '#what' )
  .bind('input propertychange', function () {
    var str = "";
    str += $( this ).val().trim() + " ";
    alert( str );
  })
  .change();
//  this above is almost what we want for calling /GetTypeAhead YELLOWAPI 
//  the only problem is that it only triggers this function when the element looses focus. 
$('#fight').click(function () {
  if ($('#what').val().trim() != '' && $('#where').val().trim() != '')
    getStreetViewImage($('#what').val().trim(), $('#where').val().trim());
});