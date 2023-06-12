import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  // update the database with the new content
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put(content);
  await tx.done;
  console.log("jate database updated");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // if the database is empty, create a new one and return it empty otherwise return the content
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) { // check if the database exists
        return; // if it does, return it
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true }); // if it doesn't, create it
    },
  });
};

initdb();
