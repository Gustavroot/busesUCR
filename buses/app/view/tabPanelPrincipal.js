/*
 * File: app/view/tabPanelPrincipal.js
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

Ext.define('MyApp.view.tabPanelPrincipal', {
    extend: 'Ext.tab.Panel',

    requires: [
        'MyApp.view.containerDescripProyecto',
        'MyApp.view.containerInfo',
        'MyApp.view.containerMapaPrinc',
        'MyApp.view.containerEleccionPines'
    ],

    config: {
        id: 'tabPanelPrincipal',
        tabBar: {
            docked: 'bottom'
        },
        listeners: [
            {
                fn: 'onTabpanelActiveItemChange',
                event: 'activeitemchange'
            }
        ],
        items: [
            {
                xtype: 'mycontainer',
                title: 'Acerca de',
                iconCls: 'bookmarks'
            },
            {
                xtype: 'mycontainer11',
                title: 'Info',
                iconCls: 'info'
            },
            {
                xtype: 'mycontainer1',
                title: 'Mapa',
                iconCls: 'maps'
            },
            {
                xtype: 'mycontainer3',
                iconCls: 'info',
                hidden: true
            }
        ]
    },

    onTabpanelActiveItemChange: function(container, value, oldValue, eOpts) {
        if(value==Ext.getCmp('containerMapaPrinc')){

        }
    }

});