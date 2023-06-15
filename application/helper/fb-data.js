import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase, onValue, push, ref, set, update } from "firebase/database";
import {firebaseConfig} from "../helper/fb-credentials";


export function initDB() {
  initializeApp(firebaseConfig);
}

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



