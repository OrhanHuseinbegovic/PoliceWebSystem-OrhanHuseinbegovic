function checkAdmin() {
    let isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
        $("#caseForm").show();
    } else {
        $("#caseForm").hide();
    }
}

$(document).ready(function() {
    checkAdmin();
});

var CaseService = {
    reload_cases_datatable: function() {
        Utils.get_datatable(
            "casesTable",
            Constants.API_BASE_URL + "get_cases.php",
            [
                { data: "caseID" },
                { data: "date" },
                { data: "name" },
                { data: "description" },
                { data: "action" }
            ]
        );
    },
    open_edit_case_modal: function(caseID) {
        RestClient.get(
            "get_case.php?caseID=" + caseID,
            function(data) {
                $("#editCaseModal").modal("toggle");
                $("#editCaseForm input[name='caseID']").val(data.caseID);
                $("#editCaseForm input[name='name']").val(data.name);
                $("#editCaseForm input[name='date']").val(data.date);
                $("#editCaseForm textarea[name='description']").val(data.description);
            }
        );
    },
    delete_case: function(caseID) {
        if (confirm("Do you want to delete case with ID: " + caseID + "?") == true) {
            RestClient.delete(
                "delete_case.php?caseID=" + caseID,
                {},
                function(data) {
                    toastr.success("You have successfully deleted the case.");
                    CaseService.reload_cases_datatable();
                }
            );
        }
    }
};

CaseService.reload_cases_datatable();

FormValidation.validate("#addCaseForm", {}, function (data) {
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "add_case.php", data)
      .done(function (data) {
        $("#addCaseModal").modal("toggle");
        toastr.success("You have successfully added the case.");
        CaseService.reload_cases_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        $("#addCaseForm")[0].reset();
        $("#addCaseModal").modal("hide");
      });
});

FormValidation.validate("#editCaseForm", {}, function (data) {
    console.log("Data from form is serialized into", data);
    $.post(Constants.API_BASE_URL + "add_case.php", data)
      .done(function (data) {
        $("#editCaseModal").modal("toggle");
        toastr.success("You have successfully edited the case.");
        CaseService.reload_cases_datatable();
      })
      .fail(function (error) {
        toastr.error(JSON.parse(error.responseText).error);
      })
      .always(function () {
        $("#editCaseForm")[0].reset();
        $("#editCaseModal").modal("hide");
      });
});
    

$(document).ready(function() {
    $("#addCase").click(function() {
        $("#addCaseModal").modal("show");
    });
    $(".edit").click(function() {
        $("#editCaseModal").modal("show");
    });
    $("#closeAddModal").click(function() {
        $("#addCaseForm")[0].reset();
        $("#addCaseModal").modal("hide");
    });
    $("#closeEditModal").click(function() {
        $("#editCaseForm")[0].reset();
        $("#editCaseModal").modal("hide");
    });

});


/*

$("#caseForm").validate({
    rules: {
        CaseName: {
            required: true
        },
        Description: {
            required: true
        },
        Date: {
            required: true
        }
    },
    messages: {
        CaseName:{
            required: "Please enter case name"
        },
        Date:{
            required: "Please select date"
        },
        Description:{
            required: "Please enter description"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUi("#caseForm"); 
        let data = serializeForm(form);
        console.log(JSON.stringify(data));
        $("#caseForm")[0].reset();
        unblockUi("#caseForm");
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
*/
/*
getCases = () => {
    $.get("../PoliceWebSystem-OrhanHuseinbegovic/json/cases.json", (cases) => {
        console.log(cases);    
        let output = "";
        blockUi("#output");
        cases.forEach((caseItem) => {
            output += `
            <article class="post vt-post">
                <div class="row">
                    <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                        <div class="author-info author-info-2">
                            <ul class="list-inline">
                                <li>
                                    <div class="info">
                                        <p>Posted on:</p>
                                        <strong>${caseItem["Date made"]}</strong>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                        <div class="caption">
                            <h3 class="md-heading">${caseItem["Case Name"]}</h3>
                            <p>${caseItem["Case description"]}</p>
                        </div>
                    </div>
                </div>
            </article>
            `;
        });
        $("#output").html(output);
        unblockUi("#output");
    });
}
getCases();
*/