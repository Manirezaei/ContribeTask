(function (document, window) {
    var pageIndex = 1
       , pageSize = 0;

    var dsPhotos = [];

    function getPhotoElement(photo) {
        var photoNode = document.createElement("div");
        photoNode.classList.add("photo-item");
        photoNode.classList.add("card-item");
        photoNode.setAttribute("data-photo-id", photo.id);
        var photoImage = document.createElement("img");
        photoImage.src = Services.getPhotoThumpnail(photo);
        photoImage.alt = photo.title;
        photoImage.classList.add("photo-image");
        photoNode.appendChild(photoImage);
        var photoTitle = document.createElement("p");
        photoTitle.classList.add("photo-title");
        photoTitle.innerHTML = photo.title;
        photoNode.appendChild(photoTitle);

        return photoNode;
    }

    function addPhotos(photos) {
        var searchResult = document.getElementsByClassName("search-result")[0];

        document.getElementsByClassName("search-loading")[0].style.display = "none";
        if (photos.total == 0) {
            dsPhotos = [];
            document.getElementsByClassName("empty-result-message")[0].style.display = "block";
            document.getElementById("loadMorePhotos").style.display = "none";
        }
        else {
            document.getElementsByClassName("empty-result-message")[0].style.display = "none";
            for (var i = 0 ; i < photos.photo.length; i++) {
                dsPhotos.push(photos.photo[i]);
                var newPhoto = getPhotoElement(photos.photo[i])
                newPhoto.addEventListener("click", selectPhoto);
                searchResult.appendChild(newPhoto);
            }
            if ((pageIndex) * pageSize < photos.total)
                document.getElementById("loadMorePhotos").style.display = "block";
            else
                document.getElementById("loadMorePhotos").style.display = "none";
        }
    }

    function getPhotos(searchQuery, callbackFunction) {
        document.getElementsByClassName("search-loading")[0].style.display = "block";
        Services.getPhotos(searchQuery, pageSize, pageIndex, callbackFunction
            , function () {
            document.getElementsByClassName("search-loading")[0].style.display = "none";
        });
    }

    function loadPhotos(searchQuery) {
        pageIndex = 1;
        pageSize = parseInt(document.getElementsByClassName("search-result")[0].offsetWidth / 250) * 2;
        var searchResult = document.getElementsByClassName("search-result")[0];

        getPhotos(searchQuery, function (photos) {
            searchResult.innerHTML = "";
            dsPhotos = [];
            addPhotos(photos);
        });
    }

    function loadMorePhotos(searchQuery) {
        pageIndex++;
        getPhotos(searchQuery, addPhotos);
    }

    function selectPhoto(event) {
        var selectedElement = event.currentTarget;
        var selectedID = selectedElement.getAttribute("data-photo-id");
        var selectedPhoto = dsPhotos.filter(function (photo) { return photo.id == selectedID })[0];
        if (selectedPhoto.selected) {
            selectedPhoto.selected = false;
            selectedElement.classList.remove("selected-item")
        }
        else {
            selectedElement.classList.add("selected-item")
            selectedPhoto.selected = true;
        }

        var selectedLength = dsPhotos.filter(function (photo) { return photo.selected == true }).length;

        var viewGalleryElement = document.getElementsByClassName("show-gallery")[0];
        if (selectedLength > 0)
            viewGalleryElement.removeAttribute("disabled");
        else
            viewGalleryElement.setAttribute("disabled", "");
    }

    function showGallery() {
        JAPGallery.setDataSource(dsPhotos.filter(function (photo) { return photo.selected == true }));
        JAPGallery.openGallery();
    }

    function getDataSource() {
        return dsPhotos;
    }

    function newSearch() {
        dsPhotos = [];
        pageIndex = 1;
        var searchResult = document.getElementsByClassName("search-result")[0];
        searchResult.innerHTML = "";
        document.getElementsByClassName("search-loading")[0].style.display = "none";
        document.getElementsByClassName("empty-result-message")[0].style.display = "none";
        document.getElementById("loadMorePhotos").style.display = "none";
    }

    window.Photos = Utility.extend(window.Photos || {}, {
        getPhotoElement: getPhotoElement
        , loadPhotos: loadPhotos
        , loadMorePhotos: loadMorePhotos
        , showGallery: showGallery
        , newSearch: newSearch
        , getDataSource: getDataSource
    });
})(document, window);
