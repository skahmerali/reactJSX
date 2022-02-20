/***** Classified App (CRUD Operations) ******/

let profileName = document.getElementById("profile-name");

let database = firebase.firestore();
let storage = firebase.storage();

let getCurrentUserUid = localStorage.getItem("currentUserUid");
let getID = JSON.parse(getCurrentUserUid);

// Fething current user data in real time...!

let unSubscribe;

const getAllUserDataInRealTime = () => {
    let getUserDataFromLS = localStorage.getItem("userData");
    getUserDataFromLS = JSON.parse(getUserDataFromLS);
    // console.log(getUserDataFromLS);
    profileName.innerHTML = `${getUserDataFromLS.name}'s Profile`;

    unSubscribe = database.collection("Posts")
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    // console.log("New Post: ", change.doc.data(), change.doc.id);
                    showDataInDOM(change.doc);
                }

                if (change.type === "modified") {
                    // console.log("Modified Post: ", change.doc.data());
                    updateDataInDOM(change.doc);
                }

                if (change.type === "removed") {
                    // console.log("Removed Post: ", change.doc.data());
                    deleteItemFromDOM(change.doc.id);
                }
            });
        });
}

let mainDiv = document.getElementById("timeline-container");

// Function to show real time data in DOM...!
const showDataInDOM = (getData) => {
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("id", getData.id);
    innerDiv.setAttribute("class", "inner-container");

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode("Laptop For Sale!");
    h3.setAttribute("id", "list-head");
    h3.appendChild(h3Text);

    let productNameElement = document.createElement("li");
    productNameElement.setAttribute("class", "list-group-item");
    let productNameElText = document.createTextNode(getData.data().productName);

    let productModelElement = document.createElement("li");
    productModelElement.setAttribute("class", "list-group-item");
    let productModelElText = document.createTextNode(getData.data().productModel);

    let productRAMElement = document.createElement("li");
    productRAMElement.setAttribute("class", "list-group-item");
    let productRamElText = document.createTextNode(getData.data().productRAM);

    let productHDDElement = document.createElement("li");
    productHDDElement.setAttribute("class", "list-group-item");
    let productHddElText = document.createTextNode(getData.data().productHDD);

    let productSddElement = document.createElement("li");
    productSddElement.setAttribute("class", "list-group-item");
    let productSddElText = document.createTextNode(getData.data().productSSD);

    let productPriceElement = document.createElement("li");
    productPriceElement.setAttribute("class", "list-group-item");
    let productPriceElText = document.createTextNode(getData.data().productPrice);

    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", getData.data().saveLaptopImageURL);
    imgTag.setAttribute("id", "product-image");

    let imageBoxParent = document.createElement("div");
    imageBoxParent.setAttribute("id", "product-image-paremt");
    imageBoxParent.appendChild(imgTag);

    // Delete Button Area...!
    let delBtn = document.createElement("button")
    let delBtnText = document.createTextNode("Delete");
    delBtn.appendChild(delBtnText);
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.setAttribute("class", "btn btn-primary");

    // Edit Button Area...!
    let editBtn = document.createElement("button")
    let editBtnText = document.createTextNode("Edit");
    editBtn.appendChild(editBtnText);
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.setAttribute("class", "btn btn-primary");

    // Appending Childs...!
    productNameElement.appendChild(productNameElText);
    productModelElement.appendChild(productModelElText);
    productRAMElement.appendChild(productRamElText);
    productHDDElement.appendChild(productHddElText);
    productSddElement.appendChild(productSddElText);
    productPriceElement.appendChild(productPriceElText);

    innerDiv.appendChild(h3);
    innerDiv.appendChild(productNameElement);
    innerDiv.appendChild(productModelElement);
    innerDiv.appendChild(productRAMElement);
    innerDiv.appendChild(productHDDElement);
    innerDiv.appendChild(productSddElement);
    innerDiv.appendChild(productPriceElement);
    innerDiv.appendChild(imageBoxParent);
    // innerDiv.appendChild(delBtn);
    // innerDiv.appendChild(editBtn);

    mainDiv.appendChild(innerDiv);
}

// Function to delete item from firebase database...!
const deleteItem = (targetDelEl) => {
    let delItemTargetId = targetDelEl.parentNode.id;

    database.collection("Posts")
        .doc(delItemTargetId)
        .delete()
        .then(function () {
            // console.log("Document successfully deleted!");
            customError.style.display = "block";
            customError.innerHTML = "Post successfully deleted!"
            setTimeout(() => {
                customError.style.display = "none";
            }, 2000);
        })
        .catch(function (error) {
            console.error("Error removing document: ", error);
        });
}

