/*
 * File: app/store/WorkspacesComboStore.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.store.WorkspacesComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.WorkspacesComboStore',

    requires: [
        'Rubedo.model.workspaceModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Workspaces',
            autoLoad: true,
            model: 'Rubedo.model.workspaceModel',
            storeId: 'WorkspacesComboStore',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'workspaces'
                },
                extraParams: {
                    notAll: true
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