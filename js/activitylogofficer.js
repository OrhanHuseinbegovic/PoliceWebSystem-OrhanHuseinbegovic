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
        let data = serializeForm(form);
        console.log(JSON.stringify(data));
        unblockUi("#activityForm");
        let nesto = getUsers();
        console.log(nesto);
    }
});

blockUi = (element) => {
    $(element).block({
      message: '<div class="spinner-border text-primary" role="status"></div>',
      css: {
        backgroundColor: "transparent",
        border: "0",
      },
      overlayCSS: {
        backgroundColor: "#000",
        opacity: 0.25,
      },
    });
};

unblockUi = (element) => {
    $(element).unblock({});
};  

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

