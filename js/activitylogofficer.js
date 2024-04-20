$("#activityForm").validate({
    rules: {
        shift: {
            required: true
        },
        weapon: {
            required: true
        },
        vehicle: {
            required: true
        }
    },
    messages: {
        shift:{
            required: "Please select your shift"
        },
        weapon:{
            required: "Please select your weapon"
        },
        vehicle:{
            required: "Please select your vehicle"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUi("#activityForm"); 

        var officerID = localStorage.getItem("id");
        var currentDate = new Date().toISOString().slice(0, 10);
        $('#officerID').val(officerID);
        $('#currentDate').val(currentDate);
        $('#logID').val("L"+Math.floor(Math.random() * 1000) + 1);

        let data = serializeForm(form);
        console.log(JSON.stringify(data));

        $("#activityForm")[0].reset();
        unblockUi("#activityForm");
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

