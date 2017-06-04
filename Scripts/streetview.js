(function (global, $, undefined) {

    var google = global.google;

    // #region Helper

    var isUndefinedOrNull = function (val) {
        return (val === undefined || val === null);
    }

    var isUndefinedNullEmpty = function (val) {
        return (isUndefinedOrNull(val) || val == '');
    }

    var addEventToElement = function (elementId, event, action) {
        $(elementId).off(event);
        $(elementId).on(event, action);
    }

    // #endregion

    var options = {
        splitter: {
            hor: '#horizontal',
            ver: '#vertical'
        },
        google: {
            map: 'map-container',
            street: 'street-container'
        }
    }

    var map,
        panorama,
        center = { lat: 42.345573, lng: -71.098326 };

    var createPanorama = function () {
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById(options.google.street), {
                position: center,
                pov: {
                    heading: 34,
                    pitch: 10
                }
            });

        panorama.addListener('position_changed', function () {
            console.log(panorama.getPosition().lat() + " " + panorama.getPosition().lng());
        });
           
    }

    var createMap = function () {
        map = new google.maps.Map(document.getElementById(options.google.map), {
            center: center,
            zoom: 14
        });

        map.setStreetView(panorama);
    }

    var InitSplitter = function () {
        $(options.splitter.hor).kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: true, size: "33%" },
                { collapsible: true }
            ],
            resize: function (e) {
                google.maps.event.trigger(map, 'resize');
                google.maps.event.trigger(panorama, 'resize');
            }
        });

        $(options.splitter.ver).kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: true, size: "50%" },
                { collapsible: true, size: "50%" }
            ],
            resize: function (e) {
                google.maps.event.trigger(map, 'resize');
                google.maps.event.trigger(panorama, 'resize');
            }
        });
    }

    var initMap = function () {
        createPanorama();
        createMap();
        InitSplitter();
    }

    $(function () {
        initMap();
    });

})(window, jQuery);