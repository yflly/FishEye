const sortListElt = document.getElementById("sort-list");
const sortBtn = document.getElementById("sort-btn");
const sortOutside = document.getElementById("sort-outside");

sortBtn.addEventListener("click", sortList);

function sortList() {
  sortListElt.style.display = "block";
  sortOutside.style.display = "block";
  sortOutside.addEventListener("click", outSortList);
}

function outSortList() {
  sortListElt.style.display = "none";
  sortOutside.style.display = "none";
}
