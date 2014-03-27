/*
 * File: app/view/contentPickerGrid.js
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

Ext.define('Rubedo.view.contentPickerGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contentPickerGrid',

    requires: [
        'Ext.grid.View',
        'Ext.grid.column.Boolean',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    id: 'contentPickerGrid',
    title: '',
    store: 'ContentSelectorStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var icDir="blue";
                        if (typeof(MyPrefData)!="undefined"){
                            icDir=MyPrefData.iconsDir;
                        }

                        if (record.get("status")=="published") {
                            return('<img src="resources/icones/'+icDir+'/16x16/page_accept.png"> '+value);
                        } else if (record.get("status")=="pending") {
                            return('<img src="resources/icones/'+icDir+'/16x16/page_process.png"> '+value);
                        } else if (record.get("status")=="draft") {
                            return('<img src="resources/icones/'+icDir+'/16x16/page_edit.png"> '+value);
                        }



                    },
                    localiserId: 'titleCol',
                    dataIndex: 'text',
                    text: 'Titre',
                    flex: 1
                },
                me.processType({
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (Ext.isEmpty(Ext.getStore("TCNDepComboCS").findRecord("id",value))) {
                            return(value);
                        } else {
                            return(Ext.getStore("TCNDepComboCS").findRecord("id",value).get("type"));
                        }
                    },
                    localiserId: 'typeCol',
                    dataIndex: 'typeId',
                    text: 'Type',
                    flex: 1
                }),
                me.processEtat({
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
                    localiserId: 'statusCol',
                    dataIndex: 'status',
                    text: 'Etat',
                    flex: 1
                }),
                me.processEnligne({
                    xtype: 'booleancolumn',
                    localiserId: 'onlineCol',
                    width: 60,
                    dataIndex: 'online',
                    text: 'En ligne',
                    falseText: 'Non',
                    trueText: 'Oui'
                })
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'ContentSelectorStore',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                var chosenOne = button.up().up().getSelectionModel().getLastSelected();
                                Ext.getCmp(button.up().up().up().targetId).setValue(chosenOne.get("id"));
                                button.up().up().up().close();

                            },
                            localiserId: 'chooseThisContentBtn',
                            disabled: true,
                            id: 'contentPickerSelectBtn',
                            iconCls: 'ouiSpetit',
                            text: '<b>Choisir ce contenu</b>'
                        }
                    ]
                }
            ],
            listeners: {
                selectionchange: {
                    fn: me.onContentPickerGridSelectionChange,
                    scope: me
                },
                itemdblclick: {
                    fn: me.onContentPickerGridItemDblClick,
                    scope: me
                }
            }
        });

        me.processContentPickerGrid(me);
        me.callParent(arguments);
    },

    processType: function(config) {
        config.filter={
            type:"list",
            labelField:"type",
            store:Ext.getStore("TCNDepComboCS")
        };
        return config;
    },

    processEtat: function(config) {
        config.filter={
            type:"list",
            options: [
            ["draft", Rubedo.RubedoAutomatedElementsLoc.draftText],
            ["pending", Rubedo.RubedoAutomatedElementsLoc.pendingText],
            ["published", Rubedo.RubedoAutomatedElementsLoc.publishedText],
            ["refused", Rubedo.RubedoAutomatedElementsLoc.refusedText]
            ]
        };
        return config;
    },

    processEnligne: function(config) {
        config.trueText=Rubedo.RubedoAutomatedElementsLoc.yesText;
        config.falseText=Rubedo.RubedoAutomatedElementsLoc.noText;
        config.filter={
            type:"list",
            options: [
            [true, config.trueText],
            [false,config.falseText]
            ]
        };
        return config;
    },

    processContentPickerGrid: function(config) {
        config.features=[Ext.create("Ext.ux.grid.FiltersFeature",{encode:true,local:false})];
        return config;
    },

    onContentPickerGridSelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)) {
            Ext.getCmp("contentPickerSelectBtn").disable();
        } else {
            Ext.getCmp("contentPickerSelectBtn").enable();
        }
    },

    onContentPickerGridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp("contentPickerSelectBtn").handler(Ext.getCmp("contentPickerSelectBtn"));

    }

});