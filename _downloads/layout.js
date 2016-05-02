Ext.namespace("mymapfish");

mymapfish.layout = (function() {
    /*
     * Private
     */
    var getMapPanel = function() {
        return Ext.apply(api.createMapPanel(), {
            margins: '0 0 0 0',
            id: 'mappanel'
        });
    };

    /*
     * Public
     */
    return {
        /**
         * APIMethod: init
         * Initialize the page layout.
         */
        init: function() {
            api = new mymapfish.API({isMainApp: true});
            new Ext.Viewport({
                layout: "border",
                id: 'mainpanel',
                items: [
                    Ext.apply(getMapPanel(), {region: 'center'})
                ]
            });
            api.map.zoomToMaxExtent();
        }
    };

})();