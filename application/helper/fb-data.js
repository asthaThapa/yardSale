import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase, onValue, push, ref, remove } from "firebase/database";
import { firebaseConfig } from "../helper/fb-credentials";


export function initDB() {
  initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);

export default app;

export function setupSignUpListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "User/");
  onValue(reference, (snapshot) => {
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}

export function storeUser(item) {
  const db = getDatabase();
  const reference = ref(db, "User/");
  push(reference, item);
}


export function saveItem(item, dbName) {
  const db = getDatabase();
  const reference = ref(db, dbName + "/");
  push(reference, item);
}


export function setUpListener(updateFunc, dbName) {
  const db = getDatabase();
  const reference = ref(db, dbName + "/");
  onValue(reference, (snapshot) => {
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}

export function setUpDetailListener(updateFunc, dbName, postId) {
  const db = getDatabase();
  const reference = ref(db, dbName + "/");
  onValue(reference, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.key == postId) {
        if (childSnapshot?.val()) {
          updateFunc([childSnapshot?.val()])
        } else {
          updateFunc([])
        }
      }
    });
  });
}

export function saveFavorite(item, dbName) {
  try {
    const db = getDatabase();
    const reference = ref(db, dbName + "/");
    const newChildRef = push(reference, item);
    const docId = newChildRef.key;
    return docId;
  } catch (err) {
    console.log(err);
  }

}

export function removeFavorite(postId, dbName) {
  console.log(postId)
  const db = getDatabase();
  const reference = ref(db, dbName + "/" + postId)
  remove(reference)
    .then(() => {
      console.log("Favorite removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing favorite:", error);
    });
}




