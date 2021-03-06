/*
 * File: app/view/UTCField.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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

Ext.define('Rubedo.view.UTCField', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.UTCField',

    fieldLabel: 'Label',
    editable: false,
    displayField: 'type',
    forceSelection: true,
    store: 'UserTypesCombo',
    valueField: 'id',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onComboboxRender,
                    scope: me
                }
            }
        });

        me.processCTCField(me);
        me.callParent(arguments);
    },

    processCTCField: function(config) {
        config.plugins=[Ext.create("Ext.ux.form.field.ClearButton")];
        return config;
    },

    onComboboxRender: function(component, eOpts) {
        component.getStore().load();
    }

});