/*
 * File: app/view/manualQueryInterface.js
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

Ext.define('Rubedo.view.manualQueryInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.manualQueryInterface',

    requires: [
        'Rubedo.view.MyGridPanel31',
        'Rubedo.view.MyTool17'
    ],

    height: 401,
    id: 'manualQueryInterface',
    width: 1064,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    title: 'Requête manuelle',
    constrain: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'mygridpanel31',
                    flex: 1,
                    listeners: {
                        selectionchange: {
                            fn: me.onManualQueryLeftGridSelectionChange,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'toolbar',
                    height: 50,
                    vertical: true,
                    items: [
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'manualQueryAddRecordBtn',
                            iconAlign: 'right',
                            iconCls: 'arrow_right',
                            text: 'Ajouter',
                            listeners: {
                                click: {
                                    fn: me.onManualQueryAddRecordBtnClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'manualQueryRemoveRecordBtn',
                            iconCls: 'arrow_left',
                            text: 'Enlever',
                            listeners: {
                                click: {
                                    fn: me.onManualQueryRemoveRecordBtnClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'manualQueryRightGridGrid',
                    title: '',
                    store: 'ContentMQueryStore',
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.grid.plugin.DragDrop', {
                                ptype: 'gridviewdragdrop'
                            })
                        ]
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get("status")=="published") {
                                    return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_accept.png"> '+value);
                                } else if (record.get("status")=="pending") {
                                    return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_process.png"> '+value);
                                } else if (record.get("status")=="draft") {
                                    return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_edit.png"> '+value);
                                }



                            },
                            filter: true,
                            dataIndex: 'text',
                            flex: 1,
                            text: 'Titre'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.isEmpty(Ext.getStore("TCNDepComboCS").findRecord("id",value))) {
                                    return(value);
                                } else {
                                    return(Ext.getStore("TCNDepComboCS").findRecord("id",value).get("type"));
                                }
                            },
                            filter: {
                                type: 'combo',
                                valueField: 'id',
                                displayField: 'type',
                                store: 'TCNDepComboCS'
                            },
                            dataIndex: 'typeId',
                            flex: 1,
                            text: 'Type'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value=="published") {
                                    return("publié");
                                } else if (value=="pending") {
                                    return("en attente de validation");
                                } else if (value=="draft") {
                                    return("brouillon");
                                }
                            },
                            filter: {
                                type: 'combo',
                                store: [
                                    [
                                        'draft',
                                        'brouillon'
                                    ],
                                    [
                                        'pending',
                                        'en attente de validation'
                                    ],
                                    [
                                        'published',
                                        'publié'
                                    ]
                                ]
                            },
                            dataIndex: 'status',
                            flex: 1,
                            text: 'Etat'
                        },
                        {
                            xtype: 'booleancolumn',
                            filter: {
                                type: 'combo',
                                store: [
                                    [
                                        true,
                                        'Oui'
                                    ],
                                    [
                                        false,
                                        'Non'
                                    ]
                                ]
                            },
                            width: 60,
                            dataIndex: 'online',
                            text: 'En ligne',
                            falseText: 'Non',
                            trueText: 'Oui'
                        }
                    ],
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
                                    id: 'manualQuerySaveBtn',
                                    iconCls: 'ouiSpetit',
                                    text: 'Enregistrer la requête',
                                    listeners: {
                                        click: {
                                            fn: me.onManualQuerySaveBtnClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onManualQueryRightGridGridSelectionChange,
                            scope: me
                        }
                    }
                }
            ],
            tools: [
                {
                    xtype: 'mytool17'
                }
            ],
            listeners: {
                render: {
                    fn: me.onManualQueryInterfaceRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onManualQueryInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onManualQueryLeftGridSelectionChange: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            Ext.getCmp("manualQueryAddRecordBtn").disable();
        } else {
            Ext.getCmp("manualQueryAddRecordBtn").enable();
        }
    },

    onManualQueryAddRecordBtnClick: function(button, e, options) {
        var target = Ext.getCmp("manualQueryLeftGrid").getSelectionModel().getLastSelected();
        Ext.getCmp("manualQueryLeftGrid").getStore().remove(target);
        Ext.getCmp("manualQueryRightGridGrid").getStore().add(target);
    },

    onManualQueryRemoveRecordBtnClick: function(button, e, options) {
        var target = Ext.getCmp("manualQueryRightGridGrid").getSelectionModel().getLastSelected();
        Ext.getCmp("manualQueryRightGridGrid").getStore().remove(target);
        Ext.getCmp("manualQueryLeftGrid").getStore().add(target);
    },

    onManualQuerySaveBtnClick: function(button, e, options) {
        var raw = button.up().up().getStore().getRange();
        var refined = Ext.Array.pluck(Ext.Array.pluck(raw, "data"), "id");
        if (!Ext.isEmpty(refined)){
            var newQuery = Ext.create("Rubedo.model.queryDataModel", {
                name:"Requête manuelle",
                type:"manual",
                query:refined,
                averageDuration:0,
                count:0,
                usage:[]
            });

            Ext.getStore("QueriesStore").add(newQuery);
            Ext.getStore("QueriesStore").addListener("update", function(){
                Ext.getCmp(Ext.getCmp("manualQueryInterface").mainFieldId).select(newQuery);
            },this,{single:true});


                Ext.getCmp("manualQueryInterface").close();
            }
    },

    onManualQueryRightGridGridSelectionChange: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            Ext.getCmp("manualQueryRemoveRecordBtn").disable();

        } else {
            Ext.getCmp("manualQueryRemoveRecordBtn").enable();

        }
    },

    onManualQueryInterfaceRender: function(abstractcomponent, options) {
        Ext.getStore("TCNDepComboCS").load();
        abstractcomponent.getComponent(0).getStore().clearFilter(true);
        abstractcomponent.getComponent(0).getStore().load();
    },

    onManualQueryInterfaceBeforeClose: function(panel, options) {
        panel.getComponent(0).getStore().clearFilter(true);
        panel.getComponent(0).getStore().removeAll();
        panel.getComponent(2).getStore().clearFilter(true);
        panel.getComponent(2).getStore().removeAll();
        Ext.getStore("TCNDepComboCS").removeAll();
    }

});