/*const sortListElt = document.getElementById("sort-list");
const sortBtn = document.getElementById("sort-btn");
const sortOutside = document.getElementById("sort-outside");

const sort1 = document.getElementById("li-popularite");
const sort2 = document.getElementById("li-date");
const sort3 = document.getElementById("li-titre");

sortBtn.addEventListener("click", sortList);

function sortList() {
  sortListElt.style.display = "block";
  sortOutside.style.display = "block";
  sortListElt.addEventListener("keydown", keyboardSort);
  sortOutside.addEventListener("click", outSortList);
  sort1.focus();
}

function outSortList() {
  sortListElt.style.display = "none";
  sortOutside.style.display = "none";
  window.removeEventListener("keydown", keyboardSort);
}

function keyboardSort(evt) {
  const focusElt = document.activeElement;
  console.log(focusElt.innerText);
  console.log(sort1.innerText);
  //evt.preventDefault();
  switch (evt.code) {
    case "ArrowDown":
      if (focusElt === sort1) sort2.focus();
      if (focusElt === sort2) sort3.focus();
      if (focusElt === sort3) sort1.focus();
      break;
    case "ArrowUp":
      if (focusElt === sort1) sort3.focus();
      if (focusElt === sort2) sort1.focus();
      if (focusElt === sort3) sort2.focus();
      break;
    case "Escape":
      outSortList();
      break;
    case "Enter":
      sortMedia(focusElt.innerText);
      break;
    default:
      return;
  }
}*/
