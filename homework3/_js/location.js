TJoes_latitude = 37;
TJoes_longituge = -122;

function CheckLocation(){
  $('#container2').hide()
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude,',', position.coords.longitude);
    //Checking if you are in Trader Joes (I assume South Hall = Trader Joes)
    //Hoping you test this inside the SH!
    if(position.coords.latitude < TJoes_latitude+1 && position.coords.latitude > TJoes_latitude-1){
      if(position.coords.longitude < TJoes_longituge+1 && position.coords.longitude > TJoes_longituge-1){
        console.log("You are near Trader Joe's");
        $('#container2').show()
      }
    }
  	});

  }
  else {
    console.log("No location available");
  }
};

function ModifyList(){
  $('.tdText').each(function(){
    if(($(this).text()).indexOf("#TJ") > 0){
      AddElement_Location($(this).text())
    }
  });  
 };

$(document).ready( function(){
    CheckLocation();
    ModifyList();
    window.setInterval(CheckLocation,5*60000);
  });

function AddElement_Location(item_ip){
  var list = document.getElementById('listTabledyn');
  
  var newtdnode1 = document.createElement('td');
  newtdnode1.className= "tdItemText";
  
  var newnode = document.createElement('tr');
    
  var newspannode = document.createElement('span');
  newspannode.className = 'tdText';
  var newtextnode = document.createTextNode(item_ip);
  newspannode.appendChild(newtextnode);
  
  
  var newbutton = document.createElement('button');
  var newtextnode2 = document.createTextNode('X');
  newbutton.appendChild(newtextnode2);
  newbutton.className = 'tdBtn';
  newbutton.addEventListener("click",RemoveELement,false)
  
  var newtdnode2 = document.createElement('td');
  newtdnode2.className= "tdItemBtn";
  
  newtdnode1.appendChild(newspannode);
  newtdnode2.appendChild(newbutton);
  
  newnode.appendChild(newtdnode1);
  newnode.appendChild(newtdnode2);
  
  list.appendChild(newnode);
};