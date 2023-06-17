import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updateProfile,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { getDatabase, ref, onValue, set,update} from "firebase/database";
import {
  app
} from "../helper/fb-data";

const auth = getAuth(app);
const db = getDatabase(app);
let user = '';

export function handleSignUp(state) {
  createUserWithEmailAndPassword(auth, state.email, state.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), {
        username: state.username,
        email: state.email,
        password: state.password,
        phonenumber: state.phonenumber,
        name: state.name,
        location: state.location,
      })
        .then(() => {

          console.log("User created and data written to the database successfully");
        })
        .catch((error) => {
          console.log("Error writing data to the database:", error);
        });
        return "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Sign up error:", errorCode, errorMessage);
      alert(errorMessage);
      return(error);
    });


};

export function handleLogin(state) {
  signInWithEmailAndPassword(auth, state.email, state.password)
    .then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          const userProfile = snapshot.val();
          // console.log("User profile data:", userProfile);
        } else {
          alert("Could not login, try again!");
          console.log("User profile does not exist in the database");
        }
      });
      return "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error logging in:", errorMessage);

      // Display error message to the user
      alert(errorMessage);
      return error;
    });

};

export function handleLogOut(state) {
  signOut(auth).then(() => {
    alert("Sign Out successfully!");
    return "";
  }).catch((error) => {
    console.log("Error Signing out: ", error);
    return error;
  });

};


export function getUser() {
  return user.uid;
};

export function getAddress() {
  return user.location;
}

export function getPhoneNumber() {
  return user.phonenumber;
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    const userRef = ref(db, 'users/' + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        reject(new Error("User data not found"));
      }
    }, (error) => {
      reject(error);
    });
  });
};

export function updateinfo(text, title) {
  const updates = {};
  updates[title] = text;
  update(ref(db, `users/${user.uid}`), updates);
}

export function updateemail(text) {
  updateEmail(auth.currentUser, text).then(() => {
    // Email updated!
    alert("Email Updated!");
    update(ref(db, `users/${user.uid}`), {
      email:text,
    });
  }).catch((error) => {
    // An error occurred
    console.log(error);
  });

};

export function updatePassWord(text) {
  updatePassword(user, text).then(() => {
    // Update successful.
    alert("Password Updated!");
    update(ref(db, `users/${user.uid}`), {
      password:text,
    });
  }).catch((error) => {
    // An error ocurred
    // ...
  });
}