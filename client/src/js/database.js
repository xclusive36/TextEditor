import { openDB } from "idb"; // import the idb library

const initdb = async () => // create a function that initializes the database
  openDB("jate", 1, { // open the database
    upgrade(db) { // upgrade the database
      if (db.objectStoreNames.contains("jate")) { // check if the database exists
        console.log("jate database already exists"); // if it does, return it and log it
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true }); // if it doesn't, create it and log it
      console.log("jate database created"); // log the creation of the database
    },
  });

export const putDb = async (content) => { // create a function that updates the database
  const db = await openDB("jate", 1); // open the database
  const tx = db.transaction("jate", "readwrite"); // create a transaction to update the database
  const store = tx.objectStore("jate"); // create a store to update the database
  await store.put(content); // update the database
  await tx.done; // close the transaction
  console.log("jate database updated"); // log the update of the database
};

export const getDb = async () => { // create a function that gets the database
  openDB("jate", 1, { // open the database
    upgrade(db) { // upgrade the database
      if (db.objectStoreNames.contains("jate")) { // check if the database exists
        return; // if it does, return it
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true }); // if it doesn't, create it
    },
  });
};

initdb(); // initialize the database
