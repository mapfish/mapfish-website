Ext.namespace("mymapfish");

mymapfish.API = OpenLayers.Class(MapFish.API, {

    getLayers: function() {
        return [
            new OpenLayers.Layer.OSM("OSM")
        ];
    },

    getMapOptions: function() {
        return {
            projection: new OpenLayers.Projection("EPSG:900913"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            units: "m",
            numZoomLevels: 18,
            maxResolution: 156543.0339,
            maxExtent: new OpenLayers.Bounds(-20037508, -20037508,
                    20037508, 20037508.34),
            allOverlays: false
        };
    }

});


