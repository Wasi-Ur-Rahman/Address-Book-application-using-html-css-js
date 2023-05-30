window.onload = function() {
  var addressbook = [];
  var addBookDiv = document.querySelector('.generate-list');
  var addBtn = document.getElementById("add-button");

  // localStorage['generate-list'] = '[{"firstname":"Wasi","lastname":"Ur Rahman","phone":"01647566933","email":"wasiurrahaman247@gmail.com","address":"omda mia hill"}]';
  addBtn.addEventListener("click", addToBook);
  addBookDiv.addEventListener("click",removeEntry);
  function jsonStructure(firstname,lastname,phone,email,address){
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }

  function clearForm() {
    var formFields = document.querySelectorAll('.form');
      for(var i in formFields){
        formFields[i].value = '';
      }
  }

  function addToBook() {
    var firstname = document.getElementById("first-name");
    var lastname = document.getElementById("last-name");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var address = document.getElementById("address");
    

    var isNull = firstname.value!='' && lastname.value!='' && phone.value!='' && email.value!='' && address.value!='';

    if (isNull) {
      var obj = new jsonStructure(firstname.value,lastname.value,phone.value,email.value,address.value);
      addressbook.push(obj);
      localStorage['generate-list'] = JSON.stringify(addressbook);
      clearForm();
      showAddressBook();
    }
  }
  function removeEntry(e){
		if(e.target.classList.contains('delButton')){
			var remID = e.target.getAttribute('data-id');
			addressbook.splice(remID,1);
			localStorage['generate-list'] = JSON.stringify(addressbook);
			showAddressBook();
		}
	}

  function showAddressBook() {
    if (localStorage['generate-list'] === undefined) {
      localStorage['generate-list'] = '';
    }else {
      addressbook = JSON.parse(localStorage['generate-list']);
      addBookDiv.innerHTML = '';
      for (var n in addressbook) {
        var str = '<div class="entry">';
        str += '<table class="address-table">';
        str += '<thead>';
        str += '<tr>';
        str += '<th>Name</th>';
        str += '<th>Address</th>';
        str += '<th>Email</th>';
        str += '<th>Phone no</th>'
        str += '</tr>';
        str += '</thead>';
        str += '<tbody>';
        str += '<tr>';
        str += '<td>';
        str += '<span class="full-name">' + addressbook[n].firstname + " " + addressbook[n].lastname + '</span>';
        str += '</td>';
        str += '<td>';
        str += '<span>' + addressbook[n].address + '</span>';
        str += '</td>'
        str += '<td>' + addressbook[n].email + '</td>';
        str += '<td>' + addressbook[n].phone + '</td>';
        str += '<td><span><button class="delButton" data-id="' + n + '">Delete</button></span></td>';
        str += '</tr>';
        str += '</tbody>';
        str += '</table>'
        str += '</div>';
        //console.log(str);
        addBookDiv.innerHTML += str;
      }
    }
  }
  showAddressBook();
}
