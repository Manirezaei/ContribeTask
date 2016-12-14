(function (document, window) {
    var dsPhotos = [];

    function openGallery() {
        var galleryElement = document.getElementsByClassName("jap-gallery")[0];
        galleryElement.style.display = "block";
        var searchElement = document.getElementsByClassName("search-result-container")[0];
        searchElement.style.display = "none";
        loadGallery();
    }

    function closeGallery() {
        var galleryElement = document.getElementsByClassName("jap-gallery")[0];
        galleryElement.style.display = "none";
        var searchElement = document.getElementsByClassName("search-result-container")[0];
        searchElement.style.display = "block";
    }

    function loadGallery() {
        var galleryContainer = document.getElementsByClassName("gallery-item-container")[0];

        galleryContainer.innerHTML = "";

        for (var i = 0 ; i < dsPhotos.length; i++) {
            var galleryPhoto = Photos.getPhotoElement(dsPhotos[i])
            galleryPhoto.addEventListener("click", showPhoto);
            galleryContainer.appendChild(galleryPhoto);
        }
    }

    function showPhoto(event) {
        var photoSlideShowElement = document.getElementsByClassName("photo-show-container")[0];
        photoSlideShowElement.style.display = "block";

        var selectedElement = event.currentTarget;
        var selectedID = selectedElement.getAttribute("data-photo-id");
        var photoItem = dsPhotos.filter(function (photo) { return photo.id == selectedID })[0];
        var photoShowElement = document.getElementsByClassName("photo-show-item")[0];
        photoShowElement.src = Services.getPhotoAddress(photoItem);
    }

    function closePhoto() {
        var photoSlideShowElement = document.getElementsByClassName("photo-show-container")[0];
        photoSlideShowElement.style.display = "none";
    }

    function getDataSource() {
        return dsPhotos;
    }

    function setDataSource(data) {
        dsPhotos = data;
    }

    window.JAPGallery = Utility.extend(window.JAPGallery || {}, {
        openGallery: openGallery
        , closeGallery: closeGallery
        , closePhoto: closePhoto
        , getDataSource: getDataSource
        , setDataSource: setDataSource
    });
})(document, window);
