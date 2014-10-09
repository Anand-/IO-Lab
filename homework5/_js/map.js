$(document).ready(function(){
  Init();
	GetEarthquakes();
  window.setInterval(Refresh,5*60000);
});

function Refresh(){
  map.removeLayer(markers);
  GetEarthquakes();
}
function Init(){
  map = L.map('map').setView([37.871293, -122.258556], 8);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

function GetEarthquakes(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        var data = JSON.parse(xmlhttp.responseText);

        var imageUrl = './_css/scale.jpg';
        imageBounds = [[180,0], [-180,-0]];
        L.imageOverlay(imageUrl,imageBounds).addTo(map);


        markers = new L.featureGroup();
        var mag = 0;
        
        for(var i=0;  i< data.features.length; i++){
          var prop = data.features[i].properties;
          var geom= data.features[i].geometry;
          var coords = geom.coordinates;
          var metadata = [prop.mag,new Date(prop.time).toString(),prop.url];
          markers.addLayer(PlotEarthquake(coords[0],coords[1],metadata));
          markers.addLayer(PlotCircle(coords[0],coords[1],prop.mag));
          if ( prop.mag > mag ){
          	mag = prop.mag;
          	map.panTo([coords[1],coords[0]],9);
          	console.log(coords[1]+","+coords[0]+"MaxMag:"+prop.mag);
          }
          AddElement(coords[0],coords[1],metadata);
        }

        map.addLayer(markers);
      }
  }
  xmlhttp.open("GET","http://io.milowski.com/usgs/earthquakes/feed/v1.0/summary/all_hour.geojson",true);
  xmlhttp.send();
}

function OnAnchorClick(x,y){
  console.log(y+","+x);
	map.panTo([x,y],10);
}

function PlotEarthquake(x,y,metadata){
  marker = new L.marker([y,x]).bindPopup(metadata[0]+"R earthquake at "+metadata[1]+". Location is ("+y+","+x+")"+"<a href='"+metadata[2]+"' target='blank'> See more info</a>");
  return marker;
}

function PlotCircle(x,y,r){
	colors = ['yellow','green','blue','red'];
	var circle = new L.circle([y,x], (r*100000/8), {
    color: colors[Math.floor(r/2)],
    fillColor: colors[Math.floor(r/2)],
    fillOpacity: 0.5
	});
	return circle;
}

 function AddElement(x,y,metadata){
  $('#list')
    .append($('<li onclick="OnAnchorClick('+y+','+x+')">')
          .text(metadata[0]+"R at "+metadata[1]+". Location is ("+y+","+x+")")
        
    )
};
          