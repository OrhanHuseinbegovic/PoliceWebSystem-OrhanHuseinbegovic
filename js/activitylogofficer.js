/*
const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

// Fetch the officer ID from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const officerID = user.officerID;

// Merge the current date and officer ID with the form data
data.date = date;
data.officerID = officerID;
*/



FormValidation.validate("#activityForm", {}, function (data) {
    Utils.block_ui("#activityForm");

    const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Fetch the officer ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const officerID = user.officerID;

    // Merge the current date and officer ID with the form data
    data.officerID = officerID;
    data.date = date;

    console.log("Data from form is serialized into", data);
    $.post(Constants.get_api_base_url() + "equipments/add", data)
      .done(function (data) {
        toastr.success("You have successfully added the activity.");
        //ActivityService.reload_activities_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        Utils.unblock_ui("#activityForm");
        $("#activityForm")[0].reset();
      });
});
