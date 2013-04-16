/*
 * File: app/store/FCEStore.js
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

Ext.define('Rubedo.store.FCEStore', {
    extend: 'Ext.data.Store',
    alias: 'store.FCEStore',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'FCEStore',
            fields: [
                {
                    name: 'id'
                },
                {
                    name: 'qNb'
                },
                {
                    name: 'itemConfig'
                }
            ]
        }, cfg)]);
    }
});