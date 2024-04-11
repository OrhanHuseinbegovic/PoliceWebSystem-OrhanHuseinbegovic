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