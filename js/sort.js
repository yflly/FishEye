const sortListElt = document.getElementById("sort-list");
const sortBtn = document.getElementById("sort-btn");
const sortOutside = document.getElementById("sort-outside");
sortKeyboard = 0; //pour detecter si la listbox est ouverte 0=fermer 1=ouverte

sortBtn.addEventListener("click", sortList);
sortBtn.addEventListener("keydown", sortList);

function sortList() {
  sortListElt.style.display = "block";
  sortOutside.style.display = "block";
  sortOutside.addEventListener("click", keyboardSort);
  sortKeyboard = 1;
  sortKey();
}

function outSortList() {
  sortListElt.style.display = "none";
  sortOutside.style.display = "none";
  sortKeyboard = 0;
  window.removeEventListener("keydown", keyboardSort);
}

//Si SortKeyboard ouverte keydown ok

function sortKey() {
  if (sortKeyboard == 0) {
    console.log("sortkeyboard");
  } else {
    window.addEventListener("keydown", keyboardSort);
  }
}

function keyboardSort(evt) {
  evt.preventDefault();
  switch (evt.code) {
    case "ArrowDown":
      console.log("down");
      break;
    case "ArrowUp":
      console.log("up");
      break;
    case "Enter":
      console.log("enter");
      //sortMedia(ev.originalTarget.innerText);
      break;
    default:
      return;
  }
}
