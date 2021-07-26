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
    /* let likes = 0;
    media.forEach((media) => (likes += media.likes)); */
    const likes = media.reduce((likes, media) => likes + media.likes, 0);
    const total = document.getElementById("totalLikes");
    total.innerHTML = likes;

    const price = document.getElementById("price");
    price.innerHTML = photographer.price + "€ / jour";
    //

    //VIDEOS ET PHOTOS
    const section = document.getElementById("photographerContent");

    function getSrc(photographer, fileName) {
      const splitPhotographerName = photographer.name.split(" ");
      splitPhotographerName.pop();
      return `../Sample_Photos/${splitPhotographerName.join(" ")}/${fileName}`;
    }

    function openLightbox(index) {
      const currentMedia = media[index];
      const contentContainer = document.getElementById("lightboxContent");
      //Image ou Video
      if (currentMedia.image) {
        const imgElement = document.createElement("img");
        imgElement.setAttribute(
          "src",
          getSrc(photographer, currentMedia.image)
        );
        contentContainer.appendChild(imgElement);
      } else if (currentMedia.video) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute(
          "src",
          getSrc(photographer, currentMedia.video)
        );
        contentContainer.appendChild(videoElement);
      }
      document.getElementById("lightbox").style.display = "block";
    }
    function closeLightbox() {
      document.getElementById("lightbox__close").style.display = "none";
    }

    function createMediaListItem(photographer, media, index) {
      const content = document.createElement("div");
      content.className = "contentPhotoVideo";
      const aContentLink = document.createElement("a");
      aContentLink.setAttribute("href", "#");
      aContentLink.setAttribute("title", media.title);
      aContentLink.addEventListener("click", () => openLightbox(index));

      //Image ou Video
      if (media.image) {
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", getSrc(photographer, media.image));
        aContentLink.appendChild(imgElement);
      } else if (media.video) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("src", getSrc(photographer, media.video));
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

      const titleLike = document.createElement("span");
      titleLike.classname = "titleLike";
      titleLike.innerHTML = media.likes;

      const titleHeart = document.createElement("span");
      titleHeart.className = "fas fa-heart";

      content.appendChild(titleContent);
      titleContent.appendChild(titlePhotoVideo);
      titleContent.appendChild(titlePrice);
      titleContent.appendChild(titleLike);
      titleLike.appendChild(titleHeart);
    }

    _medias.forEach((media, index) =>
      createMediaListItem(photographer, media, index)
    );
  })
  .catch((err) => {
    console.log(err);
  });
