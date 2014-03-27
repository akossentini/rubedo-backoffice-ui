/*
 * File: app/view/menuContenusContext.js
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

Ext.define('Rubedo.view.menuContenusContext', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.menuContenusContext',

    requires: [
        'Ext.grid.View',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.button.Button',
        'Ext.ux.grid.FiltersFeature'
    ],

    id: 'ContenusGrid',
    title: '',
    store: 'ContenusDataJson',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var returner = value;
                        if (record.get("readOnly")){
                            returner ="<i style=\"color:#777;\">"+value+"</i>";
                        }
                        if (record.get("status")=="published") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_accept.png"> '+returner);
                        } else if (record.get("status")=="pending") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_process.png"> '+returner);
                        } else if (record.get("status")=="draft") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_edit.png"> '+returner);
                        } else if (record.get("status")=="refused") {
                            return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_remove.png"> '+returner);
                        }




                    },
                    localiserId: 'titleColumn',
                    dataIndex: 'text',
                    text: 'Titre',
                    flex: 2
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        try{var myFlagCode=Ext.getStore("AllLanguagesStore3").query("locale",record.get("locale"),false,false,true).items[0].get("flagCode");}
                        catch(err){var myFlagCode="_unknown";}
                        var returner =" <img src=\"/assets/flags/16/"+myFlagCode+".png\"> ";
                        if(!Ext.isEmpty(value)){
                            Ext.Object.each(value, function(key, value, myself) {
                                if (key!=record.get("locale")){
                                    try{var myFlagCode2=Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items[0].get("flagCode");}
                                    catch(err){var myFlagCode2="_unknown";}
                                    if (myFlagCode2!="_unknown"){
                                        returner=returner+" <img src=\"/assets/flags/16/"+myFlagCode2+".png\"> ";
                                    }
                                }
                            });
                        }
                        return(returner);
                    },
                    localiserId: 'languageCoumn',
                    dataIndex: 'i18n',
                    text: 'Languages',
                    flex: 1,
                    listeners: {
                        afterrender: {
                            fn: me.onGridcolumnAfterRender,
                            scope: me
                        }
                    }
                },
                me.processEtat({
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value=="published") {
                            return(Rubedo.RubedoAutomatedElementsLoc.publishedText);
                        } else if (value=="pending") {
                            return(Rubedo.RubedoAutomatedElementsLoc.pendingText);
                        } else if (value=="draft") {
                            return(Rubedo.RubedoAutomatedElementsLoc.draftText);
                        } else if (value=="refused") {
                            return(Rubedo.RubedoAutomatedElementsLoc.refusedText);
                        }
                    },
                    localiserId: 'stateColumn',
                    dataIndex: 'status',
                    text: 'Etat',
                    flex: 1
                }),
                me.processLastupdate({
                    xtype: 'datecolumn',
                    localiserId: 'lastUpdateContentCol',
                    dataIndex: 'lastUpdateTime',
                    text: 'Last update'
                }),
                me.processEnligne({
                    xtype: 'booleancolumn',
                    filter: {
                        type: 'combo',
                        store: [
                            [
                                true,
                                Rubedo.RubedoAutomatedElementsLoc.yesText
                            ],
                            [
                                false,
                                Rubedo.RubedoAutomatedElementsLoc.noText
                            ]
                        ]
                    },
                    localiserId: 'onlineColumn',
                    width: 60,
                    dataIndex: 'online',
                    text: 'En ligne'
                })
            ],
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'ContenusDataJson',
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                Ext.getCmp("ContenusGrid").features[0].clearFilters();
                            },
                            localiserId: 'contentsClearFilterBtn',
                            iconCls: 'close',
                            text: 'Clear filters'
                        }
                    ]
                }
            ]
        });

        me.processMenuContenusContext(me);
        me.callParent(arguments);
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

    processLastupdate: function(config) {
        config.filter={
            type:"date",
            dateFormat: 'U'
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

    processMenuContenusContext: function(config) {
        config.features=[Ext.create("Ext.ux.grid.FiltersFeature",{encode:true,local:false})];
        return config;
    },

    onGridcolumnAfterRender: function(component, eOpts) {
        if (Ext.getStore("AllLanguagesStore3").getRange().length==1){
            component.hide();
        }
    }

});