var OfficerService = {
    reload_officers_datatable: function() {
        Utils.get_datatable(
            "officersTable",
            Constants.API_BASE_URL + "officers", //get_officers.php
            [
                {data: "officerID"},
                {data: "personalID"},
                {data: "name"},
                {data: "surname"},
                {data: "dateOfBirth"},
                {data: "email"},
                {data: "phone"},
                {data: "department"},
                {data: "action"}
            ]
        );
    },
    open_edit_officer_modal: function(officerID){
        RestClient.get(
            'officers/' + officerID,
            function(data){
                $('#editOfficerModal').modal('toggle');
                $("#editOfficerForm input[name='officerID']").val(data.officerID);
                $("#editOfficerForm input[name='personalID']").val(data.personalID);
                $("#editOfficerForm input[name='name']").val(data.name);
                $("#editOfficerForm input[name='surname']").val(data.surname);
                $("#editOfficerForm input[name='dateOfBirth']").val(data.dateOfBirth);
                $("#editOfficerForm input[name='email']").val(data.email);
                $("#editOfficerForm input[name='phone']").val(data.phone);
                $("#editOfficerForm input[name='department']").val(data.department);
            }
        )
    },
    delete_officer: function(officerID) {
        if(confirm("Do you want to delete officer with ID: " + officerID + "?") == true) {
            RestClient.delete(
                "officers/delete/" + officerID,
                {},
                function(data){
                    toastr.success("You have successfully deleted the officer.");
                    OfficerService.reload_officers_datatable();
                }
            );
        }
    }
};

OfficerService.reload_officers_datatable();

FormValidation.validate("#addOfficerForm", {}, function (data) {
    Utils.block_ui("#addOfficerForm");
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "officers/add", data) //add_officer.php
      .done(function (data) {
        $("#addOfficerModal").modal("toggle");
        toastr.success("You have successfully added the officer.");
        OfficerService.reload_officers_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        $("#addOfficerForm")[0].reset();
        Utils.unblock_ui("#addOfficerForm");
        $('#addOfficerModal').modal('hide');
      });
});

FormValidation.validate("#editOfficerForm", {}, function (data) {
    Utils.block_ui("#editOfficerForm");
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "officers/add", data) //add_officer.php
      .done(function (data) {
        $("#editOfficerModal").modal("toggle");
        toastr.success("You have successfully edited the officer.");
        OfficerService.reload_officers_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        $("#editOfficerForm")[0].reset();
        Utils.unblock_ui("#editOfficerForm");
        $('#editOfficerModal').modal('hide');
      });
});

$('#addBtn').click(function(){
    $('#addOfficerModal').modal('show');
});
$('.edit').click(function(){   
    $('#editOfficerModal').modal('show');
});
$('.close').click(function(){
    $('#addOfficerForm')[0].reset();
    $('#addOfficerModal').modal('hide');
});
$('#closeEditModal').click(function(){
    $('#editOfficerForm')[0].reset();
    $('#editOfficerModal').modal('hide');
});


console.log("Officers loaded");


/*
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
                    return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editOfficerModal" data-row="' + row.officerID + '">Edit</button>' +
                           '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.officerID + '">Delete</button>';
                }
            }
        ],
        responsive: true
    });
    unblockUi("#officersTable");
});

$(document).on('click', '#deleteRowBtn', function() {
    $(this).parents('tr').remove();
});

//When document is ready, and when clicked on id addOfficer, show modal addOfficerMOdal
$(document).ready(function(){
    $('#addOfficer').click(function(){
        $('#addOfficerModal').modal('show');
    });
    $('#closeModal').click(function(){
        $('#addOfficerModal').modal('hide');
    });

    $("#addForm").validate({
        rules: {
            personalID:{
                required: true
            },
            name:{
                required: true
            },
            surname:{
                required: true
            },
            dateofBirth:{
                required: true
            },
            email:{
                required: true
            },
            phone:{
                required: true
            },
            department:{
                required: true
            }
        },
        messages: {
            personalID:{
                required: "Please enter personal ID"
            },
            name:{
                required: "Please enter name"
            },
            surname:{
                required: "Please enter surname"
            },
            dateofBirth:{
                required: "Please enter date of birth"
            },
            email:{
                required: "Please enter email"
            },
            phone:{
                required: "Please enter phone"
            },
            department:{
                required: "Please select department"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#addForm"); 
            

            var name = $('#name').val();
            var surname = $('#surname').val();
            var email = (name+surname).replace(/\s/g, '').toLowerCase() + "@police.com";

            $('#email').val(email);
            $('#officerID').val("O"+Math.floor(Math.random() * 1000) + 1);


            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));


            $("#addForm")[0].reset();
            unblockUi("#addForm");
            console.log("Form submitted");
            $('#addOfficerModal').modal('hide');
        }
    });
});


$("#editRowBtn").click(function() { 
    console.log("Edit button clicked");
    $('#editOfficerModal').modal('show'); 
    console.log("Edit button clicked");
});

//Edit modal form
$(document).ready(function(){
    $('#editRowBtn').click(function(){
        console.log("Edit button clicked");
        $('#editOfficerModal').modal('show'); 
        console.log("Edit button clicked");
    });
    $('#closeModal').click(function(){
        $('#editRowBtn').modal('hide');
    });

    $("#editForm").validate({
        rules: {
            personalID:{
                required: true
            },
            name:{
                required: true
            },
            surname:{
                required: true
            },
            dateofBirth:{
                required: true
            },
            email:{
                required: true
            },
            phone:{
                required: true
            },
            department:{
                required: true
            }
        },
        messages: {
            personalID:{
                required: "Please enter personal ID"
            },
            name:{
                required: "Please enter name"
            },
            surname:{
                required: "Please enter surname"
            },
            dateofBirth:{
                required: "Please enter date of birth"
            },
            email:{
                required: "Please enter email"
            },
            phone:{
                required: "Please enter phone"
            },
            department:{
                required: "Please select department"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            blockUi("#editForm"); 
            

            var name = $('#name').val();
            var surname = $('#surname').val();
            var email = (name+surname).replace(/\s/g, '').toLowerCase() + "@police.com";

            $('#email').val(email);
            $('#officerID').val("O"+Math.floor(Math.random() * 1000) + 1);


            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));


            $("#editForm")[0].reset();
            unblockUi("#editForm");
            console.log("Form submitted");
            $('#editOfficerModal').modal('hide');
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