import { getDb, putDb } from './database'; // import the getDb and putDb functions from database.js
import { header } from './header'; // import the header from header.js

export default class { // create a class
  constructor() { // create a constructor
    const localData = localStorage.getItem('content'); // get the content from localStorage

    if (typeof CodeMirror === 'undefined') { // check if CodeMirror is loaded
      throw new Error('CodeMirror is not loaded'); // if it isn't, throw an error
    }

    this.editor = CodeMirror(document.querySelector('#main'), { // create a new CodeMirror editor
      value: '', // set the value to nothing
      mode: 'javascript', // set the mode to javascript
      theme: 'monokai', // set the theme to monokai
      lineNumbers: true, // set line numbers to true
      lineWrapping: true, // set line wrapping to true
      autofocus: true, // set autofocus to true
      indentUnit: 2, // set the indent unit to 2
      tabSize: 2, // set the tab size to 2
    });

    getDb().then((data) => { // get the database
      console.info('Loaded data from IndexedDB, injecting into editor'); // log that the data was loaded from indexeddb
      this.editor.setValue(data || localData || header); // set the value of the editor to the data from indexeddb, localStorage, or header
    });

    this.editor.on('change', () => { // listen for changes to the editor
      localStorage.setItem('content', this.editor.getValue()); // set the content of the editor to localStorage
    });

    this.editor.on('blur', () => { // listen for the editor to lose focus
      console.log('The editor has lost focus'); // log that the editor has lost focus
      putDb(localStorage.getItem('content')); // update the database
    });
  }
}
