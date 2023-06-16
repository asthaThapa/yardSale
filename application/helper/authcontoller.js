import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import {
    app
} from "../helper/fb-data";

const auth = getAuth(app);
const db = getDatabase(app);
let  user = '';
let errorMessage = '';




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
                    console.log("User profile data:", userProfile);
                    alert("Logged In!");
                } else {
                    console.log("User profile does not exist in the database");
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error logging in:", errorMessage);

            // Display error message to the user
            alert(errorMessage);
        });
        return errorMessage;
};

export function handleLogOut(state) {
    signOut(auth).then(() => {
        alert("Sign Out successfully!");
    }).catch((error) => {
        console.log("Error Signing out: ",error);
    });

};


export function getUser(){
    return user.uid;
};