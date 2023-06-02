$(document).ready(function() {
  var addressbook = [];
  var addBookDiv = $('.generate-list');
  var addSearchDiv = $('.found-items');
  var addBtn = $('#add-button');
  var searchBtn = $('#search-btn');

  addBtn.on("click", addToBook);
  searchBtn.on("click",findContact);
  addBookDiv.on("click", ".delButton", removeEntry);

  function jsonStructure(firstname, lastname, phone, email, address) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }

  function findContact() {
    var inputElem = $('#search-bar');
    var str = inputElem.val();

    var fname = "",lname = "";
    if (str.length != 0) {
      var i = 0;
      while (i < str.length && str[i] != ' ') {
        fname += str[i++];
      }
      while (i < str.length) {
        lname += str[i++];
      }
      fname.toLowerCase();
      lname.toLowerCase();
      i = 0;
      addSearchDiv.html('');
      if (addressbook.length == 0) {
        addSearchDiv.append('<p>No contact found</p>');
      }else {
        var pos = 0;
        while (i < addressbook.length) {
          var a = addressbook[i].firstname.toLowerCase();
          var b = addressbook[i].lastname.toLowerCase();
  
          if (fname.length > 0 && a.includes(fname) || lname.length > 0 && a.includes(lname) || fname.length > 0 &&  b.includes(fname) || lname.length > 0 && b.includes(lname)) {
            var s = '<div class="generate-search-list">';
            s += '<table class="search-table">';
            s += '<tr>';
            s += '<td>';
            s += '<span class="full-name">' + addressbook[i].firstname + " " + addressbook[i].lastname + '</span>';
            s += '</td>';
            s += '<td>';
            s += '<span>' + addressbook[i].address + '</span>';
            s += '</td>'
            s += '<td>' + addressbook[i].email + '</td>';
            s += '<td>' + addressbook[i].phone + '</td>';
            s += '</tr>';
            s += '</table>'
            s += '</div>';
            addSearchDiv.append(s);
            pos = 1;
          }
          i++;
        }
        if (pos == 0) {
          addSearchDiv.append('<p>No contact found</p>');
        }
      }
    }
  }

  function clearForm() {
    $('.form').val('');
  }

  function addToBook() {
    var firstname = $("#first-name");
    var lastname = $("#last-name");
    var phone = $("#phone");
    var email = $("#email");
    var address = $("#address");

    var isNull = firstname.val() != '' && lastname.val() != '' && phone.val() != '' && email.val() != '' && address.val() != '';

    if (isNull) {
      var obj = new jsonStructure(firstname.val(), lastname.val(), phone.val(), email.val(), address.val());
      addressbook.push(obj);
      localStorage['generate-list'] = JSON.stringify(addressbook);
      clearForm();
      showAddressBook();
    }
  }


  function removeEntry() {
    var remID = $(this).data('id');
    addressbook.splice(remID, 1);
    localStorage['generate-list'] = JSON.stringify(addressbook);
    showAddressBook();
  }

  function showAddressBook() {
    if (localStorage['generate-list'] === undefined) {
      localStorage['generate-list'] = '';
    } else {
      addressbook = JSON.parse(localStorage['generate-list']);
      addBookDiv.html('');
      for (var n in addressbook) {
        var str = '<div class="entry">';
        str += '<table class="address-table">';
        str += '<thead>';
        str += '<tr>';
        str += '<th>Name</th>';
        str += '<th>Address</th>';
        str += '<th>Email</th>';
        str += '<th>Phone no</th>';
        str += '</tr>';
        str += '</thead>';
        str += '<tbody>';
        str += '<tr>';
        str += '<td>';
        str += '<span class="full-name">' + addressbook[n].firstname + " " + addressbook[n].lastname + '</span>';
        str += '</td>';
        str += '<td>';
        str += '<span>' + addressbook[n].address + '</span>';
        str += '</td>';
        str += '<td>' + addressbook[n].email + '</td>';
        str += '<td>' + addressbook[n].phone + '</td>';
        str += '<td><span><button class="delButton" data-id="' + n + '">Delete</button></span></td>';
        str += '</tr>';
        str += '</tbody>';
        str += '</table>'
        str += '</div>';
        addBookDiv.append(str);
      }
    }
  }
  showAddressBook();
});
