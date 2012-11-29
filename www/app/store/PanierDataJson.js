/*
 * File: app/store/PanierDataJson.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('Rubedo.store.PanierDataJson', {
    extend: 'Ext.data.Store',
    alias: 'store.panierDataJson',

    requires: [
        'Rubedo.model.panierDataModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            storeId: 'PanierDataJson',
            model: 'Rubedo.model.panierDataModel',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'panier/create',
                    read: 'panier',
                    update: 'panier/update',
                    destroy: 'panier/delete'
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
            },
            listeners: {
                datachanged: {
                    fn: me.onJsonstoreDataChangeD,
                    single: true,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonstoreDataChangeD: function(abstractstore, options) {
        /*var nbeltspanier =  this.count();
        Ext.getCmp('boutonPanierEntete').setText('Panier ('+nbeltspanier+')');*/

    }

});