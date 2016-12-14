(function (document, window) {
    var apiKey = '9c05546b384fb807d974eac4eeeb02f5';
    var apiURL = 'https://api.flickr.com/services/rest/';

    function getPhotos(searchQuery, pageSize, pageIndex, resultCallback, callbackErrorFunction) {
        try
        {
            var xhttp = new XMLHttpRequest();
            var parameters = {
                method: "flickr.photos.search"
                , api_key: apiKey
                , per_page: pageSize
                , format: "json"
                , nojsoncallback: 1
                , text: searchQuery
                , page: pageIndex
            };
            xhttp.open("GET", Utility.buildUrl(apiURL, parameters), true);
            xhttp.send(null);
            xhttp.onreadystatechange = function (arg) {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        var photos = JSON.parse(this.response).photos;
                        resultCallback(photos);
                    } else {
                        console.log("Error on connecting to Flickr API.", this.statusText);
                        window.alert("Error on connecting to Flickr API.\n" + this.statusText);
                        callbackErrorFunction();
                    }
                }
            };
        }
        catch (ex) {
            console.log("Error on connecting to Flickr API.", ex);
            window.alert("Error on connecting to Flickr API.\n" + ex.message);
            callbackErrorFunction();
        }
    };

    function getPhotoThumpnail(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '_q.jpg';
    }

    function getPhotoAddress(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '.jpg';
    }

    window.Services = Utility.extend(window.Services || {}, {
        getPhotos: getPhotos
        , getPhotoAddress: getPhotoAddress
        , getPhotoThumpnail: getPhotoThumpnail
    });
})(document, window);
