import { Workbox } from 'workbox-window'; // import workbox window
import Editor from './editor'; // import editor class
import './database'; // import database
import '../css/style.css'; // import css

const main = document.querySelector('#main'); // get main element from DOM
main.innerHTML = ''; // clear main element

const loadSpinner = () => { // create spinner element and append to main element
  const spinner = document.createElement('div'); // create spinner element as a div
  spinner.classList.add('spinner'); // add spinner class to spinner element
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner); // append spinner element to main element
};

const editor = new Editor(); // create new editor instance

if (typeof editor === 'undefined') { // check if editor is undefined
  loadSpinner(); // load spinner
}

if ('serviceWorker' in navigator) { // check if service worker is supported
  const workboxSW = new Workbox('/src-sw.js'); // create new workbox service worker
  workboxSW.register(); // register service worker
} else { // if service worker is not supported
  console.error('Service workers are not supported in this browser.'); // log error
}
