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




/*
getPosts = () => {
    return fetch("../PoliceWebSystem-OrhanHuseinbegovic/json/cases.json")
        .then((res) => res.json())
        .then((data) => {
            let output = "";
            data.forEach((post) => {
                output += `
                <article class="post vt-post">
                    <div class="row">
                        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                            <div class="author-info author-info-2">
                                <ul class="list-inline">
                                    <li>
                                        <div class="info">
                                            <p>Posted on:</p>
                                            <strong>${post["Date made"]}</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                            <div class="caption">
                                <h3 class="md-heading"><a href="#">${post["Case Name"]}</a></h3>
                                <p>${post["Case description"]}</p>
                            </div>
                        </div>
                    </div>
                </article>
                `;
        });
        document.getElementById("ispis").innerHTML = output;
    })
    .catch((err) => console.log(err));
};

getPosts();
*/