// Function to delete item from DOM...!
const deleteItemFromDOM = (targetId) => {
    let targetEl = document.getElementById(targetId);
    mainDiv.removeChild(targetEl);
}

/***** Delete Item Work Finished *****/

let addItemBtn = document.getElementById("add-item");
let editKey;

// Function to edit item...!
const editItem = (targetEditEl) => {
    editKey = targetEditEl.parentNode.id;
    latopName.value = targetEditEl.parentNode.childNodes[1].innerHTML;
    laptopModel.value = targetEditEl.parentNode.childNodes[2].innerHTML;
    laptopRAM.value = targetEditEl.parentNode.childNodes[3].innerHTML;
    laptopHDD.value = targetEditEl.parentNode.childNodes[4].innerHTML;
    laptopSSD.value = targetEditEl.parentNode.childNodes[5].innerHTML;
    laptopPrice.value = targetEditEl.parentNode.childNodes[6].innerHTML;
    laptopImage;
    latopName.focus();
    addItemBtn.innerHTML = "Update Item"
    addItemBtn.setAttribute("onclick", "updateItem()");
}

// Function to update item in firebase database...!
const updateItem = () => {
    let editImageTag = laptopImage;

    if (editImageTag.value !== "" &&
        latopName.value != 0 &&
        laptopModel.value != 0 &&
        laptopRAM.value != 0 &&
        laptopHDD.value != 0 &&
        laptopSSD.value != 0 &&
        laptopPrice.value != 0
    ) {
        // Saving Edit Image in Firebase Storage...!
        let editImageFile = editImageTag.files[0];
        // console.log(editImageFile.name);
        let editImageRef = storage.ref().child(`Laptop Images/ ${editImageFile.name}`);
        editImageRef.put(editImageFile)
            .then((snapshot) => {
                editImageRef.getDownloadURL().
                    then((editImageURL) => {
                        // console.log(`URL: ${editImageURL}`)'
                        // Saving edit data in database...!
                        database.collection("Posts")
                            .doc(editKey)
                            .update({
                                productName: latopName.value,
                                productModel: laptopModel.value,
                                productRAM: laptopRAM.value,
                                productHDD: laptopHDD.value,
                                productSSD: laptopSSD.value,
                                productPrice: laptopPrice.value,
                                saveLaptopImageURL: editImageURL
                            })
                            .then(function () {
                                // console.log("Document successfully updated!");
                                customError.style.display = "block";
                                customError.innerHTML = "Post successfully updated!";
                                setTimeout(() => {
                                    customError.style.display = "none";
                                }, 2000);
                                latopName.value = "";
                                laptopModel.value = "";
                                laptopRAM.value = "";
                                laptopHDD.value = "";
                                laptopSSD.value = "";
                                laptopPrice.value = "";
                                laptopImage.value = null;
                                latopName.focus();
                                addItemBtn.innerHTML = "Add Item";
                                addItemBtn.setAttribute("onclick", "addItem()");
                                editKey = undefined;
                            })
                            .catch(function (error) {
                                console.error("Error updating document: ", error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    else {
        // alert("You must fill all the fields!!!");
        customError.style.display = "block";
        customError.innerHTML = "You must fill all the fields!!!";
        setTimeout(() => {
            customError.style.display = "none";
        }, 2000);
        latopName.focus();
    }
}

// Function to update data in DOM...!
const updateDataInDOM = (getDataForUpdate) => {
    let updateDOM = document.getElementById(getDataForUpdate.id);
    updateDOM.childNodes[1].innerHTML = getDataForUpdate.data().productName;
    updateDOM.childNodes[2].innerHTML = getDataForUpdate.data().productModel;
    updateDOM.childNodes[3].innerHTML = getDataForUpdate.data().productRAM;
    updateDOM.childNodes[4].innerHTML = getDataForUpdate.data().productHDD;
    updateDOM.childNodes[5].innerHTML = getDataForUpdate.data().productSSD;
    updateDOM.childNodes[6].innerHTML = getDataForUpdate.data().productPrice;
    updateDOM.childNodes[7].childNodes[0].src = getDataForUpdate.data().saveLaptopImageURL
}

// Edit/Update Work Finished...!

// Function for Log Out User...!
const logOut = () => {
    // Detaching the real time listener...!
    unSubscribe();
    firebase.auth().signOut()
        .then(() => {
            alert("You have Logged Out Successfully!");
            localStorage.clear();
            window.location.href = "login.html";
            window.close();
        });
}

// All User Profile Work Completed Successfully...!