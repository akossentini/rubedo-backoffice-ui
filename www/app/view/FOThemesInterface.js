/*
 * File: app/view/FOThemesInterface.js
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

Ext.define('Rubedo.view.FOThemesInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.FOThemesInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Ext.panel.Tool',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.tree.Column',
        'Ext.form.field.Text',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Date'
    ],

    height: 533,
    id: 'FOThemesInterface',
    width: 852,
    constrainHeader: true,
    iconCls: 'media-icon',
    title: 'Themes',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            id: 'foThemeImportBtn',
                            iconAlign: 'top',
                            iconCls: 'database_up_big',
                            scale: 'large',
                            text: 'Import'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    localiserId: 'filePlanTreePanel',
                    height: 250,
                    id: 'mainDirectoriesTree1',
                    width: 200,
                    title: '',
                    store: 'ThemeDirectoriesStore',
                    useArrows: true,
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                ddGroup: 'DirectoriesThemeDD'
                            })
                        ],
                        listeners: {
                            beforedrop: {
                                fn: me.onTreeViewDragDropBeforeDrop1,
                                scope: me
                            },
                            drop: {
                                fn: me.onTreeViewDragDropDrop1,
                                scope: me
                            }
                        }
                    },
                    columns: [
                        {
                            xtype: 'treecolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.isRoot()){
                                    return("<i style=\"color:#777;\">"+Rubedo.RubedoAutomatedElementsLoc.rootText+"</i>");
                                    record.data.allowDrop=false;
                                    record.data.allowDrag=false;
                                } else if (record.get("id")=="notFiled") {
                                    record.data.allowDrag=false;
                                    return(Rubedo.RubedoAutomatedElementsLoc.notFiledText);

                                } else if (record.get("text")=="theme") {
                                    record.data.allowDrop=false;
                                    record.data.allowDrag=false;
                                    return("<i style=\"color:#777;\">"+value+"</i>");

                                }
                                else if (record.get("readOnly")) {
                                    record.data.allowDrop=false;
                                    record.data.allowDrag=false;
                                    return("<i style=\"color:#777;\">"+value+"</i>");

                                } else {
                                    return(value);
                                }
                            },
                            localiserId: 'damFolderCol',
                            dataIndex: 'text',
                            text: 'Folder',
                            flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            listeners: {
                                beforeedit: {
                                    fn: me.onCellEditingBeforeEdit1,
                                    scope: me
                                },
                                edit: {
                                    fn: me.onCellEditingEdit1,
                                    scope: me
                                }
                            }
                        })
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onMainDirectoriesTree1SelectionChange,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    title: 'Files',
                    store: 'DAMFolderViewStore1',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'text',
                            text: 'Text',
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return(Ext.util.Format.fileSize(value));
                            },
                            dataIndex: 'fileSize',
                            text: 'FileSize',
                            flex: 1
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'lastUpdateTime',
                            text: 'Last Update',
                            flex: 1
                        }
                    ]
                }
            ],
            listeners: {
                beforeclose: {
                    fn: me.onFOThemesInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTreeViewDragDropBeforeDrop1: function(node, data, overModel, dropPosition, dropHandlers) {

        if (!ACL.interfaceRights["write.ui.directories"]){
            return(false);
        }
        Ext.getStore("ThemeDirectoriesStore").suspendAutoSync();
        var movedOne=data.records[0];
        if (!Ext.isEmpty(movedOne.get("typeId"))){
            if (dropPosition!="append"){return(false);}
            if (overModel.isRoot()){return(false);}
            var idArray=Ext.Array.pluck(Ext.Array.pluck(data.records,"data"),"id");
        	Ext.Ajax.request({
                url: 'directories/classify',
                params: {
                    mediaArray: Ext.JSON.encode(idArray),
                    directoryId:overModel.get("id")
                },
                success: function(response){
                    //Ext.getStore("DAMFolderViewStore").load();
                },
                failure:function(response){
            		var msg=Ext.JSON.decode(response.responseText).msg;
                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, msg);
                }
            });



            return(false);
        } else if ((dropPosition=="append")&&(overModel.get("id")=="notFiled")){
            return(false);
        }
        var interm=0;
        var targeted=overModel.get("orderValue");

        if (dropPosition=="before"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }
            if (!Ext.isEmpty(overModel.previousSibling)){interm=overModel.previousSibling.get("orderValue");}
            movedOne.set("orderValue", (interm+targeted)/2);
        } else if (dropPosition=="after"){
            if ((movedOne.parentNode!=overModel.parentNode)&&(movedOne.parentNode.childNodes.length==1)){
                movedOne.parentNode.set("expandable", false);
            }
            if (!Ext.isEmpty(overModel.nextSibling)){interm=overModel.nextSibling.get("orderValue");}
            else{interm=10000;}
            movedOne.set("orderValue", (interm+targeted)/2);
        } else if (dropPosition=="append"){
            if (movedOne.parentNode.childNodes.length==1){
                movedOne.parentNode.set("expandable", false);
            }

            if (overModel.hasChildNodes()){
                movedOne.set("orderValue", overModel.lastChild.get("orderValue")+100);
            } else {
                movedOne.set("orderValue", 100);
                overModel.set("expandable", true);
            }
        }
    },

    onTreeViewDragDropDrop1: function(node, data, overModel, dropPosition) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getStore("ThemeDirectoriesStore").resumeAutoSync();
            Ext.getStore("ThemeDirectoriesStore").sync();
        });
        task.delay(200);
    },

    onCellEditingBeforeEdit1: function(editor, e, eOpts) {
        if ((!ACL.interfaceRights["write.ui.directories"])||(Ext.getCmp("mainDirectoriesTree1").getSelectionModel().getLastSelected().get("readOnly"))||(Ext.getCmp("mainDirectoriesTree1").getSelectionModel().getLastSelected().get("id")=="notFiled")||(Ext.getCmp("mainDirectoriesTree1").getSelectionModel().getLastSelected().isRoot())) {
            return false;
        }
    },

    onCellEditingEdit1: function(editor, e, eOpts) {
        Ext.getCmp("mainDirectoriesTree1").getSelectionModel().getLastSelected().collapseChildren(true);
        Ext.getCmp("mainDirectoriesTree1").getStore().load({"node":Ext.getCmp("mainDirectoriesTree1").getSelectionModel().getLastSelected()});
    },

    onMainDirectoriesTree1SelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)){
            Ext.getStore("DAMFolderViewStore1").removeAll();
        } else {
            Ext.getStore("DAMFolderViewStore1").directoryFilter=selected[0].get("id");
            Ext.getStore("DAMFolderViewStore1").load();
        }
    },

    onFOThemesInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("DAMFolderViewStore1").removeAll();
    }

});