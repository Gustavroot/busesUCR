/*
 * File: app.js
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

//@require @packageOverrides
Ext.Loader.setConfig({

});

Ext.application({
    models: [
        'modelBusesUCR',
        'modelPinesParadas',
        'modelDespliegueInfo',
        'modelDespliegueInfoBuses'
    ],
    stores: [
        'storeBusesUCR',
        'storePinesParadas',
        'storeDespliegueInfo',
        'storeDespliegueInfoBuses'
    ],
    views: [
        'tabPanelPrincipal',
        'containerInfo',
        'containerDescripProyecto',
        'containerMapaPrinc',
        'mapaDesplieguePines',
        'containerEleccionPines',
        'mapaEleccionPines'
    ],
    name: 'MyApp',

    insertarPinEnMapa: function(lat, lng, idMap, stringInfoWindow, boundsObject, iconURL) {
        var point = new google.maps.LatLng(lat,lng);

        if(iconURL!==undefined){
            var iconoPinParada=new google.maps.MarkerImage(iconURL,null,null,null,new google.maps.Size(35,35));
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point,
                icon: iconoPinParada
            });
        }
        else{
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point
            });
        }


        //Ext.getCmp(idMap).setMapCenter(point);

        //markersPinesParadas.push(marker);
        try{
            if(boundsObject==limitesPinesParadas){
                boundsObject.extend(point);
                Ext.getCmp(idMap).getMap().fitBounds(boundsObject);
            }
        }
        catch(e){}
        if(boundsObject==markersPinesBuses){
            markersPinesBuses.push(marker);
        }

        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, "click", function() {
            infoWindow.setContent(stringInfoWindow);
            infoWindow.open(Ext.getCmp(idMap).getMap(), marker);
        });
        try{
            if(boundsObject==limitesPinesParadas){
                variableGlobalZoomPinesParadas=Ext.getCmp(idMap).getMap().getZoom();
                //alert(Ext.getCmp(idMap).getMap().getZoom());
            }
        }
        catch(e){}
    },

    launch: function() {
        //Array de pines
        markersPinesBuses=[];
        arrayMarkersDiplayInfo1=[];
        arrayMarkersDiplayInfo2=[];
        limitesPinesEleccion = new google.maps.LatLngBounds();
        limitesPinesBuses = new google.maps.LatLngBounds();
        Ext.create('MyApp.view.tabPanelPrincipal', {fullscreen: true});
    },

    funcionEjecRefreshBg: function() {
        varTimeoutEjecRefreshBg=setTimeout(function(){
            Ext.getStore('storeBusesUCR').load(function(store,records){
                MyApp.app.loadDelStoreBusesUCR(records);
            });
            MyApp.app.funcionEjecRefreshBg();
        },2500);
    },

    refrescadoPosMarkers: function(arrayMarkers, recordsStore) {
        for(var i=0; i<arrayMarkers.length; i++){
            var point = new google.maps.LatLng(recordsStore[i].get('Latitude'),recordsStore[i].get('Longitude'));
            arrayMarkers[i].setPosition(point);
        }
    },

    refrescadoPinesParadas: function() {
        setTimeout(function(){
            Ext.getStore('storePinesParadas').load(function(records){
                MyApp.app.loadStorePinesParadas(records);
            });
            MyApp.app.refrescadoPinesParadas();
        },300000);
    },

    loadDelStoreBusesUCR: function(records) {
        if(markersPinesBuses.length===0){
            for(var i=0; i<records.length; i++){
                var j=i+1;
                MyApp.app.insertarPinEnMapa(records[i].get('Latitude'),records[i].get('Longitude'),'mapaDesplieguePines',"Bus "+j,markersPinesBuses,'bus.png');
            }
        }
        else{
            MyApp.app.refrescadoPosMarkers(markersPinesBuses,records);
        }
    },

    loadStorePinesParadas: function(records) {
        limitesPinesParadas = new google.maps.LatLngBounds();

        for(var i=0; i<records.length; i++){
            MyApp.app.insertarPinEnMapa(records[i].get('Latitude'),records[i].get('Longitude'),'mapaDesplieguePines',records[i].get('Name'),limitesPinesParadas,'busstop.png');
        }
    },

    load2StorePinesParadas: function(records, target) {
        limitesPinesEleccion = new google.maps.LatLngBounds();

        for(var i=0; i<records.length; i++){
            MyApp.app.insertarPinesEleccionDisplay(records[i].get('Latitude'),records[i].get('Longitude'),'mapaEleccionPines','busstop.png','parada',records[i].get('Name'),target);
        }
        //lat, lng, idMaps, iconURL, tipoPin
    },

    insertarPinesEleccionDisplay: function(lat, lng, idMap, iconURL, tipoPin, identificador, target) {
        var point = new google.maps.LatLng(lat,lng);

        if(iconURL!==undefined){
            var iconoPinParada=new google.maps.MarkerImage(iconURL,null,null,null,new google.maps.Size(35,35));
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point,
                icon: iconoPinParada
            });
        }
        else{
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point
            });
        }

        limitesPinesEleccion.extend(point);
        if(tipoPin=='parada'){
            Ext.getCmp(idMap).getMap().fitBounds(limitesPinesEleccion);
        }

        //AQUI SE LE APLICA LA PRIORIDAD A LOS PINES EN EL MAPA

        if(tipoPin=='parada'){
            arrayMarkersDiplayInfo1.push(marker);
        }
        else{
            arrayMarkersDiplayInfo2.push(marker);
        }

        google.maps.event.addListener(marker, "click", function() {
            if(target=='parada'){
                Ext.getCmp('listaDespliegueInfo').setStore(Ext.getStore('storeDespliegueInfo'));
                if(tipoPin=='parada'){
                    //alert('esta es una parada con identificador: '+identificador);
                    Ext.getStore('storeDespliegueInfo').getProxy().setExtraParam('busstopname',identificador);
                    Ext.getStore('storeDespliegueInfo').load();
                }
                else{
                    //alert('no!');
                }
            }
            else{
                Ext.getCmp('listaDespliegueInfo').setStore(Ext.getStore('storeDespliegueInfoBuses'));
                if(tipoPin=='parada'){
                    //alert('no!');
                    //Ext.getStore('storeDespliegueInfo').getProxy().setExtraParam('busstopname',identificador);
                }
                else{
                    //alert('este es un bus con identificador: '+identificador);
                    Ext.getStore('storeDespliegueInfoBuses').getProxy().setExtraParam('idbus',identificador);
                    Ext.getStore('storeDespliegueInfoBuses').load();
                }
            }
        });
    },

    load2DelStoreBusesUCR: function(records, target) {
        limitesPinesEleccion = new google.maps.LatLngBounds();

        for(var i=0; i<records.length; i++){
            MyApp.app.insertarPinesEleccionDisplay(records[i].get('Latitude'),records[i].get('Longitude'),'mapaEleccionPines','bus.png','bus',records[i].get('idBus'),target);
        }
    },

    ejectBotonesDespliegue: function(target) {
        while(arrayMarkersDiplayInfo1[0]){
            arrayMarkersDiplayInfo1.pop().setMap(null);
        }
        while(arrayMarkersDiplayInfo2[0]){
            arrayMarkersDiplayInfo2.pop().setMap(null);
        }

        Ext.getCmp('tabPanelPrincipal').setActiveItem(Ext.getCmp('containerEleccionPines'));
        Ext.getCmp('tabPanelPrincipal').getTabBar().setHidden(1);

        Ext.getStore('storeBusesUCR').load(function(records){
            MyApp.app.load2DelStoreBusesUCR(records,target);
        });
        Ext.getStore('storePinesParadas').load(function(records){
            MyApp.app.load2StorePinesParadas(records,target);
        });

        MyApp.app.refrescadoPinesDespliegueInfo();
    },

    refrescadoPinesDespliegueInfo: function(arregloPines, records) {
        variableTimeOutRefreshDespliegueInfo=setTimeout(function(){
            Ext.getStore('storeBusesUCR').load(function(records){
                for(var i=0; i<records.length; i++){
                    var point = new google.maps.LatLng(records[i].get('Latitude'),records[i].get('Longitude'));
                    arrayMarkersDiplayInfo2[i].setPosition(point);
                }
            });
            MyApp.app.refrescadoPinesDespliegueInfo();
        },2500);
    }

});
