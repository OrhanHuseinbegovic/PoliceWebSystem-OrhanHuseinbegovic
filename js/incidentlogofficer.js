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
        let data = serializeForm(form);
        console.log(JSON.stringify(data));
        $("#incidentForm")[0].reset();
        unblockUi("#incidentForm");
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

