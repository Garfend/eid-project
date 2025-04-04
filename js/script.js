document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (!validatePassword(password)) {
                alert("Password must be 8 characters long, contain a capital letter, small letter, and a special character.");
                return;
            }

            let user = { name, email, password };
            localStorage.setItem(email, JSON.stringify(user));
            alert("Registration successful!");
            window.location.href = "index.html";
        });
    }

    // Login User
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("loginEmail").value;
            let password = document.getElementById("loginPassword").value;

            let storedUser = localStorage.getItem(email);

            if (!storedUser) {
                alert("Invalid credentials!");
                return;
            }

            let user = JSON.parse(storedUser);

            if (user.password !== password) {
                alert("Invalid credentials!");
                return;
            }

            sessionStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "home.html";
        });
    }

    // Display Username on Home
    if (document.getElementById("username")) {
        let user = JSON.parse(sessionStorage.getItem("currentUser"));
        if (!user) {
            window.location.href = "index.html";
        } else {
            document.getElementById("username").innerText = user.name;
        }
    }
});

// Validate Password
function validatePassword(password) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Logout
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
