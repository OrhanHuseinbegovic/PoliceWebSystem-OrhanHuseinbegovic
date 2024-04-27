//Collect current user data from local storage, based on id, go through the json file "officers.json" 
//and find and save users data to local storage variable, create that new variable, profile and display
//data on the profile page

// Get the id from local storage
let id = localStorage.getItem("id");

// Fetch the users JSON
$.getJSON('../PoliceWebSystem-OrhanHuseinbegovic/json/officers.json', function(users) {
    // Find the user with the matching OfficerID
    let user = users.find(user => user.OfficerID === id);

    // If a user was found, save the details to local storage
    if (user) {
        localStorage.setItem("name", user.Name);
        localStorage.setItem("surname", user.Surname);
        localStorage.setItem("email", user.Email);
        localStorage.setItem("phone", user.Phone);
        localStorage.setItem("department", user.Department);
        localStorage.setItem("OfficerID", user.OfficerID);

        // Display the user details on the profile page
        $("#namesurname").html(user.Name + " " + user.Surname);
        $("#email").text(user.Email);
        $("#phone").text(user.Phone);
        $("#department").text(user.Department);
        $("#contact").html(
            '<a href="">' + user.Email + '</a>' + '<br/>' + 
            '<a href="">' + user.Phone + '</a>' + '<br/>' +
            '<a href="">' + ("@"+user.Name.toLowerCase() + user.Surname.toLowerCase()) + '</a>'
        );
    }
});

