/*
 * File: app/view/CTECommerceFieldset.js
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

Ext.define('Rubedo.view.CTECommerceFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.CTECommerceFieldset',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.FieldSet',
        'Ext.form.field.Number'
    ],

    localiserId: 'eCFieldset',
    id: 'CTECommerceFieldset',
    title: 'E-Commerce',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    localiserId: 'manageStockField',
                    fieldLabel: 'Manage stock',
                    name: 'manageStock',
                    boxLabel: '',
                    inputValue: 'true',
                    uncheckedValue: 'false',
                    listeners: {
                        change: {
                            fn: me.onCheckboxfieldChange,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'fieldset',
                    localiserId: 'stockManagementFieldset',
                    hidden: true,
                    title: 'Stock management',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            localiserId: 'canOrderOutOfStockField',
                            fieldLabel: 'Can order out of stock',
                            labelWidth: 140,
                            name: 'canOrderNotInStock',
                            boxLabel: '',
                            inputValue: 'true',
                            uncheckedValue: 'false'
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            localiserId: 'outOfStockLimitField',
                            fieldLabel: 'Out of stock limit',
                            labelWidth: 140,
                            name: 'outOfStockLimit',
                            allowBlank: false,
                            minValue: 0
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            localiserId: 'notifyForQuantityBelowField',
                            fieldLabel: 'Notify for stock below',
                            labelWidth: 140,
                            name: 'notifyForQuantityBelow',
                            allowBlank: false,
                            minValue: 0
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            localiserId: 'resupplyDelayField',
                            fieldLabel: 'Resupply delay (days)',
                            labelWidth: 140,
                            name: 'resupplyDelay',
                            allowBlank: false,
                            minValue: 0
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    localiserId: 'preparationDelayField',
                    fieldLabel: 'Preparation delay (days)',
                    labelWidth: 140,
                    name: 'preparationDelay',
                    allowBlank: false,
                    minValue: 0
                }
            ],
            listeners: {
                added: {
                    fn: me.onCTECommerceFieldsetAdded,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if (newValue){
            field.nextSibling().show();
        } else {
            field.nextSibling().hide();
        }
    },

    onCTECommerceFieldsetAdded: function(component, container, pos, eOpts) {
        /* var shippersPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:Ext.getStore("ShippersForCT"),
            anchor:"100%",
            name:"shippers",
            fieldLabel:"Shippers",
            labelWidth:100,
            queryMode:"local",
            multiSelect:true,
            valueField:"id",
            displayField:"name",
            forceSelection:true,
            createNewOnEnter:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            stacked:true,
            allowBlank:true

        });
        component.add(shippersPicker); */
    }

});