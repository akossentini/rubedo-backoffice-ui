/*
 * File: app/view/MultiChoiceConfigurator1.js
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

Ext.define('Rubedo.view.MultiChoiceConfigurator1', {
    extend: 'Ext.window.Window',
    alias: 'widget.MultiChoiceConfigurator1',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Column',
        'Ext.form.field.Text'
    ],

    localiserId: 'optionsEditor1Window',
    height: 311,
    id: 'MultiChoiceConfigurator1',
    width: 550,
    constrain: true,
    resizable: false,
    layout: 'fit',
    title: 'Editeur d\'options',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'validateBtn',
                            id: 'specialOptionsCfgSubmit',
                            iconCls: 'ouiSpetit',
                            text: 'Valider',
                            listeners: {
                                click: {
                                    fn: me.onSpecialOptionsCfgSubmitClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    height: 160,
                    id: 'formsMCCGrid1',
                    title: '',
                    forceFit: true,
                    store: 'MultiChoiceOptionsStore',
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.grid.plugin.DragDrop', {

                            })
                        ]
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'right',
                            width: 28,
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {

                                        Ext.getStore("MultiChoiceOptionsStore").add({
                                            inputValue:"valeur "+ (Ext.getStore("MultiChoiceOptionsStore").count()+1),
                                            name:Ext.getCmp(Ext.getCmp("MultiChoiceConfigurator1").targetedId).name,
                                            boxLabel:"Option "+ (Ext.getStore("MultiChoiceOptionsStore").count()+1)
                                        });

                                    },
                                    localiserId: 'oeditor1addBtn',
                                    id: 'formsMCCGridAdd1',
                                    iconCls: 'add',
                                    text: '',
                                    tooltip: 'Ajouter une option'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        Ext.getCmp("formsMCCGrid1").getStore().remove(Ext.getCmp("formsMCCGrid1").getSelectionModel().getLastSelected());
                                    },
                                    localiserId: 'oeditor1removeBtn',
                                    disabled: true,
                                    id: 'formsMCCGridRemove1',
                                    iconCls: 'close',
                                    text: '',
                                    tooltip: 'Supprimer cette option'
                                }
                            ]
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {

                        })
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onFormsMCCGridSelectionChange,
                            scope: me
                        }
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'valueCol',
                            dataIndex: 'inputValue',
                            text: 'Valeur',
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'labelCol',
                            dataIndex: 'boxLabel',
                            text: 'Label',
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onMultiChoiceConfigurator1AfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onSpecialOptionsCfgSubmitClick: function(button, e, eOpts) {
        Ext.getCmp(button.up().up().targetedId).config.items=Ext.clone(Ext.Array.pluck(button.up().up().getComponent(0).getStore().getRange(),"data"));
        Ext.getCmp(button.up().up().targetedId).removeAll();
        Ext.getCmp(button.up().up().targetedId).add(Ext.getCmp(button.up().up().targetedId).config.items);
        button.up().up().close();
    },

    onFormsMCCGridSelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)){
            Ext.getCmp("formsMCCGridRemove1").disable();
        } else {
            Ext.getCmp("formsMCCGridRemove1").enable();
        }
    },

    onMultiChoiceConfigurator1AfterRender: function(component, eOpts) {
        component.getComponent(0).getStore().loadData(Ext.clone(Ext.getCmp(component.targetedId).config.items));
    }

});