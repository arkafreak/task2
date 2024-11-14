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

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;

    if (swipeDistance > 50 && !drawer.classList.contains('open')) {
        // Swipe right to open if drawer is not already open
        drawer.classList.add('open');
    } else if (swipeDistance < -50 && drawer.classList.contains('open')) {
        // Swipe left to close if drawer is open
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
// Get the elements
const cameraButtons = document.querySelectorAll('#cameraButton');
const cameraContainer = document.getElementById('cameraContainer');
const closeCameraBtn = document.getElementById('closeCameraBtn');
const cameraFeed = document.getElementById('cameraFeed');
const noCameraMessage = document.getElementById('noCameraMessage');

// Function to handle opening the camera popup
function openCamera() {
    // Show the camera container and apply blur to the background
    cameraContainer.style.display = 'flex';
    document.body.classList.add('camera-active');  // Add blur to background

    // Try to access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraFeed.srcObject = stream;
            noCameraMessage.style.display = 'none';  // Hide "no camera" message
        })
        .catch(error => {
            console.error('Error accessing camera', error);
            noCameraMessage.style.display = 'block';  // Show error message if no camera is found
        });
}

// Add event listener to both camera buttons
cameraButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent the default behavior of the link
        openCamera();
    });
});

// When the close button is clicked, hide the camera container and remove blur
closeCameraBtn.addEventListener('click', () => {
    cameraContainer.style.display = 'none';
    document.body.classList.remove('camera-active');  // Remove blur from the background

    // Stop the camera stream when closing the overlay (optional for better performance)
    const stream = cameraFeed.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
});


// Select the container where the data will be displayed
const userInfo = document.getElementById('userInfo');

// Function to fetch random user data
function fetchUserData() {
    // API endpoint for random user data
    const apiURL = 'https://randomuser.me/api/';

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display user data on the page
            const user = data.results[0];
            const userHTML = `
                <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
                <img src="${user.picture.medium}" alt="User Picture">
            `;
            userInfo.innerHTML = userHTML;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            userInfo.innerHTML = '<p>Error loading user data. Please try again later.</p>';
        });
}

// Call fetchUserData every 3 seconds to refresh the data
setInterval(fetchUserData, 3000);

// Call the function to fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchUserData);
