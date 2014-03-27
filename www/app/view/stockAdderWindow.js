/*
 * File: app/view/stockAdderWindow.js
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

Ext.define('Rubedo.view.stockAdderWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.stockAdderWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    id: 'stockAdderWindow',
    width: 400,
    layout: 'fit',
    title: 'Add stock',
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
                            xtype: 'numberfield',
                            anchor: '100%',
                            fieldLabel: 'Amount to add',
                            name: 'amount',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            allowDecimals: false,
                            allowExponential: false,
                            minValue: 0
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
                            id: 'stockAdderSubmitBtn',
                            text: 'Add stock to selected item',
                            listeners: {
                                click: {
                                    fn: me.onStockAdderSubmitBtnClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onStockAdderSubmitBtnClick: function(button, e, eOpts) {
        var form=button.up().getForm();
        if (form.isValid()){
            var amount=form.getValues().amount;
            Ext.getCmp("mainStockGrid").getStore().getProxy().extraParams.actionToApply="add";
            Ext.getCmp("mainStockGrid").getStore().getProxy().extraParams.amountToApply=amount;
            Ext.getCmp("mainStockGrid").getSelectionModel().getLastSelected().set("stock",Ext.getCmp("mainStockGrid").getSelectionModel().getLastSelected().get("stock")+amount);
            button.up().up().close();
        }
    }

});