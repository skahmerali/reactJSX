/***** Classified App (CRUD-Operations) ******/

// Sign Up Area....!
let userName = document.getElementById("userName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let customError = document.getElementById("custom-error");

// Firebase Storage Area. Getting user profile pic and saving in firebase storage...!
let profilePic = document.getElementById("image-tag");
let storage = firebase.storage();
let database = firebase.firestore();

// Sign Up Function...!
const signUp = () => {
    if (profilePic.value !== "" && userName.value != 0) {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((success) => {
                var getName = userName.value;

                // Profile Pic Area Start...!
                let myFile = profilePic.files[0];
                // console.log(myFile.name);

                let imageRef = storage.ref().child(`Profile Pic/ ${myFile.name}`);
                imageRef.put(myFile)
                    .then((snapshot) => {
                        imageRef.getDownloadURL()
                            .then((url) => {
                                // console.log(url, userName.value, email.value);
                                database.collection("Users").add({
                                    profilePicURL: url,
                                    name: getName,
                                    userEmail: success.user.email,
                                    uid: success.user.uid
                                })
                                    .then((userRegistered) => {
                                        // console.log(userRegistered);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                // Profile Pic Area End...!

                // console.log(success);
                customError.style.display = "block";
                setTimeout(() => {
                    customError.style.display = "none";
                }, 2000);
                userName.value = "";
                email.value = "";
                password.value = "";
                userName.focus();
                profilePic.value = null;
            })
            .catch((error) => {
                console.log(error);
                customError.style.display = "block";
                customError.innerHTML = error.message;
                setTimeout(() => {
                    customError.style.display = "none";
                }, 2000);
                userName.value = "";
                email.value = "";
                password.value = "";
                profilePic.value = null;
                userName.focus();
            });
    }

    else {
        customError.style.display = "block";
        customError.innerHTML = "You need to fill all the fields accurately!!!";
        setTimeout(() => {
            customError.style.display = "none";
        }, 2000);
        userName.value = "";
        email.value = "";
        password.value = "";
        profilePic.value = null;
        userName.focus();
    }
}

// Log In Area...!
let emailForLogIn = document.getElementById("login-email");
let paswordForLogIn = document.getElementById("login-password");

// Log In Function...!
const logIn = () => {
    firebase.auth().signInWithEmailAndPassword(emailForLogIn.value, paswordForLogIn.value)
        .then((success) => {
            // console.log(success.user.uid);
            // Fetching current logged in user data from database...!
            database.collection("Users")
                .where("uid", "==", success.user.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, doc.data());
                        localStorage.setItem("userData", JSON.stringify(doc.data()));
                        homePage();
                    });
                });

            customError.style.display = "block";
            customError.innerHTML = "You have Logged In Successfully";
            setTimeout(() => {
                customError.style.display = "none";
            }, 3000);
            emailForLogIn.value = "";
            paswordForLogIn.value = "";
            emailForLogIn.focus();
        })
        .catch((error) => {
            // console.log(error);
            customError.style.display = "block";
            customError.innerHTML = error.message;
            setTimeout(() => {
                customError.style.display = "none";
            }, 2000);
            emailForLogIn.value = "";
            paswordForLogIn.value = "";
            emailForLogIn.focus();
        });
}

// Redirecting to home page...!
const homePage = () => {
    let newUser = firebase.auth().currentUser;
    let convertIdIntoJSON = JSON.stringify(newUser.uid);
    localStorage.setItem("currentUserUid", convertIdIntoJSON);
    window.location.href = "timeline.html";
}

// Password reset area...!
let resetPasswordEl = document.getElementById("reset_email");
let validationForEmail = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

const forgetPassword = () => {

    if (resetPasswordEl.value.match(validationForEmail)) {
        firebase.auth().sendPasswordResetEmail(resetPasswordEl.value)
            .then((success) => {
                // console.log("Pasword reset email has been sent to you!\nKindly check your email and forget the password");
                customError.style.display = "block";
                customError.innerHTML = "Password reset email has been sent to you! Kindly check your email and reset the password!!!";
                setTimeout(() => {
                    customError.style.display = "none";
                }, 5000);
                resetPasswordEl.value = "";
                resetPasswordEl.focus();
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    else {
        customError.style.display = "block";
        customError.innerHTML = "Invalid Email Format";
        setTimeout(() => {
            customError.style.display = "none";
        }, 2000);
        resetPasswordEl.value = "";
        resetPasswordEl.focus();
    }
}

// Sign Up and Log In and Reset-Password Work Completed...!