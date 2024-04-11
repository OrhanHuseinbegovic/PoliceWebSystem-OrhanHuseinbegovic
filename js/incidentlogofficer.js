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

