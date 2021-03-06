/*
 * File: app/view/MTFieldAddWindow.js
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

Ext.define('Rubedo.view.MTFieldAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.MTFieldAddWindow',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    localiserId: 'addMTFieldWindow',
    height: 300,
    id: 'MTFieldAddWindow',
    width: 500,
    resizable: false,
    constrainHeader: true,
    title: 'Ajouter un champ',
    modal: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 0.5,
                    id: 'MTFieldSelectGrid',
                    title: '',
                    store: 'MTFieldsStore',
                    viewConfig: {
                        markDirty: false
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'typeCol',
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 1
                        }
                    ],
                    listeners: {
                        select: {
                            fn: me.onMTFieldSelectGridSelect,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    id: 'MTFieldDescriber',
                    tpl: [
                        '{description}'
                    ],
                    bodyPadding: 10,
                    bodyStyle: '{text-align: justify;}',
                    title: ''
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            disabled: true,
                            id: 'MTFieldInsertBtn',
                            iconCls: 'add',
                            text: 'Ajouter'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onMTFieldSelectGridSelect: function(rowmodel, record, index, eOpts) {
        Ext.getCmp("MTFieldInsertBtn").enable();
        Ext.getCmp("MTFieldDescriber").update(record.get("description"));
    }

});