/*ON RECUPERE LE FICHIER DATA JSON*/
fetch("/data/FishEyeData.json")
  .then((response) => response.json())
  .then((json) => {
    const id = parseInt(window.location.search.slice(4));
    const photographer = json.photographers.find(
      (photographer) => photographer.id === id
    );
    const media = json.media.filter((media) => media.photographerId === id);
    let _medias;
    let index;
    sortMedia("popularite");

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
    const createTagList = (Ul, TagEl, hrefUrl) => {
      const tagsLi = document.createElement("li");
      tagsLi.className = "tag-btn";
      tagsLi.setAttribute("id", TagEl);

      const tagsA = document.createElement("span");
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
      "./Sample_Photos/Photographers ID Photos/" + photographer.portrait
    );
    picture.setAttribute("alt", photographer.name);

    photographerSection.appendChild(picture);
    //

    //MEDIA SORT
    function sortMedia(value) {
      switch (value) {
        case "popularite":
          _medias = media.sort((a, b) => b.likes - a.likes);
          break;
        case "date":
          _medias = media.sort((a, b) => b.date - a.date);
          break;
        case "titre":
          _medias = media.sort((a, b) => b.title - a.title);
          break;
      }
      //createMediaListItem();
    }
    document
      .getElementById("mediaSort")
      .addEventListener("change", (ev) => sortMedia(ev.target.value));

    //RECTANGLE LIKE & PRICE
    let likes = media.reduce((likes, media) => likes + media.likes, 0);
    const total = document.getElementById("totalLikes");
    total.innerHTML = likes;

    const price = document.getElementById("price");
    price.innerHTML = photographer.price + "€ / jour";
    //

    //VIDEOS ET PHOTOS
    const section = document.getElementById("photographerPhVid");

    function getSrc(photographer, fileName) {
      const splitPhotographerName = photographer.name.split(" ");
      splitPhotographerName.pop();
      return `./Sample_Photos/${splitPhotographerName.join(" ")}/${fileName}`;
    }

    //OPEN LIGHTBOX
    function openLightbox() {
      const currentMedia = media[index];
      console.log(index);
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
        contentContainer.appendChild(imgElement);
      } else if (currentMedia.video) {
        const videoElement = document.createElement("video");
        videoElement.className = "lightboxVideo";
        videoElement.setAttribute(
          "src",
          getSrc(photographer, currentMedia.video)
        );
        contentContainer.appendChild(videoElement);
      }

      const contentTitle = document.createElement("h3");
      contentTitle.className = "LightboxContentTitle";
      contentTitle.innerHTML = currentMedia.title;
      contentContainer.appendChild(contentTitle);

      document.getElementById("cover").style.display = "block";
      document.getElementById("lightbox").style.display = "block";
      document.getElementById("rectangleLikePrice").style.display = "none";
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

    // CREATE MEDIA LIST ITEM
    function createMediaListItem(photographer, media, _index) {
      const content = document.createElement("div");
      content.className = "contentPhotoVideo";
      const aContentLink = document.createElement("a");
      aContentLink.setAttribute("href", "#");
      aContentLink.setAttribute("title", media.title);
      aContentLink.addEventListener("click", () => {
        index = _index;
        openLightbox();
      });

      //Image ou Video
      if (media.image) {
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", getSrc(photographer, media.image));
        imgElement.className = "imgVidList";
        imgElement.setAttribute("alt", media.title);
        aContentLink.appendChild(imgElement);
      } else if (media.video) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("src", getSrc(photographer, media.video));
        videoElement.className = "imgVidList";
        videoElement.setAttribute("alt", media.title);
        aContentLink.appendChild(videoElement);
      }

      section.appendChild(content);
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

      content.appendChild(titleContent);
      titleContent.appendChild(titlePhotoVideo);
      titleContent.appendChild(titlePrice);
      titleContent.appendChild(likeContainer);
      likeContainer.appendChild(titleLike);
      likeContainer.appendChild(titleHeart);
    }

    _medias.forEach((media, index) =>
      createMediaListItem(photographer, media, index)
    );

    //INCREMENTES LES LIKES
    const clickHeart = [...document.getElementsByClassName("heart")];
    const numbersLike = [...document.getElementsByClassName("titleLike")];
    clickHeart.forEach((heart, index) =>
      heart.addEventListener("click", function () {
        const numberLike = numbersLike[index];
        let counter = parseInt(numberLike.textContent);
        counter++;
        numberLike.innerText = counter;
        likes++;
        total.innerHTML = likes;
      })
    );
  })
  .catch((err) => {
    console.log(err);
  });
