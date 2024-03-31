function blockUi(element) {
    $(element).block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        css: {
            backgroundColor: "transparent",
            border: "0",
        },
        overlayCSS: {
            backgroundColor: "#000",
            opacity: 0.25,
        },
    });
}

function unblockUi(element) {
    $(element).unblock({});
}


$(document).ready( function () {
    blockUi("#dataTable");
    $('#dataTable').DataTable({
        ajax: {
            url: "../PoliceWebSystem-OrhanHuseinbegovic/json/equipment.json",
            dataSrc: ""
        },
        columns: [
            {data: "Log ID"},
            {data: "Officer ID"},
            {data: "Weapon ID"},
            {data: "Vehicle ID"},
            {data: "Shift"},
            {data: "Date"},
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.LogID + '">Edit</button>' +
                           '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.LogID + '">Delete</button>';
                }
            }
        ]
    });
    unblockUi("#dataTable");
});



$(document).ready(function() {
    $('#addRowBtn').click(function() {
      $('#addModal').modal('show');
    });
    $('#closeModal').click(function() {
        $('#addModal').modal('hide');
    });

    $('#editRowBtn').click(function() {
        $('#editModal').modal('show');
    });
    $('#closeModal').click(function() {
        $('#editModal').modal('hide');
    });
});


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
      $.getJSON('../../PoliceWebSystem-OrhanHuseinbegovic/json/equipment.json', function(data) {
        populateSelectElement('logID', data, 'Log ID');
        populateSelectElement('officerID', data, 'Officer ID');
        populateSelectElement('weaponID', data, 'Weapon ID');
        populateSelectElement('vehicleID', data, 'Vehicle ID');
      });
    }
  
    // Call the function to populate select elements when the modal is shown
    $('#addModal').on('shown.bs.modal', function() {
      fetchDataAndPopulate();
    });
    
    $("#addForm").validate({
        rules: {
            logID:{
                required: true
            },
            officerID:{
                required: true
            },
            vehicleID:{
                required: true
            },
            shift:{
                required: true
            },
            date:{
                required: true
            },
            weaponID:{
                required: true
            }
        },
        messages: {
            logID:{
                required: "Please select log ID"
            },
            officerID:{
                required: "Please select officer ID"
            },
            vehicleID:{
                required: "Please select vehicle ID"
            },
            shift:{
                required: "Please select shift"
            },
            date:{
                required: "Please select date"
            },
            weaponID:{
                required: "Please select weapon ID"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#addForm"); 
            var logid=$("select[name='logID']").val();
            var officerid=$("select[name='officerID']").val();
            var weaponid=$("select[name='weaponID']").val();
            var vehicleid=$("select[name='vehicleID']").val();
            var shift=$("select[name='shift']").val();
            var date=$("input[name='date']").val();
            $("#tableOutput").append(" <tr data-logid='"+logid+"' data-officerid='"+officerid+"' data-weaponid='"+weaponid+"' data-vehicleid='"+vehicleid+"' data-shift='"+shift+"' data-date='"+date+"'><td>"+logid+"</td><td>"+officerid+"</td><td>"+weaponid+"</td><td>"+vehicleid+"</td><td>"+shift+"</td><td>"+date+"</td><td><button class='btn btn-info btn-sm btn-edit' id='editRowBtn' data-toggle='modal' data-target='#editModal' type='button'>Edit</button><button class='btn btn-danger btn-sm btn-delete' id='deleteRowBtn' type='button'>Delete</button></td></tr>");
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#addForm")[0].reset();
            unblockUi("#addForm");
            console.log("Form submitted");
            $('#addModal').modal('hide');
        }
    });
});

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

/*
$(document).on('click', '#editRowBtn', function() {
        var logID=$(this).parents('tr').find("input[name='logID']").val();
        var officerID=$(this).parents('tr').find("input[name='officerID']").val();
        var weaponID=$(this).parents('tr').find("input[name='weaponID']").val();
        var vehicleID=$(this).parents('tr').find("input[name='vehicleID']").val();
        var shift=$(this).parents('tr').find("input[name='shift']").val();
        var date=$(this).parents('tr').find("input[name='date']").val();
        

        $(this).parents('tr').find('td:eq(0)').text(logID);
        $(this).parents('tr').find('td:eq(1)').text(officerID);
        $(this).parents('tr').find('td:eq(2)').text(weaponID);
        $(this).parents('tr').find('td:eq(3)').text(vehicleID);
        $(this).parents('tr').find('td:eq(4)').text(shift);
        $(this).parents('tr').find('td:eq(5)').text(date);

        $(this).parents('tr').attr('data-logid',logID);
        $(this).parents('tr').attr('data-officerid',officerID);
        $(this).parents('tr').attr('data-weaponid',weaponID);
        $(this).parents('tr').attr('data-vehicleid',vehicleID);
        $(this).parents('tr').attr('data-shift',shift);
        $(this).parents('tr').attr('data-date',date);
});
*/

$(document).on('click', '#editRowBtn', function() {
    // Get the values from the current row
    var logID = $(this).closest('tr').data('logID');
    var officerID = $(this).closest('tr').data('officerID');
    var weaponID = $(this).closest('tr').data('weaponID');
    var vehicleID = $(this).closest('tr').data('vehicleID');
    var shift = $(this).closest('tr').data('shift');
    var date = $(this).closest('tr').data('date');

    // Populate the form fields in the modal with current row values
    $('#logID').val(logID);
    $('#officerID').val(officerID);
    $('#weaponID').val(weaponID);
    $('#vehicleID').val(vehicleID);
    $('#shift').val(shift);
    $('#caseDate').val(date);

});

// Save Changes Button Click Handler
$('#saveChangesBtn').click(function() {
    // Retrieve the updated values from the modal form fields
    var logID = $('#logID').val();
    var officerID = $('#officerID').val();
    var weaponID = $('#weaponID').val();
    var vehicleID = $('#vehicleID').val();
    var shift = $('#shift').val();
    var date = $('#caseDate').val();

    // Update the current row with the new values
    //var currentRow = $('#dataTable').DataTable().closest('tr');
    /*
    currentRow.data({
        "Log ID": logID,
        "Officer ID": officerID,
        "Weapon ID": weaponID,
        "Vehicle ID": vehicleID,
        "Shift": shift,
        "Date": date
    }).draw();
    */

    $('#logID').val(logID);
    $('#officerID').val(officerID);
    $('#weaponID').val(weaponID);
    $('#vehicleID').val(vehicleID);
    $('#shift').val(shift);
    $('#caseDate').val(date);

    // Hide the modal
    $('#editModal').modal('hide');
});


console.log("Equipment.js loaded");