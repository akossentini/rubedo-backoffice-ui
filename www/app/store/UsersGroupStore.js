/*
 * File: app/store/UsersGroupStore.js
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

Ext.define('Rubedo.store.UsersGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.UsersGroupStore',

    requires: [
        'Rubedo.model.userDataModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Rubedo.model.userDataModel',
            storeId: 'UsersGroupStore',
            pageSize: 1000
        }, cfg)]);
    }
});