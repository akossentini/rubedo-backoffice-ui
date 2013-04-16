/*
 * File: app/store/taxoTermsCombo.js
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

Ext.define('Rubedo.store.taxoTermsCombo', {
    extend: 'Ext.data.Store',

    requires: [
        'Rubedo.model.taxonomyTermModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Rubedo.model.taxonomyTermModel',
            storeId: 'MyJsonStore28',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'taxonomy-terms'
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