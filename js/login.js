$("#loginForm").validate({
    rules: {
        inputEmail:{
            required: true,
            email: true,
            minlength: 8
        },
        inputPassword:{
            required: true,
            minlength: 8
        }
    },
    messages: {
        inputEmail:{
            required: "Please enter your email",
            email: "Please enter a valid email",
            minlength: "Email must be at least 8 characters long"
        },
        inputPassword:{
            required: "Please enter your password",
            minlength: "Minimum 8 characters"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUi("#loginForm"); 
        let data = serializeForm(form);
        console.log("THIS IS DATA: "+JSON.stringify(data));
        $("#loginForm")[0].reset();
        unblockUi("#loginForm");
        console.log("Form submitted");
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
