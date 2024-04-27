FormValidation.validate("#activityForm", {}, function (data) {
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "add_activity.php", data)
      //.done(function (data) {
        //toastr.success("You have successfully added the activity.");
        //ActivityService.reload_activities_datatable();
      //})
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        Utils.unblock_ui("#addActivity");
        $("#activityForm")[0].reset();
      });
});
