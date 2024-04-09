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
                    return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.suspectID + '">Edit</button>' +
                           '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.suspectID + '">Delete</button>';
                }
            }
        ]
    });
    unblockUi("#suspectsTable");
});
*/

//If user is admin, include the column for edit and delete buttons, else dont
$(document).ready( function () {
    const isAdmin = localStorage.getItem("isAdmin");
    if(isAdmin === "true"){
        console.log("User is admin");
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
                            return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.suspectID + '">Edit</button>' +
                                   '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.suspectID + '">Delete</button>';
                        }
                    }
                ]
            });
            unblockUi("#suspectsTable");
        });
    }
    else{
        console.log("User is not admin");
        $(document).ready( function () {
            blockUi("#suspectsTable");
            //$('#suspectsTable').find('thead th#actions').remove();
            $('#suspectsTable').find('tbody td:last-child').remove();
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
                    {data: "Date of Birth"}
                ]
            });
            unblockUi("#suspectsTable");
        });
    }
});


/*
$(document).ready(function () {
    blockUi("#suspectsTable");

    const isAdmin = localStorage.getItem("isAdmin");

    // Define the columns array based on user type
    const columns = [
        { data: "Suspect ID" },
        { data: "Personal ID" },
        { data: "Name" },
        { data: "Surname" },
        { data: "Date of Birth" }
    ];

    // If user is admin, include the column for edit and delete buttons
    if (isAdmin === "true") {
        columns.push({
            data: null,
            render: function (data, type, row) {
                return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.suspectID + '">Edit</button>' +
                    '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.suspectID + '">Delete</button>';
            }
        });
    }

    // If user is not admin, remove the last column from the columns array
    if (isAdmin === "false") {
        columns.pop();
    }

    $('#suspectsTable').DataTable({
        ajax: {
            url: "../PoliceWebSystem-OrhanHuseinbegovic/json/suspects.json",
            dataSrc: ""
        },
        columns: columns
    });

    unblockUi("#suspectsTable");
});
*/


/*
$(document).ready(function() {
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
            {data: "Date of Birth"}
        ]
    });
    unblockUi("#suspectsTable");
});
*/

$(document).ready(function() {
    // Check the isAdmin status when the page loads
    checkAdmin();
});
/*
function checkAdmin() {
    let isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
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
                        return '<button class="btn btn-info btn-sm btn-edit" id="editRowBtn" data-toggle="modal" data-target="#editModal" data-row="' + row.suspectID + '">Edit</button>' +
                            '<button class="btn btn-danger btn-sm btn-delete" id="deleteRowBtn" data-row="' + row.suspectID + '">Delete</button>';
                    }
                }
            ]
        });
        unblockUi("#suspectsTable");
    } else {
        $("#actions").hide();
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
                {data: "Date of Birth"}
            ]
        });
        unblockUi("#suspectsTable");
        }
}
*/

$(document).ready(function() {
    $("#addForm").validate({
        rules: {
            suspectid:{
                required: true
            },
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
            suspectid:{
                required: "Please enter suspect ID"
            },
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
            var logid=$("input[name='suspectid']").val();
            var officerid=$("input[name='personalid']").val();
            var weaponid=$("input[name='name']").val();
            var vehicleid=$("input[name='surname']").val();
            var date=$("input[name='date']").val();
            $("#tableOutput").append(" <tr data-logid='"+suspectid+"' data-officerid='"+personalid+"' data-weaponid='"+name+"' data-vehicleid='"+surname+"' data-date='"+date+"'><td>"+suspectid+"</td><td>"+personalid+"</td><td>"+name+"</td><td>"+surname+"</td><td>"+date+"</td><td><button class='btn btn-info btn-sm btn-edit' id='editRowBtn' data-toggle='modal' data-target='#editModal' type='button'>Edit</button><button class='btn btn-danger btn-sm btn-delete' id='deleteRowBtn' type='button'>Delete</button></td></tr>");
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));
            $("#addForm")[0].reset();
            unblockUi("#addForm");
            console.log("Form submitted");
            $('#addSuspect').modal('hide');
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
    $("#addRowBtn").click(function(){
        $("#addSuspect").modal("show");
        console.log("KLIKNUT ADD ROW BTN");
    });
    $(".btn-edit").click(function(){
        $("#editSuspect").modal("show");
        console.log("KLIKNUT EDIT ROW BTN");
    });
    $("#editRowBtn").click(function(){
        $("#editSuspect").modal("show");
        console.log("KLIKNUT EDIT ROW BTN");
    });
    $(".close").click(function(){
        $("#addSuspect").modal("hide");
    });
  });

console.log("Suspcets loaded");