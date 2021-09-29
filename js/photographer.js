/*ON RECUPERE LE FICHIER DATA JSON*/

fetch("./data/FishEyeData.json")
  .then((response) => response.json())
  .then((json) => {
    const id = parseInt(window.location.search.slice(4));
    const photographer = json.photographers.find(
      (photographer) => photographer.id === id
    );
    const media = json.media.filter((media) => media.photographerId === id);
    let _medias;
    let index;
    let data;
    let TagEl;
    let light;

    const photographerPhVid = document.getElementById("photographerPhVid");

    const sortListElt = document.getElementById("sort-list");
    const sortBtn = document.getElementById("sort-btn");
    const sortOutside = document.getElementById("sort-outside");

    const sort1 = document.getElementById("li-popularite");
    const sort2 = document.getElementById("li-date");
    const sort3 = document.getElementById("li-titre");

    sortMedia("Popularité");

    //INFORMATION PHOTOGRAPHE
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
    const createTagList = (Ul, TagEl) => {
      const tagsLi = document.createElement("li");
      tagsLi.className = "tag-btn";
      tagsLi.setAttribute("id", TagEl);

      const tagsA = document.createElement("a");
      tagsA.setAttribute("href", "index.html?tag=" + TagEl);
      tagsA.textContent = "#" + TagEl;
      tagsA.setAttribute("tabindex", "0");

      tagsLi.appendChild(tagsA);
      Ul.appendChild(tagsLi);
    };

    //On applique les filtres
    function applyFilter(tag = false) {
      data.photographers.forEach((photographer) => {
        document.getElementById(
          "photographer-" + photographer.id
        ).style.display = photographer.tags.includes(tag) ? "block" : "none";
      });
      // Gérer l'affichage conditionnel du background des boutons
      [...document.getElementsByClassName("tag_active")].forEach((btn) => {
        btn.classList.remove("tag_active");
      });
      [...document.getElementsByClassName("filter_" + tag)].forEach((btn) => {
        btn.classList.add("tag_active");
      });
    }

    // LISTENER SUR LES TAGS
    [...document.getElementsByClassName("tag-btn")].forEach((btn) => {
      btn.addEventListener("click", () => {
        //const tag = 'fashion' // changer le tag en fonction du bouton
        const tag = TagEl;
        applyFilter(tag);
      });
    });

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
      "./Sample_Photos/Photographers ID Photos/" + photographer.portrait
    );
    picture.setAttribute("alt", photographer.name);

    photographerSection.appendChild(picture);
    //

    //MEDIA SORT
    function sortMedia(value) {
      switch (value) {
        case "Popularité":
          _medias = media.sort((a, b) => b.likes - a.likes);
          break;
        case "Date":
          _medias = media.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "Titre":
          _medias = media.sort((a, b) => b.title < a.title);
          break;
      }

      //supprimer la liste des medias avant de créer une nouvelle liste de médias trier
      photographerPhVid.innerHTML = "";

      _medias.forEach((media, _index) =>
        createMediaListItem(photographer, media, _index)
      );
      likeClick();
      sortBtn.innerHTML =
        value + `<span class="fas fa-chevron-down sort-arrow"></span>`;
    }

    document
      .getElementById("sort-list")
      .addEventListener("click", (ev) =>
        sortMedia(ev.originalTarget.innerText)
      );

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
      sortListElt.removeEventListener("keydown", keyboardSort);
      sortOutside.removeEventListener("click", outSortList);
      sortBtn.focus();
    }

    function keyboardSort(evt) {
      const focusElt = document.activeElement;
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
    }

    //INCREMENTES LES LIKES

    function likeClick() {
      const clickHeart = [...document.getElementsByClassName("heart")];
      const numbersLike = [...document.getElementsByClassName("titleLike")];
      clickHeart.forEach((heart, index) => {
        heart.addEventListener("click", function () {
          const numberLike = numbersLike[index];
          let counter = parseInt(numberLike.textContent);
          counter++;
          numberLike.innerText = counter;
          likes++;
          total.innerHTML = likes;
          //return counter;
        });
        heart.addEventListener("keydown", function (evt) {
          if (evt.code == "Enter") {
            const numberLike = numbersLike[index];
            let counter = parseInt(numberLike.textContent);
            counter++;
            numberLike.innerText = counter;
            likes++;
            total.innerHTML = likes;
          }
        });
      });
    }

    //RECTANGLE LIKE & PRICE
    let likes = media.reduce((likes, media) => likes + media.likes, 0);
    const total = document.getElementById("totalLikes");
    total.innerHTML = likes;

    const price = document.getElementById("price");
    price.innerHTML = photographer.price + "€ / jour";
    //

    //VIDEOS ET PHOTOS

    function getSrc(photographer, fileName) {
      const splitPhotographerName = photographer.name.split(" ");
      splitPhotographerName.pop();
      return `./Sample_Photos/${splitPhotographerName.join(" ")}/${fileName}`;
    }

    //OPEN LIGHTBOX
    function openLightbox() {
      const currentMedia = media[index];
      const contentContainer = document.getElementById("lightboxContent");
      contentContainer.innerHTML = "";

      //Image ou Video
      if (currentMedia.image) {
        const imgElement = document.createElement("img");
        imgElement.className = "lightboxImg";
        imgElement.setAttribute("id", "lightboxImg");
        imgElement.setAttribute(
          "src",
          getSrc(photographer, currentMedia.image)
        );
        imgElement.setAttribute("alt", currentMedia.alt);
        contentContainer.appendChild(imgElement);
      } else if (currentMedia.video) {
        const videoElement = document.createElement("video");
        videoElement.className = "lightboxVideo";
        videoElement.setAttribute("controls", "true");
        const videoSource = document.createElement("source");
        videoSource.setAttribute(
          "src",
          getSrc(photographer, currentMedia.video)
        );
        videoSource.setAttribute("alt", currentMedia.alt);
        contentContainer.appendChild(videoElement);
        videoElement.appendChild(videoSource);
      }

      const contentTitle = document.createElement("h3");
      contentTitle.className = "LightboxContentTitle";
      contentTitle.innerHTML = currentMedia.title;
      contentContainer.appendChild(contentTitle);

      document.getElementById("cover").style.display = "block";
      document.getElementById("lightbox").style.display = "block";
      //document.getElementById("rectangleLikePrice").style.display = "none";
      document.getElementById("modal-btn").style.display = "none";
    }

    // // ARROW NEXT PREV
    const lightboxBtnPrevious = document.querySelector(".fa-chevron-left");
    const lightboxBtnNext = document.querySelector(".fa-chevron-right");
    lightboxBtnPrevious.addEventListener("click", () => prevLightbox());

    function prevLightbox() {
      if (index > 0) index--;
      else index = media.length - 1;
      openLightbox();
    }

    lightboxBtnNext.addEventListener("click", () => nextLightbox());

    function nextLightbox() {
      if (index < media.length - 1) index++;
      else index = 0;
      openLightbox();
    }

    //Si lightbox ouverte keydown ok
    function lightboxKeyboard() {
      if (light == 0) {
        console.log(light);
      } else {
        window.addEventListener("keydown", keyboardLightbox);
      }
    }

    function keyboardLightbox(evt) {
      evt.preventDefault();
      switch (evt.code) {
        case "ArrowLeft":
          prevLightbox();
          break;
        case "ArrowRight":
          nextLightbox();
          break;
        case "Escape":
          closeLightbox();
          break;
        default:
          return;
      }
    }

    // CLOSE LIGHTBOX
    const lightboxBtnClose = document.querySelector(".fa-times");

    lightboxBtnClose.addEventListener("click", closeLightbox);

    function closeLightbox() {
      document.getElementById("cover").style.display = "none";
      document.getElementById("lightbox").style.display = "none";
      //document.getElementById("rectangleLikePrice").style.display = "flex";
      document.getElementById("modal-btn").style.display = "block";
      light = 0;
      window.removeEventListener("keydown", keyboardLightbox);
    }

    // CREATE MEDIA LIST ITEM
    light = 0; // variable pour detecter si la lightbox est ouverte ou fermer
    function createMediaListItem(photographer, media, _index) {
      outSortList();

      const content = document.createElement("div");
      content.className = "contentPhotoVideo";
      const aContentLink = document.createElement("a");
      aContentLink.setAttribute("href", "#");
      aContentLink.setAttribute("title", media.title);
      aContentLink.addEventListener("click", () => {
        index = _index;
        openLightbox();
        light = 1;
        lightboxKeyboard();
      });

      //Image ou Video
      if (media.image) {
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", getSrc(photographer, media.image));
        imgElement.className = "imgVidList";
        imgElement.setAttribute("alt", media.title + ", closeup view");
        imgElement.setAttribute("role", "button");

        aContentLink.appendChild(imgElement);
      } else if (media.video) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("src", getSrc(photographer, media.video));
        videoElement.className = "imgVidList";
        videoElement.setAttribute("alt", media.title + ", closeup view");
        aContentLink.appendChild(videoElement);
      }

      photographerPhVid.appendChild(content);
      content.appendChild(aContentLink);

      //Titre et like photo video
      const titleContent = document.createElement("div");
      titleContent.className = "titleContent";
      const titlePhotoVideo = document.createElement("h2");
      titlePhotoVideo.className = "titlePhotoVideo";
      titlePhotoVideo.innerHTML = media.title;

      const titlePrice = document.createElement("span");
      titlePrice.className = "titlePrice";
      titlePrice.innerHTML = media.price + " €";

      const likeContainer = document.createElement("span");
      const titleLike = document.createElement("span");
      titleLike.className = "titleLike";
      titleLike.setAttribute("aria-label", "likes");
      titleLike.innerHTML = media.likes;
      const titleHeart = document.createElement("span");
      titleHeart.className = "heart fas fa-heart";
      titleHeart.setAttribute("tabindex", "0");
      titleHeart.setAttribute("role", "button");

      content.appendChild(titleContent);
      titleContent.appendChild(titlePhotoVideo);
      titleContent.appendChild(titlePrice);
      titleContent.appendChild(likeContainer);
      likeContainer.appendChild(titleLike);
      likeContainer.appendChild(titleHeart);
    }
  })
  .catch((err) => {
    console.log(err);
  });
