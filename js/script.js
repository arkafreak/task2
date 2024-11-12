const menuToggle = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.close-btn');
const drawer = document.querySelector('.drawer');

// Function to open the drawer
menuToggle.addEventListener('click', (e) => {
    drawer.classList.add('open');
    e.stopPropagation(); // Prevent click event from bubbling up
});

// Function to close the drawer when clicking on the close button
closeBtn.addEventListener('click', (e) => {
    drawer.classList.remove('open');
    e.stopPropagation();
});

// Function to close the drawer when clicking outside of it
document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !menuToggle.contains(e.target)) {
        drawer.classList.remove('open');
    }
});

// Stop event propagation for clicks inside the drawer
drawer.addEventListener('click', (e) => {
    e.stopPropagation();
});


// for gesture controller of the drawer
let startX = 0;
let endX = 0;

drawer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

drawer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

drawer.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;
    
    if (swipeDistance > 50) {
        // Swipe right to open
        drawer.classList.add('open');
    } else if (swipeDistance < -50) {
        // Swipe left to close
        drawer.classList.remove('open');
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const openFormButton = document.getElementById("openFormButton");
    const formOverlay = document.getElementById("formOverlay");
    const closeFormButton = document.getElementById("closeFormButton");
    const registrationForm = document.getElementById("registrationForm");

    openFormButton.addEventListener("click", function () {
        formOverlay.style.display = formOverlay.style.display === "none" ? "flex" : "none";
        openFormButton.textContent = formOverlay.style.display === "flex" ? "Hide Registration Form" : "Click to Register";
    });

    closeFormButton.addEventListener("click", function () {
        formOverlay.style.display = "none";
        openFormButton.textContent = "Click to Register";
    });

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validation checks
        if (username === "") {
            alert("Username is required");
            return;
        }
        if (email === "" || !validateEmail(email)) {
            alert("Please enter a valid email address");
            return;
        }
        if (password === "" || password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        // If validation passes, show success tick mark animation and redirect
        showSuccessMessage();
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show success tick mark animation and redirect after 2 seconds
    function showSuccessMessage() {
        document.body.innerHTML = `
            <div class="success-container">
                <div class="checkmark-circle">
                    <i class="fas fa-check"></i>
                </div>
                <h1>Registration Successful</h1>
            </div>
        `;

        // Animation for the checkmark
        setTimeout(() => {
            document.querySelector(".checkmark-circle i").classList.add("checkmark-animation");
        }, 100);

        // Redirect to the index page after 2 seconds
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to index page
        }, 2500); // Allow animation to complete before redirect
    }
});