var IncidentService = {
    reload_incidents_datatable: function() {
        Utils.get_datatable(
            "incidentsTable",
            Constants.API_BASE_URL + "incidents",
            [
                {data: "incidentID"},
                {data: "officerID"},
                {data: "type"},
                {data: "location"},
                {data: "date"},
                {data: "description"},
                {data: "action"}
            ]
        );
    },
    open_edit_incident_modal: function(incidentID) {
        RestClient.get(
            'incidents/' + incidentID,
            function(data){
                $('#editIncidentModal').modal('toggle');
                $("#editIncidentForm input[name='incidentID']").val(data.incidentID);
                $("#editIncidentForm input[name='officerID']").val(data.officerID);
                $("#editIncidentForm input[name='type']").val(data.type);
                $("#editIncidentForm input[name='location']").val(data.location);
                $("#editIncidentForm input[name='date']").val(data.date);
                $("#editIncidentForm input[name='description']").val(data.description);
            }
        )
    },
    delete_incident: function(incidentID) {
        if(confirm("Do you want to delete incident with ID: " + incidentID + "?") == true) {
            RestClient.delete(
                "incidents/delete/" + incidentID,
                {},
                function(data){
                    toastr.success("You have successfully deleted the incident.");
                    IncidentService.reload_incidents_datatable();
                }
            );
        } 
    }
}

IncidentService.reload_incidents_datatable();

FormValidation.validate("#addIncidentForm", {}, function (data) {
    Utils.block_ui("#addIncidentForm");
    console.log("Data from form is serialized into", data);
    //Utils.unblock_ui("#addIncident");
    
    $.post(Constants.API_BASE_URL + "incidents/add", data)
      .done(function (data) {
        $("#addIncidentModal").modal("toggle");
        toastr.success("You have successfully added the incident.");
        IncidentService.reload_incidents_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        console.log("Request completed.");
        $("#addIncidentForm")[0].reset();
        Utils.unblock_ui("#addIncidentForm");
      });
});

FormValidation.validate("#editIncidentForm", {}, function (data) {
    Utils.block_ui("#editIncidentForm");
    console.log("Data from form is serialized into", data);
    //Utils.unblock_ui("#addIncident");
    
    $.post(Constants.API_BASE_URL + "incidents/add", data)
      .done(function (data) {
        $("#editIncidentModal").modal("toggle");
        toastr.success("You have successfully added the incident.");
        IncidentService.reload_incidents_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        console.log("Request completed.");
        $("#editIncidentForm")[0].reset();
        Utils.unblock_ui("#editIncidentForm");
      });
});


$(document).ready(function() {
    $("#addRowBtn").click(function() {
        $("#addIncidentModal").modal("show");
    });
    $("#closeModal").click(function() {
        $("#addIncidentForm")[0].reset();
        $("#addIncidentModal").modal("hide");
    });
    $("#closeEditModal").click(function() {
        $("#editIncidentForm")[0].reset();
        $("#editIncidentModal").modal("hide");
    }
    );
});



/*
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


*/

console.log("INCIDENTS lOADED");