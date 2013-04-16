/*
 * File: app/store/MediaTypesForCT.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.store.MediaTypesForCT', {
    extend: 'Ext.data.Store',

    requires: [
        'Rubedo.model.mediaTypeModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'MediaTypes',
            autoLoad: false,
            model: 'Rubedo.model.mediaTypeModel',
            storeId: 'MediaTypesForCT',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'dam-types'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});