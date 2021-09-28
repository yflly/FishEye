/*ON RECUPERE LE FICHIER DATA JSON*/
fetch("./data/FishEyeData.json")
  .then((response) => response.json())
  .then((json) => {
    const id = parseInt(window.location.search.slice(4));
    const photographer = json.photographers.find(
      (photographer) => photographer.id === id
    );
    //NAME
    const photographerName = document.getElementById("form-name");
    photographerName.innerHTML = photographer.name;

    // DOM Elements
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    //const formData = document.querySelectorAll(".formData");
    const modalBtnClose = document.querySelectorAll(".bground .close")[0];
    //const btnSubmit = document.querySelectorAll("#btn-submit");
    let modalK;

    //Form elements
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    // launch modal event
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

    // launch modal form
    function launchModal() {
      modalbg.style.display = "block";
      document.getElementById("modal-btn").style.display = "none";
      modalK = 1;
      firstName.focus();
      modalKeyboard();

      firstName.value = "";
      lastName.value = "";
      email.value = "";
      message.value = "";
    }

    // close modal event
    modalBtnClose.addEventListener("click", closeModal);

    // close modal form
    function closeModal() {
      modalbg.style.display = "none";
      document.getElementById("modal-btn").style.display = "block";
      modalK = 0;
      window.removeEventListener("keydown", keyboardModal);
    }

    document.forms["modalForm"].addEventListener("submit", handleForSubmit);
    function handleForSubmit(ev) {
      ev.preventDefault();
      console.log(firstName.value + " " + lastName.value + " " + email.value);
      closeModal();
    }

    //Si modal ouverte keydown ok
    function modalKeyboard() {
      if (modalK == 0) {
        //console.log(modalK);
      } else {
        window.addEventListener("keydown", keyboardModal);
      }
    }

    function keyboardModal(evt) {
      //evt.preventDefault();
      switch (evt.code) {
        case "Enter":
          handleForSubmit();
          break;
        case "Escape":
          closeModal();
          break;
        default:
          return;
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
