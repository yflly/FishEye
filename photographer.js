/*ON RECUPERE LE FICHIER DATA JSON*/
fetch("/data/FishEyeData.json")
  .then((response) => response.json())
  .then((json) => {
    const id = parseInt(window.location.search.slice(4));
    const photographer = json.photographers.find(
      (photographer) => photographer.id === id
    );

    //TITLE
    document.title = photographer.name + " - Photographer | FishEye";

    //NAME
    const photographerName = document.getElementById("name");
    photographerName.innerHTML = photographer.name;

    //LOCATION
    const photographerLocation = document.getElementById("location");
    photographerLocation.innerHTML =
      photographer.city + ", " + photographer.country;

    //TAGLINE
    const photographerTagline = document.getElementById("tagline");
    photographerTagline.innerHTML = photographer.tagline;

    // CREE ELEMENT li DE LA LISTE TAG
    const createTagList = (Ul, TagEl, hrefUrl) => {
      const tagsLi = document.createElement("li");
      tagsLi.className = "tag-btn";
      tagsLi.setAttribute("id", TagEl);
      const tagsA = document.createElement("a");
      tagsA.setAttribute("href", hrefUrl);
      tagsA.textContent = "#" + TagEl;

      tagsLi.appendChild(tagsA);
      Ul.appendChild(tagsLi);
    };

    // ON RECUPERE ID DU UL
    const photographerTags = document.getElementById("tags");

    // ON PARCOURS ET ON CREE LA LISTE DES TAGS
    photographer.tags.forEach((tag) =>
      createTagList(photographerTags, tag, "#")
    );

    //PHOTO
    const photographerSection = document.getElementById("photographer");
    const picture = document.createElement("img");
    picture.setAttribute(
      "src",
      "/Sample_Photos/Photographers ID Photos/" + photographer.portrait
    );
    picture.setAttribute("alt", "na");

    photographerSection.appendChild(picture);
  })
  .catch((err) => {
    console.log(err);
  });
