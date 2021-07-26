/*ON RECUPERE LE FICHIER DATA JSON*/
fetch("/data/FishEyeData.json")
  .then((response) => response.json())
  .then((json) => {
    const id = parseInt(window.location.search.slice(4));
    const photographer = json.photographers.find(
      (photographer) => photographer.id === id
    );
    //NAME
    const photographerName = document.getElementById("form-name");
    photographerName.innerHTML = photographer.name;
  })
  .catch((err) => {
    console.log(err);
  });

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelectorAll(".bground .close")[0];
const btnSubmit = document.querySelectorAll("#btn-submit");

//Form elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalBtnClose.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

document.forms["modalForm"].addEventListener("submit", handleForSubmit);

function handleForSubmit(ev) {
  ev.preventDefault();
  closeModal();
}
