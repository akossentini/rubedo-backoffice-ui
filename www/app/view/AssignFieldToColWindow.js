/*
 * File: app/view/AssignFieldToColWindow.js
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

Ext.define('Rubedo.view.AssignFieldToColWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.AssignFieldToColWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    localiserId: 'assignTCFieldWindow',
    width: 261,
    constrain: true,
    resizable: false,
    layout: 'fit',
    title: 'Assign field',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'combobox',
                            localiserId: 'assignFieldField',
                            anchor: '100%',
                            fieldLabel: 'Field',
                            labelWidth: 50,
                            name: 'field',
                            allowBlank: false,
                            editable: false,
                            displayField: 'label',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'CTFieldsForLayouts',
                            valueField: 'name'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'assignFieldSubmitBtn',
                            anchor: '100%',
                            id: 'assignFieldToLayoutSubmitBtn',
                            scale: 'medium',
                            text: 'Assign this field to selected column'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});