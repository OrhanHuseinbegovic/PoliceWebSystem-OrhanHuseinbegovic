var SuspectService = {
    reload_suspects_datatable: function() {
        Utils.get_datatable(
            "suspectsTable",
            //Constants.API_BASE_URL + "suspects", //get_suspects.php
            Constants.get_api_base_url() + "suspects",
            [
                
                {data: "suspectID"},
                {data: "personalID"},
                {data: "name"},
                {data: "surname"},
                {data: "dateOfBirth"},
                {data: "action"}
            ]
        );
    },
    open_edit_suspect_modal: function(suspectID) {
        RestClient.get(
            'suspects/' + suspectID,
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
                "suspects/delete/" + suspectID,
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
    
    $.post(Constants.get_api_base_url() + "suspects/add", data)
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



console.log("Suspcets loaded");