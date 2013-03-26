/*
 * File: app/view/addFormFieldWindow.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('Rubedo.view.addFormFieldWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.addFormFieldWindow',

    draggable: false,
    height: 300,
    id: 'addFormFieldWindow',
    width: 500,
    resizable: false,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    title: 'Ajouter un élément',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 0.5,
                    id: 'formFieldSelectGrid',
                    title: '',
                    store: 'FormFieldTypesStore',
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'type',
                            flex: 1,
                            text: 'Type'
                        }
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onFormFieldSelectGridSelectionChange,
                            scope: me
                        },
                        itemdblclick: {
                            fn: me.onFormFieldSelectGridItemDblClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    id: 'formFieldsDetail',
                    styleHtmlContent: true,
                    tpl: [
                        '{description}'
                    ],
                    autoScroll: true,
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
                            disabled: true,
                            id: 'insertFormElementBtn',
                            iconCls: 'add',
                            text: 'Ajouter'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onFormFieldSelectGridSelectionChange: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            Ext.getCmp("insertFormElementBtn").disable();
        } else {
            Ext.getCmp("insertFormElementBtn").enable();
            Ext.getCmp("formFieldsDetail").update(selections[0].getData());
        }
    },

    onFormFieldSelectGridItemDblClick: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp("insertFormElementBtn").fireEvent("click",Ext.getCmp("insertFormElementBtn"));
    }

});