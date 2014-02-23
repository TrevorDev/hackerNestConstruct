var whereTimeout;
var whatTimeout;

$('#what').autocomplete({
    source: [],
    delay: 0
});

$('#where').autocomplete({
    source: [],
    delay: 0
});

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

var getWhatLookAhead = function(str){
  var requestUrl = "http://api.sandbox.yellowapi.com//GetTypeAhead/?text=" + str + "&lang=en&fmt=json&field=WHAT&apikey=xsdm6nnbkfwecmqjwbdeguhp&UID=1"
  //'http://api.sandbox.yellowapi.com/GetTypeAhead/?text=' +str+'&lang=en&field=WHAT&apikey=xsdm6nnbkfwecmqjwbdeguhp&UID=1'; 
 
  $.ajax({
    url: requestUrl,
    type: "GET",
    async: true,
    success: function(response, textStatus, jqXHR) {
      console.log(response);

        var suggest = [];
        for (var i = 0; i < response.suggestedValues.length; ++i){
            suggest.push(response.suggestedValues[i].value);
        }
      
        $('#what').autocomplete('destroy');
        $('#what').autocomplete({
            source: suggest,
            delay: 0
        });
        $('#what').autocomplete('search');
    },
    error:function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

var getWhereLookAhead = function(str){
  var requestUrl = "http://api.sandbox.yellowapi.com//GetTypeAhead/?text=" + str + "&lang=en&fmt=json&field=WHERE&apikey=xsdm6nnbkfwecmqjwbdeguhp&UID=1"
  //'http://api.sandbox.yellowapi.com/GetTypeAhead/?text=' +str+'&lang=en&field=WHAT&apikey=xsdm6nnbkfwecmqjwbdeguhp&UID=1'; 
 
  $.ajax({
    url: requestUrl,
    type: "GET",
    async: true,
    success: function(response, textStatus, jqXHR) {
      console.log(response);

        var suggest = [];
        for (var i = 0; i < response.suggestedValues.length; ++i){
            suggest.push(response.suggestedValues[i].value);
        }
      
        $('#where').autocomplete('destroy');
        $('#where').autocomplete({
            source: suggest,
            delay: 0
        });
        $('#where').autocomplete('search');
    },
    error:function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}


$( '#what' ).bind('input propertychange', function () {
    clearTimeout(whatTimeout);
    whatTimeout = setTimeout(whatAuto, 250);
}).change();

$( '#where' ).bind('input propertychange', function () {
    clearTimeout(whereTimeout);
    whatTimeout = setTimeout(whereAuto, 250);
}).change();

$('#what').keypress(function (e) {
    if (e.which == 13) {
      if ($('#what').val().trim() != '' && $('#where').val().trim() != '')
        getStreetViewImage($('#what').val().trim(), $('#where').val().trim());
    }
});

$('#where').keypress(function (e) {
    if (e.which == 13) {
      if ($('#what').val().trim() != '' && $('#where').val().trim() != '')
        getStreetViewImage($('#what').val().trim(), $('#where').val().trim());
    }
});

var whatAuto = function() {
    var str = $('#what').val().trim() + " ";
    getWhatLookAhead(str);
}

var whereAuto = function() {
    var str = $('#where').val().trim() + " ";
    getWhereLookAhead(str);
}

//  this above is almost what we want for calling /GetTypeAhead YELLOWAPI 
//  the only problem is that it only triggers this function when the element looses focus. 
$('#fight').click(function () {
  if ($('#what').val().trim() != '' && $('#where').val().trim() != '')
    getStreetViewImage($('#what').val().trim(), $('#where').val().trim());
});
