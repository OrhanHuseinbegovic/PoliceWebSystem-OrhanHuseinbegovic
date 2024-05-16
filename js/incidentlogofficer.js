FormValidation.validate("#incidentForm", {}, function (data) {
    Utils.block_ui("#incidentForm");
    const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Fetch the officer ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const officerID = user.officerID;

    // Merge the current date and officer ID with the form data
    data.officerID = officerID;
    data.date = date;
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "incidents/add", data)
      .done(function (data) {
        toastr.success("You have successfully added the incident.");
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        $("#incidentForm")[0].reset();
        Utils.unblock_ui("#incidentForm");
      });
});




/*
$("#incidentForm").validate({
    rules: {
        Type:{
            required: true
        },
        Description:{
            required: true
        },
        Date:{
            required: true
        }
    },
    messages: {
        Type:{
            required: "Please select type"
        },
        Description:{
            required: "Please enter description"
        },
        Date:{
            required: "Please enter date"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUi("#incidentForm"); 

        if(localStorage.getItem("isAdmin")=="true"){
            var officerID = localStorage.getItem("officerID");
            $('#officerID').val(officerID);
        }
        else{
            var id = localStorage.getItem("id");
            $('#officerID').val(id);
        }

        $('#incidentID').val("L"+Math.floor(Math.random() * 1000) + 1);

        let data = serializeForm(form);
        console.log(JSON.stringify(data));
        $("#incidentForm")[0].reset();
        unblockUi("#incidentForm");
    }
});


serializeForm = (form) => {
    let jsonResul = {};
    $.each($(form).serializeArray(), function () {
        jsonResul[this.name] = this.value;    
    });
    return jsonResul;
}


getUsers = () => {
    $.get("../PoliceWebSystem-OrhanHuseinbegovic/json/users.json", function(users) {
        console.log(users);
    });
};
*/

