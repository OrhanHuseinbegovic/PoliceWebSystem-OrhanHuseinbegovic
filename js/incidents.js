$(document).ready( function () {
    blockUi("#incidentsTable");
    $('#incidentsTable').DataTable({
        ajax: {
            url: "../PoliceWebSystem-OrhanHuseinbegovic/json/incidents.json",
            dataSrc: ""
        },
        columns: [
            {data: "Incident ID"},
            {data: "Officer ID"},
            {data: "Type"},
            {data: "Location"},
            {data: "Date"},
            {data: "Description"},
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.officerID + '">Edit</button>' +
                           '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.officerID + '">Delete</button>';
                }
            }
        ]
    });
    unblockUi("#incidentsTable");
});


//When on clikck addRowBtn, show addModal 
$(document).ready(function() {
    $("#addRowBtn").click(function() {
        $("#addModal").modal("show");
    });
    $("#closeModal").click(function() {
        $("#addIncidentForm")[0].reset();
        $("#addModal").modal("hide");
    });

    $("#addIncidentForm").validate({
        rules: {
            officerID:{
                required: true
            },
            type:{
                required: true
            },
            location:{
                required: true
            },
            date:{
                required: true
            },
            description:{
                required: true
            }
        },
        messages: {
            officerID:{
                required: "Please enter officer ID"
            },
            type:{
                required: "Please select type"
            },
            location:{
                required: "Please enter location"
            },
            date:{
                required: "Please select date"
            },
            description:{
                required: "Please enter description"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#addIncidentForm"); 
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#addIncidentForm")[0].reset();
            unblockUi("#addIncidentForm");
            console.log("Form submitted");
            $('#addModal').modal('hide');
        }
    });
});



//When on clikck editRowBtn, show editModal
$(document).ready(function() {
    $("#editRowBtn").click(function() {
        $("#editModal").modal("show");
    });
    $("#closeModal").click(function() {
        $("#editIncidentForm")[0].reset();
        $("#editModal").modal("hide");
    });

    $("#editIncidentForm").validate({
        rules: {
            type:{
                required: true
            },
            location:{
                required: true
            },
            date:{
                required: true
            },
            description:{
                required: true
            }
        },
        messages: {
            type:{
                required: "Please select type"
            },
            location:{
                required: "Please enter location"
            },
            date:{
                required: "Please select date"
            },
            description:{
                required: "Please enter description"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#editIncidentForm"); 
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#editIncidentForm")[0].reset();
            unblockUi("#editIncidentForm");
            $('#editModal').modal('hide');
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




console.log("INCIDENTS lOADED");