function Api() {
    this.getLatLng = function(city) {
        if (city === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (city === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (city === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (city === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    }
}

function ApiProxy() {
    var api = new Api();
    var apiCache = {};

    return {
        getLatLng: function(city) {
            if (!apiCache[city]) {
                apiCache[city] = api.getLatLng(city);
            }
            log.add(city + ": " + apiCache[city]);
            return apiCache[city];
        },
        getCount: function() {
            var count = 0;
            for (var code in apiCache) { count++; }
            return count;
        }
    };
}

var log = (function() {
    var log = "";

    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

function run() {
    var api = new ApiProxy();

    api.getLatLng("Paris");
    api.getLatLng("London");
    api.getLatLng("London");
    api.getLatLng("London");
    api.getLatLng("London");
    api.getLatLng("Amsterdam");
    api.getLatLng("Amsterdam");
    api.getLatLng("Amsterdam");
    api.getLatLng("Amsterdam");
    api.getLatLng("London");
    api.getLatLng("London");

    log.add("\nCache size: " + api.getCount());
    log.show();
}

run();