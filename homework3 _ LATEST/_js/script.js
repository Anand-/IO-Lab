$(document).ready(function() {
	var addBtn = document.getElementById('btnAdd');
	addBtn.addEventListener("click",AddElement,false);
	

	$('.tdBtn').click(RemoveELement);
	
});

function RemoveELement(){
    //$(this).closest ('tr').remove ();

    $(this).closest('tr').children('td').addClass('deleteHighlight').animate({
        padding: 0
    }).wrapInner('<div />').children().slideUp(function() {
        $(this).closest('tr').remove();
    });
    return false;

		//var parentTag = $( this ).parent().parent();
    //var tbl = parentTag.parent();
		//parentTag.remove();
    //check if there are children
	}

function AddElement(){
  var text = document.getElementById('txtAdd').value;
  var list = document.getElementById('listTable');
  
  var newtdnode1 = document.createElement('td');
  newtdnode1.className= "tdItemText";
  
  var newnode = document.createElement('tr');
    
  var newspannode = document.createElement('span');
  newspannode.className = 'tdText';
  var newtextnode = document.createTextNode(text);
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

  document.getElementById('txtAdd').value ="";
  document.getElementById('txtAdd').text ="";
};

