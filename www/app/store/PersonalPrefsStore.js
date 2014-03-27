/*
 * File: app/store/PersonalPrefsStore.js
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

Ext.define('Rubedo.store.PersonalPrefsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PersonalPrefsStore',

    requires: [
        'Rubedo.model.personalPrefsDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoSync: true,
            model: 'Rubedo.model.personalPrefsDataModel',
            storeId: 'PersonalPrefsStore',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'personal-prefs/create',
                    read: 'personal-prefs',
                    update: 'personal-prefs/update',
                    destroy: 'personal-prefs/delete'
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