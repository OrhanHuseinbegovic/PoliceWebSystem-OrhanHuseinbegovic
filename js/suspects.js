/*
$(document).ready( function () {
    blockUi("#suspectsTable");
    $('#suspectsTable').DataTable({
        ajax: {
            url: "../PoliceWebSystem-OrhanHuseinbegovic/json/suspects.json",
            dataSrc: ""
        },
        columns: [
            {data: "Suspect ID"},
            {data: "Personal ID"},
            {data: "Name"},
            {data: "Surname"},
            {data: "Date of Birth"},
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editSuspect" data-row="' + row.suspectID + '">Edit</button>' +
                           '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.suspectID + '">Delete</button>';
                }
            }
        ]
    });
    unblockUi("#suspectsTable");
});
*/

var SuspectService = {
    reload_suspects_datatable: function() {
        Utils.get_datatable(
            "suspectsTable",
            Constants.API_BASE_URL + "get_suspects.php",
            [
                
                {data: "suspectID"},
                {data: "personalID"},
                {data: "name"},
                {data: "surname"},
                {data: "dateOfBirth"},
                {data: "action"}
                /*
                {
                    data: null,
                    render: function(data, type, row) {
                        return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editSuspect" data-row="' + row.suspectID + '">Edit</button>' +
                               '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.suspectID + '">Delete</button>';
                    }
                }
                */
            ]
        );
    },
    open_edit_suspect_modal: function(suspectID) {
        RestClient.get(
            'get_suspect.php?suspectID=' + suspectID,
            function(data){
                $('#addSuspect').modal('toggle');
                $("#addForm input[name='suspectID']").val(data.suspectID);
                $("#addForm input[name='personalID']").val(data.personalID);
                $("#addForm input[name='name']").val(data.name);
                $("#addForm input[name='surname']").val(data.surname);
                $("#addForm input[name='dateOfBirth']").val(data.dateOfBirth);
            }
        )
    },
    delete_suspect: function(suspectID) {
        if(confirm("Do you want to delete suspect with ID: " + suspectID + "?") == true) {
            RestClient.delete(
                "delete_suspect.php?suspectID=" + suspectID,
                {},
                function(data){
                    toastr.success("You have successfully deleted the suspect.");
                    SuspectService.reload_suspects_datatable();
                }
            );
        } 
    }
};

SuspectService.reload_suspects_datatable();

FormValidation.validate("#addForm", {}, function (data) {
    //Utils.block_ui("#addSuspect");
    console.log("Data from form is serialized into", data);
    //Utils.unblock_ui("#addSuspect");
    
    $.post(Constants.API_BASE_URL + "add_suspect.php", data)
      .done(function (data) {
        $("#addSuspect").modal("toggle");
        toastr.success("You have successfully added the suspect.");
        SuspectService.reload_suspects_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        $("#addForm")[0].reset();
        Utils.unblock_ui("#addSuspect");
        $("#addSuspect").modal("hide");
      });
});

$(document).ready(function() {
    $("#addRowBtn").click(function() {
        $("#addSuspect").modal("show");
    });
    $("#closeModal").click(function() {
        $("#addForm")[0].reset();
        $("#addSuspect").modal("hide");
    });
});

/*
//ADD SUSPECT
$(document).ready(function() {
    $("#addRowBtn").click(function() {
        $("#addSuspect").modal("show");
    });
    $("#closeModal").click(function() {
        $("#addSuspect").modal("hide");
    });

    $("#addForm").validate({
        rules: {
            personalid:{
                required: true
            },
            name:{
                required: true
            },
            surname:{
                required: true
            },
            date:{
                required: true
            }
        },
        messages: {
            personalid:{
                required: "Please enter personal ID"
            },
            name:{
                required: "Please enter name"
            },
            surname:{
                required: "Please enter surname"
            },
            date:{
                required: "Please enter date of birth"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#addForm"); 

            $('#suspectID').val("S"+Math.floor(Math.random() * 1000));

            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#addForm")[0].reset();
            unblockUi("#addForm");
            console.log("Form submitted");
            $('#addSuspect').modal('hide');
        }
    });
});
*/


//EDIT SUSPECT
$(document).ready(function() {
    $("#editRowBtn").click(function() {
        var rowData = $(this).closest('tr').find('td').map(function() {
            return $(this).text();
        }).get();
        $('#name').val(rowData[2]);
        $('#surname').val(rowData[3]);
        $("#editSuspect").modal("show");
    });
    $("#closeModal").click(function() {
        $("#editSuspect").modal("hide");
    });

    $("#editForm").validate({
        rules: {
            name:{
                required: true
            },
            surname:{
                required: true
            }
        },
        messages: {
            name:{
                required: "Please enter name"
            },
            surname:{
                required: "Please enter surname"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#editForm");
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#editForm")[0].reset();
            unblockUi("#editForm");
            console.log("Form submitted");
            $('#editSuspect').modal('hide');
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


console.log("Suspcets loaded");