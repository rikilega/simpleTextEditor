const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the immediate prompt
    event.preventDefault();
    // Store the event object
    deferredPrompt = event;
    // Make the install button visible to the user
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for user to respond
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, you can handle the outcome (accepted or dismissed)
        console.log(`User response: ${outcome}`);
        // Clear the stored event
        deferredPrompt = null;
        // Hide the install button after user interaction
        butInstall.style.display = 'none';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', () => {
    console.log('App installed successfully!');
    butInstall.style.display = 'none';
});
