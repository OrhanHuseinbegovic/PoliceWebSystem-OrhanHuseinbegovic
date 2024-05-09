//check if local storage is empty, if yes, redirect to login page

/*
function checkLocalStorage() {
    if (localStorage.length === 0) {
        // Redirect to the login page if Local Storage is empty
        window.location.href = "login.html";
    }
}
*/


// Retrieve user data from localStorage
const userData = JSON.parse(localStorage.getItem('user'));

// Check if the user is admin
const isAdmin = userData.isAdmin === 1;

// Get reference to your navbar elements
const adminNavbar = document.getElementById('adminSidebar');
const userNavbar = document.getElementById('userSidebar');

// Display the appropriate navbar based on isAdmin value
if (isAdmin) {
    adminNavbar.style.display = 'block';
    userNavbar.style.display = 'none';
} else {
    adminNavbar.style.display = 'none';
    userNavbar.style.display = 'block';
}


/*
// Check if the user is an admin based on localstorage key isAdmin, if true, show userSidebar, else show adminSidebar
function checkAdmin() {
    let user = localStorage.getItem("user");
    if (user.isAdmin === 1) {
        $("#userSidebar").hide();
        $("#adminSidebar").show();
    } else {
        $("#userSidebar").show();
        $("#adminSidebar").hide();
    }
}
*/

/*
$(document).ready(function() {
    // Check the isAdmin status when the page loads
    console.log("Document ready");
    checkAdmin();
});
*/

// Set an interval to check Local Storage every second (adjust the interval as needed)
//setInterval(checkLocalStorage, 200); // Check every second
//setInterval(checkAdmin, 200); // Check every second

//on button log out click, clear local storage and redirect to login page
$(document).on('click', '#logOutBtn', function() {
    localStorage.clear();
    window.location.href = "login.html";
});



function blockUi(element) {
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
}

function unblockUi(element) {
    $(element).unblock({});
}

$(document).on('click', '#deleteRowBtn', function() {
    $(this).parents('tr').remove();
});

console.log("COMMON js loaded right now");





