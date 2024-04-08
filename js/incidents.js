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

console.log("INCIDENTS lOADED");