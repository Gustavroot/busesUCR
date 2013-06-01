/*
 * File: app/view/Mapa.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.Mapa', {
    extend: 'Ext.Map',
    alias: 'widget.mymap',

    config: {
    },

    initialize: function() {
        var gMap = this.getMap();

        var marker = new google.maps.Marker({
            map: gMap,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng (9.941530,-84.046738),
            icon: 'resources/images/icon.png'
        });
    }

});