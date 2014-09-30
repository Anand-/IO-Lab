$(document).ready(function() {
	GetEarthquakes()	
});

function GetEarthquakes(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        var data = JSON.parse(xmlhttp.responseText);
        for(var i=0;  i< data.features.length; i++){
          var prop = data.features[i].properties;
          var geom= data.features[i].geometry;
          AddElement(prop.mag,prop.place,prop.time,prop.alert,prop.tsunami,prop.code,prop.magType,prop.type,prop.title,geom.coordinates);
        }
      }
  }
  xmlhttp.open("GET","http://io.milowski.com/usgs/earthquakes/feed/v1.0/summary/all_hour.geojson",true);
  xmlhttp.send();
}

function AddElement(mag,place,time,alert,tsunami,code,magtype,type,title,coords){
  var table = document.getElementById('eqTable');
  $('#eqTable').find('tbody')
    .append($('<tr>')
        .append($('<td>')
          .append($('<span>')
                .text(mag)
            )
          )
          .append($('<td>')
            .append($('<span>')
                .text(place)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(time)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(alert)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(tsunami)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(code)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(magtype)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(type)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(title)
            )
          )
        .append($('<td>')
            .append($('<span>')
                .text(coords)
           )
        )
      );
  };

  $(document).ready(function() {
  $('#reload').click(function(){
    $('#eqTable tbody tr').remove();
    GetEarthquakes();
  });
  
});