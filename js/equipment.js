var EquipmentService = {
    reload_equipment_datatable: function() {
        Utils.get_datatable(
            "equipmentTable",
            Constants.API_BASE_URL + "get_equipment.php",
            [
                {data: "logID"},
                {data: "officerID"},
                {data: "weapon"},
                {data: "vehicle"},
                {data: "shift"},
                {data: "date"},
                {data: "action"}
            ]
        );
    },
    open_edit_equipment_modal: function(logID) {
        RestClient.get(
            'get_equipment.php?logID=' + logID,
            function(data){
                $('#editEquipmentModal').modal('toggle');
                $("#editEquipmentForm input[name='logID']").val(data.logID);
                $("#editEquipmentForm input[name='officerID']").val(data.officerID);
                $("#editEquipmentForm input[name='weapon']").val(data.weapon);
                $("#editEquipmentForm input[name='vehicle']").val(data.vehicle);
                $("#editEquipmentForm input[name='shift']").val(data.shift);
                $("#editEquipmentForm input[name='date']").val(data.date);
            }
        )
    },
    delete_equipment: function(logID) {
        if(confirm("Do you want to delete equipment with ID: " + logID + "?") == true) {
            RestClient.delete(
                "delete_equipment.php?logID=" + logID,
                {},
                function(data){
                    toastr.success("You have successfully deleted the equipment.");
                    EquipmentService.reload_equipment_datatable();
                }
            );
        } 
    }  
};

EquipmentService.reload_equipment_datatable();

FormValidation.validate("#addEquipmentForm", {}, function (data) {
    Utils.block_ui("#addEquipmentForm");
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "add_equipment.php", data)
      .done(function (data) {
        $("#addEquipmentModal").modal("toggle");
        toastr.success("You have successfully added the equipment.");
        EquipmentService.reload_equipment_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        Utils.unblock_ui("#addEquipmentForm");
      });
});

FormValidation.validate("#editEquipmentForm", {}, function (data) {
    Utils.block_ui("#editEquipmentForm");
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "edit_equipment.php", data)
      .done(function (data) {
        $("#editEquipmentModal").modal("toggle");
        toastr.success("You have successfully edited the equipment.");
        EquipmentService.reload_equipment_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        Utils.unblock_ui("#editEquipmentForm");
      });
});

$(document).ready(function(){
    $("#addRowBtn").click(function() {
        $('#addEquipmentModal').modal('show');
    });
    $(".edit").click(function(){
        $('#editEquipmentModal').modal('show');
    });
    $(".close").click(function() {
        $('#addEquipmentModal').modal('hide');
        $('#editEquipmentModal').modal('hide');
        $("#addEquipmentForm")[0].reset();
        $("#editEquipmentForm")[0].reset();
    });
});   

console.log("Equipment.js loaded");
/*

$(document).ready( function () {
    blockUi("#equipmentTable");
    $('#equipmentTable').DataTable({
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
    unblockUi("#equipmentTable");
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

$(document).ready(function(){
    $('#addRowBtn').click(function() {
        $('#addModal').modal('show');
    });
});



$(document).on('click', '#editRowBtn', function() {

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
    $('#editModal').on('shown.bs.modal', function() {
      fetchDataAndPopulate();
    });
    
    $("#editForm").validate({
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
        submitHandler: function(form, event) {
            event.preventDefault();
            blockUi("#editForm"); 

            var logid=$("select[name='logID']").val();
            var officerid=$("select[name='officerID']").val();
            var weaponid=$("select[name='weaponID']").val();
            var vehicleid=$("select[name='vehicleID']").val();
            var shift=$("select[name='shift']").val();
            var date=$("input[name='date']").val();
            $("#tableOutput").append(" <tr data-logid='"+logid+"' data-officerid='"+officerid+"' data-weaponid='"+weaponid+"' data-vehicleid='"+vehicleid+"' data-shift='"+shift+"' data-date='"+date+"'><td>"+logid+"</td><td>"+officerid+"</td><td>"+weaponid+"</td><td>"+vehicleid+"</td><td>"+shift+"</td><td>"+date+"</td><td><button class='btn btn-info btn-sm btn-edit' id='editRowBtn' data-toggle='modal' data-target='#editModal' type='button'>Edit</button><button class='btn btn-danger btn-sm btn-delete' id='deleteRowBtn' type='button'>Delete</button></td></tr>");
            
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#editForm")[0].reset();
            unblockUi("#editForm");
            console.log("Form submitted");
            $('#editForm').modal('hide');
        }
    });
});

// Save Changes Button Click Handler
$('#saveChangesBtn').click(function() {

    // Hide the modal
    $('#editModal').modal('hide');
});

*/
