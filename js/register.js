/*
$("#registerForm").validate({
    rules: {
        personalID:{
            required: true,
            number: true
        },
        name:{
            required: true
        },
        surname:{
            required: true
        },
        dateOfBirth:{
            required: true
        },
        phone:{
            required: true,
            number: true
        },
        password:{
            required: true,
            minlength: 8
        },
        repeat:{
            required: true,
            equalTo: "#inputPassword"
        }
    },
    messages: {
        personalID:{
            required: "Please enter your personal ID",
            number: "Please enter a valid personal ID"
        },
        name:{
            required: "Please enter your name"
        },
        surname:{
            required: "Please enter your surname"
        },
        dateOfBirth:{
            required: "Please enter your date of birth"
        },
        phone:{
            required: "Please enter your phone number",
            number: "Please enter a valid phone number"
        },
        password:{
            required: "Please enter your password",
            minlength: "Minimum 8 characters"
        },
        repeat:{
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
*/


FormValidation.validate("#registerForm",{}, function(data){
    Utils.block_ui("#registerForm");

    // Get the value of the checkbox
    var checkboxValue = $("#isAdmin").is(":checked") ? 1 : 0;
    
    
    // Add the checkbox value to the data object
    data['isAdmin'] = checkboxValue;

    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "officers/add", data)
        .done(function(data){
            $("#registerForm")[0].reset();
            toastr.success("User successfully registered");
        })
        .fail(function(error){
            toastr.error("Error while registering user");
        })
        .always(function(){
            Utils.unblock_ui("#registerForm");
        }
    );
})


