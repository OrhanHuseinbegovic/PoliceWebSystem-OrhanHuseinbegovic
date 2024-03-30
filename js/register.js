$("#registerForm").validate({
    rules: {
        Name:{
            required: true
        },
        Surname:{
            required: true
        },
        PersonalID:{
            required: true
        },
        DateofBirth:{
            required: true
        },
        Password:{
            required: true,
            minlength: 8
        },
        ConfirmedPassword:{
            required: true,
            equalTo: "#inputPassword"
        }
    },
    messages: {
        Name:{
            required: "Please enter your first name"
        },
        Surname:{
            required: "Please enter your last name"
        },
        PersonalID:{
            required: "Please enter your personal ID"
        },
        DateofBirth:{
            required: "Please enter your date of birth"
        },
        Password:{
            required: "Please enter your password",
            minlength: "Minimum 8 characters"
        },
        ConfirmedPassword:{
            required: "Please confirm your password",
            equalTo: "Passwords do not match"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUi("#registerForm"); 
        let data = serializeForm(form);
        console.log(JSON.stringify(data));
        $("#registerForm")[0].reset();
        unblockUi("#registerForm");
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

getUsers();
