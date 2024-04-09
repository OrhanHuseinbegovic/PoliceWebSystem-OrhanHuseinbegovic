$(document).ready(function() {
    $("#loginForm").validate({
        rules: {
            Email:{
                required: true,
                email: true,
                minlength: 8
            },
            Password:{
                required: true,
                minlength: 8
            }
        },
        messages: {
            Email:{
                required: "Please enter your email",
                email: "Please enter a valid email",
                minlength: "Email must be at least 8 characters long"
            },
            Password:{
                required: "Please enter your password",
                minlength: "Minimum 8 characters"
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            blockUi("#loginForm"); 
            let data = serializeForm(form);
            console.log("THIS IS DATA: "+JSON.stringify(data));

            //Fetching data from json file and checking if the user exists
            $.get("../PoliceWebSystem-OrhanHuseinbegovic/json/users.json", function(users) {
                let userExists = false;
                for(let i = 0; i < users.length; i++){
                    if(users[i].Email === data.Email && users[i].Password === data.Password){
                        userExists = true;
                        let user = {
                            OfficerID: users[i].OfficerID,
                            Email: users[i].Email,
                            Password: users[i].Password,
                            isAdmin: users[i].isAdmin
                        };
                        let isAdmin = user.isAdmin;
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("isAdmin", isAdmin);
                        console.log(localStorage);
                        break;
                    }
                }
                if(userExists){
                    console.log("User exists");
                    window.location.href = "index.html";
                }else{
                    console.log("User does not exist");
                    unblockUi("#loginForm");
                    alert("User does not exist");
                }
            });
            


            $("#loginForm")[0].reset();
            unblockUi("#loginForm");
            console.log("Form submitted");
        }
    });
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
    localStorage.clear();
};

getUsers();
