/*
 * File: app/store/CustomThemes.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Rubedo.store.CustomThemes', {
    extend: 'Ext.data.Store',
    alias: 'store.CustomThemes',

    requires: [
        'Rubedo.model.customTheme'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'CustomThemes',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.customTheme',
            storeId: 'CustomThemes',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'custom-themes/create',
                    read: 'custom-themes',
                    update: 'custom-themes/update',
                    destroy: 'custom-themes/delete'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});