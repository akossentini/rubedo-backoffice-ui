/*
 * File: app/view/Panier.js
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

Ext.define('Rubedo.view.Panier', {
    extend: 'Ext.window.Window',
    alias: 'widget.panier',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Column',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.panel.Tool'
    ],

    height: 300,
    id: 'Panier',
    width: 600,
    layout: 'fit',
    constrainHeader: true,
    iconCls: 'cart',
    title: 'Panier',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'PanierGrid',
                    title: '',
                    store: 'PanierDataJson',
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 183,
                            dataIndex: 'text',
                            text: 'Titre',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etat',
                            text: 'Etat',
                            flex: 1
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'left',
                    items: [
                        {
                            xtype: 'button',
                            id: 'enleverPanier',
                            iconCls: 'shopping_cart_remove_med',
                            scale: 'medium',
                            text: 'Enlever'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'pencil_med',
                            scale: 'medium',
                            text: 'Action 1'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'pencil_med',
                            scale: 'medium',
                            text: 'Action 2'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'pencil_med',
                            scale: 'medium',
                            text: 'Action 3'
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'tool',
                    itemId: 'windowMinimize',
                    type: 'minimize'
                },
                {
                    xtype: 'tool',
                    itemId: 'windowMaximize',
                    type: 'maximize'
                }
            ]
        });

        me.callParent(arguments);
    }

});