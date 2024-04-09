$(document).ready( function () {
    blockUi("#officersTable");
    $('#officersTable').DataTable({
        ajax: {
            url: "../PoliceWebSystem-OrhanHuseinbegovic/json/officers.json",
            dataSrc: ""
        },
        columns: [
            {data: "OfficerID"},
            {data: "PersonalID"},
            {data: "Name"},
            {data: "Surname"},
            {data: "DateofBirth"},
            {data: "Email"},
            {data: "Phone"},
            {data: "Department"},
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.officerID + '">Edit</button>' +
                           '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.officerID + '">Delete</button>';
                }
            }
        ],
        responsive: true
    });
    unblockUi("#officersTable");
});

console.log("Officers loaded");

/*
$(document).ready(function() {
    // Function to fetch JSON data and populate select elements
    function populateSelectElement(elementId, jsonData, key) {
      var selectElement = $('#' + elementId);
      selectElement.empty(); // Clear existing options
      
      // Add default option
      selectElement.append($('<option>', {
        value: '',
        text: 'Select ' + key
      }));
      
      // Add options from JSON data
      jsonData.forEach(function(item) {
        selectElement.append($('<option>', {
          value: item[key],
          text: item[key]
        }));
      });
    }
  
    // Function to fetch JSON data
    function fetchDataAndPopulate() {
      $.getJSON('../../PoliceWebSystem-OrhanHuseinbegovic/json/officers.json', function(data) {
        populateSelectElement('officerID', data, 'officerid');
        populateSelectElement('personalID', data, 'personalid');
        populateSelectElement('name', data, 'name');
        populateSelectElement('surname', data, 'surname');
        populateSelectElement('dateofbirth',data,'dateofbirth');
        populateSelectElement('email',data,'email');
        populateSelectElement('phone',data,'phone');
        populateSelectElement('department', data, 'department');
        populateSelectElement('station',data,'station');
      });
    }
  
    // Call the function to populate select elements when the modal is shown
    $('#addOfficerModal').on('shown.bs.modal', function() {
      fetchDataAndPopulate();
    });
    
    $("#addForm").validate({
        rules: {
            officerID:{
                required: true
            },
            personalID:{
                required: true
            },
            name:{
                required: true
            },
            surname:{
                required: true
            },
            dateofbirth:{
                required: true
            },
            email:{
                required: true
            },
            phone: {
                required: true
            },
            department: {
                required: true
            },
            station: {
                required: true
            }
        },
        messages: {
            officerID:{
                required: "Please select Officer ID"
            },
            personalID:{
                required: "Please select personal ID"
            },
            name:{
                required: "Please input name"
            },
            surname:{
                required: "Please input Surname"
            },
            dateofbirth:{
                required: "Please select date of birth"
            },
            email:{
                required: "Please input email"
            },
            phone: {
                required: "Please input phone"
            },
            department: {
                required: "Please select department"
            },
            station: {
                required: "Please select station"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#addForm"); 
            var officerid=$("input[name='officerID']").val();
            var personalid=$("input[name='personalID']").val();
            var name=$("input[name='vehicleID']").val();
            var surname=$("input[name='shift']").val();
            var dateofbirth=$("input[name='date']").val();
            var email=$("input[name='date']").val();
            var phone=$("input[name='date']").val();
            var department=$("input[name='date']").val();
            var station=$("input[name='date']").val();
            $("#tableOutput").append(" <tr data-logid='"+officerid+"' data-officerid='"+personalid+"' data-weaponid='"+name+"' data-vehicleid='"+surname+"' data-shift='"+dateofbirth+"' data-date='"+email+"'><td>"+phone+"</td><td>"+officerid+"</td><td>"+weaponid+"</td><td>"+vehicleid+"</td><td>"+shift+"</td><td>"+date+"</td><td><button class='btn btn-info btn-sm btn-edit' id='editRowBtn' data-toggle='modal' data-target='#editModal' type='button'>Edit</button><button class='btn btn-danger btn-sm btn-delete' id='deleteRowBtn' type='button'>Delete</button></td></tr>");
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#addForm")[0].reset();
            unblockUi("#addForm");
            console.log("Form submitted");
            $('#addOfficerModal').modal('hide');
        }
    });
});
*/

serializeForm = (form) => {
    let jsonResul = {};
    $.each($(form).serializeArray(), function () {
        jsonResul[this.name] = this.value;    
    });
    return jsonResul;
}

$(document).on('click', '#deleteRowBtn', function() {
    $(this).parents('tr').remove();
});

$(document).on('click','#addOfficer', function(){
    $('addOfficerModal').modal('show');
    console.log("ADD MODAL KLIKNUT");
})

