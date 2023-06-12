const butInstall = document.getElementById('buttonInstall'); // get install button element from DOM

window.addEventListener('beforeinstallprompt', (event) => { // add event listener for beforeinstallprompt event
  window.deferredPrompt = event; // set deferredPrompt to event
  butInstall.classList.toggle("hidden", false); // toggle install button hidden class to false
});

butInstall.addEventListener('click', async () => { // add event listener for click event
  const promptEvent = window.deferredPrompt; // set promptEvent to deferredPrompt

  if (!promptEvent) { // check if promptEvent is undefined
    return; // return
  }

  promptEvent.prompt(); // prompt user to install app

  window.deferredPrompt = null; // set deferredPrompt to null

  butInstall.classList.toggle("hidden", true); // toggle install button hidden class to true
});

window.addEventListener('appinstalled', (event) => { // add event listener for appinstalled event
  window.deferredPrompt = null; // set deferredPrompt to null
});
