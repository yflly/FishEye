/*ON RECUPERE LE FICHIER DATA JSON*/
let data;
fetch("./data/FishEyeData.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tag = urlParams.get("tag");

    renderCards();

    if (tag) {
      applyFilter(tag);
    }

    [...document.getElementsByClassName("tag-btn")].forEach((btn) => {
      btn.addEventListener("click", (event) => {
        //const tag = 'fashion' // changer le tag en fonction du bouton
        const tag = event.currentTarget.id;
        applyFilter(tag);
      });
      btn.addEventListener("keydown", keyboardEnterTag);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function keyboardEnterTag(evt) {
  switch (evt.code) {
    case "Enter":
      const tag = evt.currentTarget.id;
      applyFilter(tag);
      break;
    default:
      return;
  }
}

// ON AJOUTE LES DONNEES PHOTOGRAPHES AU HTML
function photographerNodeFactory(photographer) {
  const element = document.createElement("div");
  element.className = "photographer-elt";
  element.id = "photographer-" + photographer.id;

  // CREE UN LIEN HREF AVEC ID POUR ACCEDER A LA PAGE DU PHOTOGRAPHE
  const link = document.createElement("a");
  link.setAttribute("href", "photographer.html?id=" + photographer.id);
  link.setAttribute("title", photographer.name);

  // CREE AFFICHAGE DE L IMAGE
  const picture = document.createElement("img");
  picture.setAttribute(
    "src",
    "./Sample_Photos/Photographers ID Photos/" + photographer.portrait
  );
  picture.setAttribute("alt", "na");

  // CREE NAME
  const name = document.createElement("h2");

  // CREE CITY
  const city = document.createElement("div");
  city.className = "infoCity";

  //CREE TAGLINE
  const tagline = document.createElement("div");
  tagline.className = "infoTagline";

  // CREE INFO PRICE
  const price = document.createElement("div");
  price.className = "infoPrice";

  // CREE LISTE TAG
  // CREE ELEMENT li DE LA LISTE TAG
  function createTagList(Ul, tag, hrefUrl) {
    const tagsLi = document.createElement("li");
    tagsLi.className = `tag-btn filter_${tag}`;
    tagsLi.setAttribute("id", tag);
    const tagsA = document.createElement("span");
    tagsA.setAttribute("href", hrefUrl);
    tagsA.textContent = "#" + tag;
    tagsA.setAttribute("tabindex", "0");

    tagsLi.appendChild(tagsA);
    Ul.appendChild(tagsLi);
  }

  // CREE ELEMENT ul DE LA LISTE TAG
  const tagsUl = document.createElement("ul");
  tagsUl.className = "filter";

  // ON PARCOURS ET ON CREE LA LISTE DES TAGS
  photographer.tags.forEach((tag) => createTagList(tagsUl, tag, "#"));

  name.innerHTML = photographer.name;
  city.innerHTML = photographer.city + ", " + photographer.country;
  tagline.innerHTML = photographer.tagline;
  price.innerHTML = photographer.price + "€/jour";

  element.appendChild(link);
  link.appendChild(picture);
  link.appendChild(name);
  element.appendChild(city);
  element.appendChild(tagline);
  element.appendChild(price);
  element.appendChild(tagsUl);

  return element;
}
/* const temp2 = condition ? true : false;
let temp;
if (condition) {
  temp = true;
} else {
  temp = false;
} */

//On affiche tous les photographes au chargement de la page
function renderCards() {
  data.photographers.forEach((photographer) =>
    document
      .getElementById("content")
      .appendChild(photographerNodeFactory(photographer))
  );
}

//On applique les filtres
function applyFilter(tag = false) {
  data.photographers.forEach((photographer) => {
    document.getElementById("photographer-" + photographer.id).style.display =
      photographer.tags.includes(tag) ? "block" : "none";
  });
  // Gérer l'affichage conditionnel du background des boutons
  [...document.getElementsByClassName("tag_active")].forEach((btn) => {
    btn.classList.remove("tag_active");
  });
  [...document.getElementsByClassName("filter_" + tag)].forEach((btn) => {
    btn.classList.add("tag_active");
  });
}

//FAIRE APPARAITRE ELEMENT "PASSER AU CONTENU"
window.addEventListener("scroll", () => {
  const returnTopElement = document.getElementById("return-top");
  if (window.scrollY > 485) {
    returnTopElement.style.display = "block";
  } else {
    returnTopElement.style.display = "none";
  }
});
