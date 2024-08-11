const lightModeButton = document.getElementById('lightModeButton');
const darkModeButton = document.getElementById('darkModeButton');

// Pages are initialized on load based on stored preferences
document.addEventListener('DOMContentLoaded', function () {
    // Read the stored mode preference
    const modePreference = localStorage.getItem('modePreference');
    // Apply the corresponding mode according to the mode preference
    if (modePreference === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
});


//  Set listener to change the mode
lightModeButton.addEventListener('click', function (event) {
    event.preventDefault();
    setModePreference('light');
});

darkModeButton.addEventListener('click', function (event) {
    event.preventDefault();
    setModePreference('dark');
});

// Setting mode preferences
function setModePreference(mode) {
    //Storage mode preference to localStorage
    localStorage.setItem('modePreference', mode);
    if (mode === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
}

// Set linght mode
function setLightMode() {
    document.body.style.opacity = '1'; // Completely opaque
    document.body.style.backgroundColor = ''; // change the background color
}

// Set dark mode
function setDarkMode() {
    document.body.style.opacity = '0.6'; // Transparency is 0.6
    document.body.style.backgroundColor = '#333'; // change the background color
    document.body.style.color = 'white';
}
