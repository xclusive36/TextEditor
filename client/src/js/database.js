import { openDB } from "idb"; // import the idb library

const initdb = async () =>
  // create a function that initializes the database
  openDB("jate", 1, {
    // open the database
    upgrade(db) {
      // upgrade the database
      if (db.objectStoreNames.contains("jate")) {
        // check if the database exists
        console.log("jate database already exists"); // if it does, return it and log it
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true }); // if it doesn't, create it and log it
      console.log("jate database created"); // log the creation of the database
    },
  });

export const putDb = async (content) => { // update the database
  const contactDb = await openDB('jate', 1); // open the database
  const tx = contactDb.transaction('jate', 'readwrite'); // create a transaction
  const store = tx.objectStore('jate'); // create a store
  const request = store.add({content: content}); // add the content to the store
  const result = await request; // wait for the request to finish
};

export const getDb = async () => { // grab data from the database
  openDB("jate", 1, { // open the database
    upgrade(db) { // upgrade the database if it doesn't exist
      if (db.objectStoreNames.contains("jate")) { // check if the database exists
        console.log("jate database already exists"); // if it does, return it and log it
        return; // return the database
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true }); // if it doesn't, create it and log it
      console.log("jate database created"); // log the creation of the database
    },
  });
};

initdb(); // initialize the database
