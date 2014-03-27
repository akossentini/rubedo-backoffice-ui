/*
 * File: app/view/ajoutChampTCFenetre.js
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

Ext.define('Rubedo.view.ajoutChampTCFenetre', {
    extend: 'Ext.window.Window',
    alias: 'widget.ajoutChampTCFenetre',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.grid.column.Column',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    localiserId: 'addCTFieldWindow',
    height: 446,
    id: 'ajoutChampTCFenetre',
    width: 587,
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
                    id: 'ChampTCSelectGrid',
                    title: '',
                    store: 'TypesChampsDataStore',
                    viewConfig: me.processMyGridView4({
                        plugins: [
                            Ext.create('Ext.grid.plugin.DragDrop', {
                                enableDrop: false
                            })
                        ]
                    }),
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'typeCol',
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 1
                        }
                    ],
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: [
                                '{name}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'PaneauTCDetail',
                            tpl: [
                                '{description}'
                            ],
                            autoScroll: true,
                            bodyPadding: 10,
                            bodyStyle: '{text-align: justify;}',
                            title: ''
                        },
                        {
                            xtype: 'gridpanel',
                            localiserId: 'multiTCAddFieldCol',
                            flex: 1,
                            title: 'Ajout multiple',
                            forceFit: true,
                            store: 'AddMultiFieldStore',
                            viewConfig: {
                                plugins: [
                                    Ext.create('Ext.grid.plugin.DragDrop', {

                                    })
                                ],
                                listeners: {
                                    beforedrop: {
                                        fn: me.onDragDropBeforeDrop,
                                        scope: me
                                    }
                                }
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    localiserId: 'typeCol',
                                    dataIndex: 'type',
                                    text: 'Type'
                                }
                            ]
                        }
                    ]
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
                            id: 'boutonAjouterChampTC',
                            iconCls: 'add',
                            text: 'Ajouter'
                        }
                    ]
                }
            ],
            listeners: {
                beforerender: {
                    fn: me.onAjoutChampTCFenetreBeforeRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    processMyGridView4: function(config) {
        config.copy=true;
        return config;
    },

    onDragDropBeforeDrop: function() {
        if (Ext.isEmpty(data.records[0].get("protoId"))){
            var toCreate=Ext.clone(data.records[0].data);
            toCreate.protoId=toCreate.id;
            delete toCreate.id;
            var newModel=Ext.create("Rubedo.model.typesChampsDataModel", toCreate);
            data.records=[newModel];
        }
    },

    onAjoutChampTCFenetreBeforeRender: function(component, eOpts) {
        Ext.getStore("AddMultiFieldStore").removeAll();
    }

});