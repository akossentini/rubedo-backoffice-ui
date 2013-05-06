/*
 * File: app/store/VersionsDataJson.js
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

Ext.define('Rubedo.store.VersionsDataJson', {
    extend: 'Ext.data.Store',

    requires: [
        'Rubedo.model.versionsDataModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Rubedo.model.versionsDataModel',
            storeId: 'VersionsDataJson',
            pageSize: 1000,
            proxy: {
                type: 'ajax'
            }
        }, cfg)]);
    }
});