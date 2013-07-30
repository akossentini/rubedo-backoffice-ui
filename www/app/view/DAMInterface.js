/*
 * File: app/view/DAMInterface.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Rubedo.view.DAMInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.DAMInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Rubedo.view.DAMMainView'
    ],

    localiserId: 'mediasWindow',
    currentViewMode: 'search',
    height: 651,
    id: 'DAMInterface',
    width: 1110,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'mediaTypes',
    title: 'Médiathèque',
    constrainHeader: true,

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
                    dock: 'bottom',
                    height: 50,
                    itemId: 'barreMeta',
                    items: [
                        {
                            xtype: 'image',
                            height: 45,
                            margin: '0 10 0 0',
                            width: 48,
                            listeners: {
                                render: {
                                    fn: me.onImageRender11,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'boiteBarreMeta',
                            styleHtmlContent: true,
                            tpl: [
                                '{customMeta}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 86,
                    itemId: 'contextBar',
                    items: [
                        {
                            xtype: 'button',
                            adaptToCurrentMode: function() {
                                var btn = Ext.getCmp("DAMSwitchModeBtn");
                                var mode =Ext.getCmp("DAMInterface").currentViewMode;
                                if (mode=="search"){
                                    btn.setIconCls("folder_big");
                                    btn.setText(Rubedo.RubedoAutomatedElementsLoc.folderViewText);
                                    btn.setTooltip(Rubedo.RubedoAutomatedElementsLoc.switchToFolderViewText);
                                } else {
                                    btn.setIconCls("search_big");
                                    btn.setText(Rubedo.RubedoAutomatedElementsLoc.searchViewText);
                                    btn.setTooltip(Rubedo.RubedoAutomatedElementsLoc.switchToSearchViewText);
                                }
                            },
                            id: 'DAMSwitchModeBtn',
                            iconAlign: 'top',
                            iconCls: 'folder_big',
                            scale: 'large',
                            text: 'Folder view',
                            tooltip: 'Switch to folder fiew',
                            listeners: {
                                render: {
                                    fn: me.onDAMSwitchModeBtnRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'buttongroup',
                            hidden: true,
                            id: 'filePlanEditBtnGroup',
                            headerPosition: 'bottom',
                            title: 'File plan',
                            columns: 3,
                            items: [
                                {
                                    xtype: 'button',
                                    ACL: 'write.ui.directories',
                                    localiserId: 'addDirectoryBtn',
                                    id: 'addDirectoryBtn',
                                    minWidth: 40,
                                    iconAlign: 'top',
                                    iconCls: 'folder_add_big',
                                    scale: 'large',
                                    text: 'Add'
                                },
                                {
                                    xtype: 'button',
                                    ACL: 'write.ui.directories',
                                    localiserId: 'removeDirectoryBtn',
                                    disabled: true,
                                    id: 'removeDirectoryBtn',
                                    iconAlign: 'top',
                                    iconCls: 'folder_remove_big',
                                    scale: 'large',
                                    text: 'Remove'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'directorySettingsBtn',
                                    disabled: true,
                                    id: 'directorySettingsBtn',
                                    iconAlign: 'top',
                                    iconCls: 'folder_settings_big',
                                    scale: 'large',
                                    text: 'Settings'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.dam',
                            localiserId: 'addBtn',
                            id: 'addDAMBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.dam',
                            localiserId: 'removeBtn',
                            disabled: true,
                            id: 'DAMDeleteBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            hidden: true,
                            id: 'DAMROBtn',
                            iconAlign: 'top',
                            iconCls: 'pencil_big',
                            scale: 'large',
                            text: 'Afficher',
                            listeners: {
                                render: {
                                    fn: me.onDAMROBtnRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.dam',
                            localiserId: 'editBtn',
                            disabled: true,
                            id: 'DAMUpdateBtn',
                            iconAlign: 'top',
                            iconCls: 'pencil_big',
                            scale: 'large',
                            text: 'Editer'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.dam',
                            localiserId: 'massDamUploadBtn',
                            id: 'massDamUploadBtn',
                            iconAlign: 'top',
                            iconCls: 'database_up_big',
                            scale: 'large',
                            text: 'Mass upload'
                        },
                        {
                            xtype: 'buttongroup',
                            localiserId: 'clipboardGroup',
                            disabled: true,
                            id: 'DAMPPBtnGroup',
                            headerPosition: 'bottom',
                            title: 'Presse-papiers',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    ACL: 'write.ui.dam',
                                    hidden: true,
                                    iconAlign: 'top',
                                    iconCls: 'applications_big',
                                    scale: 'large',
                                    text: 'Copier'
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'addToSCMTBtn',
                                    iconAlign: 'top',
                                    iconCls: 'shopping_cart_add_big',
                                    scale: 'large',
                                    text: 'Ajouter au panier'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'shortcutBtn',
                                    itemId: 'boutonCreerRaccourci',
                                    iconAlign: 'top',
                                    iconCls: 'favorite_add_big',
                                    scale: 'large',
                                    text: 'Ajouter aux favoris'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
                            disabled: true,
                            hidden: true,
                            headerPosition: 'bottom',
                            title: 'Fichier',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    iconAlign: 'top',
                                    iconCls: 'application_down_big',
                                    scale: 'large',
                                    text: 'Exporter'
                                },
                                {
                                    xtype: 'button',
                                    ACL: 'write.ui.dam',
                                    iconAlign: 'top',
                                    iconCls: 'application_up_big',
                                    scale: 'large',
                                    text: 'Importer'
                                }
                            ]
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            RApplication: 'dam',
                            itemId: 'RHelpBtn',
                            iconCls: 'info_big',
                            scale: 'large',
                            text: ''
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 34,
                    id: 'DAMActiveFacetBox'
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    id: 'DAMLeftBox',
                    width: 240,
                    layout: {
                        type: 'card'
                    },
                    title: '',
                    items: [
                        {
                            xtype: 'panel',
                            id: 'DAMFacetBox',
                            overflowY: 'auto',
                            bodyPadding: '10 16 10 10',
                            title: '',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            id: 'DAMSearchField',
                                            fieldLabel: '',
                                            listeners: {
                                                specialkey: {
                                                    fn: me.onDAMSearchFieldSpecialkey,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'DAMSearchBtn',
                                            iconCls: 'search',
                                            text: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                collapseFirst: false,
                                activeOnTop: false,
                                type: 'accordion'
                            },
                            title: '',
                            items: [
                                {
                                    xtype: 'treepanel',
                                    localiserId: 'filePlanTreePanel',
                                    height: 250,
                                    id: 'mainDirectoriesTree',
                                    width: 400,
                                    title: 'File plan',
                                    store: 'DirectoriesStore',
                                    useArrows: true,
                                    viewConfig: {
                                        plugins: [
                                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                                ddGroup: 'DirectoriesDD'
                                            })
                                        ],
                                        listeners: {
                                            beforedrop: {
                                                fn: me.onTreeViewDragDropBeforeDrop,
                                                scope: me
                                            },
                                            drop: {
                                                fn: me.onTreeViewDragDropDrop,
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
                                                } else if (record.get("id")=="notFiled") {
                                                    record.data.allowDrag=false;
                                                    return(Rubedo.RubedoAutomatedElementsLoc.notFiledText);

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
                                                    fn: me.onCellEditingBeforeEdit,
                                                    scope: me
                                                },
                                                edit: {
                                                    fn: me.onCellEditingEdit,
                                                    scope: me
                                                }
                                            }
                                        })
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    localiserId: 'filtersPanel',
                                    autoScroll: true,
                                    title: 'Filters',
                                    forceFit: true,
                                    store: 'MediaTypesForDAM',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'typeColumn2',
                                            dataIndex: 'type',
                                            text: 'Type'
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    localiserId: 'applyFiltersBtn',
                                                    flex: 1,
                                                    id: 'DAMFolderViewFiltersBtn',
                                                    text: 'Apply filters'
                                                }
                                            ]
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    overflowY: 'auto',
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'DAMMainView',
                            id: 'DAMCenter',
                            store: 'DAMFacetteStore'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'DAMFacetteStore'
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onDAMMTGridRender,
                    scope: me
                },
                destroy: {
                    fn: me.onDAMInterfaceDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onImageRender11: function(component, eOpts) {
        component.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/images.png');
    },

    onDAMSwitchModeBtnRender: function(component, eOpts) {
        component.adaptToCurrentMode();
    },

    onDAMROBtnRender: function(component, eOpts) {
        if ((!ACL.interfaceRights["write.ui.dam"])&&(ACL.interfaceRights["read.ui.dam"])){
            component.show();
        }
    },

    onDAMSearchFieldSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            Ext.getCmp("DAMSearchBtn").fireEvent("click",Ext.getCmp("DAMSearchBtn"));
        }
    },

    onTreeViewDragDropBeforeDrop: function(node, data, overModel, dropPosition, dropHandler, eOpts) {

        if (!ACL.interfaceRights["write.ui.directories"]){
            return(false);
        }
        Ext.getStore("DirectoriesStore").suspendAutoSync();
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
                    Ext.getStore("DAMFolderViewStore").load();
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

    onTreeViewDragDropDrop: function(node, data, overModel, dropPosition, eOpts) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getStore("DirectoriesStore").resumeAutoSync();
            Ext.getStore("DirectoriesStore").sync();
        });
        task.delay(200);
    },

    onCellEditingBeforeEdit: function(editor, e, eOpts) {
        if ((!ACL.interfaceRights["write.ui.directories"])||(Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected().get("readOnly"))||(Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected().get("id")=="notFiled")||(Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected().isRoot())) {
            return false;
        }
    },

    onCellEditingEdit: function(editor, e, eOpts) {
        Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected().collapseChildren(true);
        Ext.getCmp("mainDirectoriesTree").getStore().load({"node":Ext.getCmp("mainDirectoriesTree").getSelectionModel().getLastSelected()});
    },

    onDAMMTGridRender: function(component, eOpts) {
        Ext.getStore("MediaTypesForDAM").load();
        Ext.getStore("TaxonomyForDAM").load();
        Ext.getStore("DAMFacetteStore").activeFacettes={ };
        Ext.getStore("DAMFacetteStore").load();
        Ext.getStore("DirectoriesStore").getProxy().extraParams.filter="[{\"property\":\"filePlan\",\"value\":\"default\"}]";
        Ext.getStore("DirectoriesStore").load();
        var task = new Ext.util.DelayedTask(function(){
            Ext.getCmp("DAMCenter").plugins[0].silenced=false;
            Ext.getCmp("DAMCenter").view.plugins[0].disable();
        });
        task.delay(200);
    },

    onDAMInterfaceDestroy: function(component, eOpts) {
        Ext.getStore("MediaTypesForDAM").removeAll();
        Ext.getStore("TaxonomyForDAM").removeAll();
        Ext.getStore("DAMFacetteStore").activeFacettes={ };
        Ext.getStore("DAMFacetteStore").removeAll();
        Ext.getStore("DirectoriesStore").getProxy().extraParams.filter="[{\"property\":\"filePlan\",\"value\":\"emptyDecoy\"}]";
        Ext.getStore("DirectoriesStore").load();
        Ext.getStore("DAMFolderViewStore").DAMTypeFilters=[ ];
        Ext.getStore("DAMFolderViewStore").directoryFilter="notFiled";
        Ext.getStore("DAMFolderViewStore").removeAll();
    }

});