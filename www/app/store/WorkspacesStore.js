/*
 * File: app/store/WorkspacesStore.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
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

Ext.define('Rubedo.store.WorkspacesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.WorkspacesStore',

    requires: [
        'Rubedo.model.workspaceModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Workspaces',
            forcedSync: true,
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.workspaceModel',
            storeId: 'WorkspacesStore',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'workspaces/create',
                    read: 'workspaces',
                    update: 'workspaces/update',
                    destroy: 'workspaces/delete'
                },
                extraParams: {
                    notAll: true
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