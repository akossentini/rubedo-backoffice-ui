/*
 * File: app/view/contributionPages.js
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

Ext.define('Rubedo.view.contributionPages', {
    extend: 'Ext.window.Window',
    alias: 'widget.contributionPages',

    requires: [
        'Rubedo.view.WorkspaceCombo',
        'Rubedo.view.DLSToolbar'
    ],

    favoriteIcon: 'application.png',
    ACL: 'read.ui.pages',
    localiserId: 'pageWindow',
    height: 578,
    id: 'contributionPages',
    width: 1200,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'masque-icon',
    title: 'Pages',
    constrainHeader: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 30,
                    itemId: 'filArianne',
                    items: [
                        {
                            xtype: 'button',
                            localiserId: 'pagesLaunchBtn',
                            itemId: 'origine',
                            iconCls: 'masque-icon',
                            text: 'Pages'
                        },
                        {
                            xtype: 'toolbar',
                            border: 0,
                            id: 'pageTreeBreadcrumb'
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
                            ACL: 'write.ui.pages',
                            localiserId: 'addBtn',
                            disabled: true,
                            id: 'addPageBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.pages',
                            localiserId: 'removeBtn',
                            disabled: true,
                            id: 'removePageBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.pages',
                            localiserId: 'editGroup',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Edition',
                            columns: 6,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    localiserId: 'newBlocBtn',
                                    disabled: true,
                                    id: 'newPageBloc',
                                    iconAlign: 'top',
                                    iconCls: 'window_add_big',
                                    scale: 'large',
                                    text: 'Nouveau Bloc'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'removeBtn',
                                    disabled: true,
                                    id: 'deletePageElement',
                                    iconAlign: 'top',
                                    iconCls: 'window_remove_big',
                                    scale: 'large',
                                    text: 'Supprimer'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'moveBtn',
                                    disabled: true,
                                    id: 'pageElementUp',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_up_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'moveBtn',
                                    disabled: true,
                                    id: 'pageElementDown',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_down_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
                            localiserId: 'clipboardGroup',
                            disabled: true,
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
                                    hidden: true,
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
                            ACL: 'write.ui.pages',
                            localiserId: 'saveGroup',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Sauvegarde',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    localiserId: 'saveBtn',
                                    id: 'pageSaveBtn',
                                    iconAlign: 'top',
                                    iconCls: 'floppy_disc_big',
                                    scale: 'large',
                                    text: 'Enregistrer',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPageSaveBtnAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            RApplication: 'pages',
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
                    dock: 'bottom',
                    height: 50,
                    itemId: 'barreMeta',
                    items: [
                        {
                            xtype: 'image',
                            height: 45,
                            width: 48,
                            listeners: {
                                render: {
                                    fn: me.onImageRender1,
                                    scope: me
                                }
                            }
                        },
                        me.processBoiteBarreMeta({
                            xtype: 'container',
                            flex: 2,
                            itemId: 'boiteBarreMeta',
                            margin: '0 0 0 10',
                            tpl: [
                                '<b>{text}</b> </br> <b>Création : </b> {creation} <b>Dernière modification : </b> {derniereModification} <b>Auteur : </b> {createUser}  <b>Version : </b>{version}'
                            ]
                        }),
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'slider',
                            localiserId: 'zoomLevelSlider',
                            id: 'MaskZoomControlSlider1',
                            width: 400,
                            fieldLabel: 'Niveau de zoom',
                            value: 277,
                            maxValue: 2000,
                            minValue: 200,
                            useTips: false,
                            listeners: {
                                change: {
                                    fn: me.onMaskZoomControlSliderChange1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'pageMaskDisplayBtn',
                            margin: '0 0 5 0',
                            text: 'Masque associé : '
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    id: 'mainPageTree',
                    width: 225,
                    resizable: true,
                    resizeHandles: 'e',
                    title: '',
                    forceFit: false,
                    store: 'PagesDataStore',
                    useArrows: true,
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                dragText: '{0} page{1} séléctionnée{1}'
                            })
                        ],
                        listeners: {
                            beforedrop: {
                                fn: me.onTreedragdroppluginBeforeDrop,
                                scope: me
                            },
                            drop: {
                                fn: me.onTreedragdroppluginDrop,
                                scope: me
                            }
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    managesStore: true,
                                    localiserId: 'siteField',
                                    flex: 1,
                                    id: 'pagesSitesCombo',
                                    fieldLabel: 'Site ',
                                    labelWidth: 40,
                                    editable: false,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'SitesComboPages',
                                    valueField: 'id'
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'treecolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.isRoot()){
                                    return("<i style=\"color:#777;\">"+Rubedo.RubedoAutomatedElementsLoc.rootText+"</i>");
                                }
                                else if (record.get("readOnly")) {
                                    record.data.allowDrop=false;
                                    record.data.allowDrag=false;
                                    return("<i style=\"color:#777;\">"+value+"</i>");

                                } else {
                                    return(value);
                                }
                            },
                            localiserId: 'nameColumn',
                            dataIndex: 'text',
                            text: 'Nom',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.isRoot()){return("");}
                                try{var myFlagCode=Ext.getStore("AllLanguagesStore3").query("locale",record.get("locale"),false,false,true).items[0].get("flagCode");}
                                catch(err){var myFlagCode="_unknown";}
                                var returner =" <img src=\"/assets/flags/16/"+myFlagCode+".png\"> ";
                                if(!Ext.isEmpty(value)){
                                    Ext.Object.each(value, function(key, value, myself) {
                                        if (key!=record.get("locale")){
                                            try{var myFlagCode2=Ext.getStore("AllLanguagesStore3").query("locale",key,false,false,true).items[0].get("flagCode");}
                                            catch(err){var myFlagCode2="_unknown";}
                                            returner=returner+" <img src=\"/assets/flags/16/"+myFlagCode2+".png\"> ";
                                        }
                                    });
                                }
                                return(returner);
                            },
                            dataIndex: 'i18n',
                            text: 'Languages',
                            flex: 0.5
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    id: 'pagesCenterTabBox',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            title: 'Edition',
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'editTab'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    autoScroll: true,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 600,
                                            id: 'mainPageEdition',
                                            layout: {
                                                align: 'stretch',
                                                type: 'vbox'
                                            },
                                            title: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    localiserId: 'propsPanel',
                                    width: 300,
                                    resizable: true,
                                    resizeHandles: 'w',
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    bodyPadding: 5,
                                    collapseDirection: 'right',
                                    collapsible: true,
                                    title: 'Propriétés',
                                    items: [
                                        {
                                            xtype: 'form',
                                            localiserId: 'selectElementPanel',
                                            flex: 1,
                                            id: 'pageElementPropsPanel',
                                            autoScroll: true,
                                            title: 'Sélectionnez un élément'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'pageElementIdField',
                                            fieldLabel: 'Label'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'pagesInternalPreview',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Aperçu',
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'overviewTab'
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    height: 24,
                                    items: [
                                        {
                                            xtype: 'tbtext',
                                            id: 'pagePreviewTextItem',
                                            text: ''
                                        },
                                        {
                                            xtype: 'tbfill'
                                        },
                                        {
                                            xtype: 'button',
                                            localiserId: 'refreshBtn',
                                            id: 'pagePreviewRefreshBtn',
                                            iconCls: 'refresh',
                                            text: 'Actualiser'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'PagesPropFormsHolder',
                            layout: {
                                type: 'card'
                            },
                            title: 'Propriétés',
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'propsTab'
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    id: 'mainPageAttributeForm',
                                    itemId: 'mainLocItem',
                                    autoScroll: true,
                                    bodyPadding: 10,
                                    header: false,
                                    title: 'Propriétés',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            localiserId: 'nameField',
                                            anchor: '100%',
                                            fieldLabel: 'Nom *',
                                            name: 'text',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            localiserId: 'urlField',
                                            anchor: '100%',
                                            fieldLabel: 'URL ',
                                            name: 'pageURL'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            localiserId: 'excludeFromMenuField',
                                            anchor: '100%',
                                            fieldLabel: 'Hors navigation',
                                            name: 'excludeFromMenu',
                                            boxLabel: '',
                                            inputValue: 'true'
                                        },
                                        {
                                            xtype: 'WorkspaceCombo',
                                            store: 'ContributeWorkspacesCombo',
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            localiserId: 'inheritWorkspaceField',
                                            anchor: '100%',
                                            fieldLabel: 'Hérite de l\'espace de travail',
                                            name: 'inheritWorkspace',
                                            boxLabel: '',
                                            inputValue: 'true',
                                            listeners: {
                                                change: {
                                                    fn: me.onCheckboxfieldChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            localiserId: 'referencingFieldSEt',
                                            title: 'Référencement',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    localiserId: 'titleField',
                                                    anchor: '100%',
                                                    fieldLabel: 'Titre *',
                                                    name: 'title',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    localiserId: 'descriptionField',
                                                    anchor: '100%',
                                                    fieldLabel: 'Description ',
                                                    name: 'description',
                                                    maxLength: 250
                                                }
                                            ],
                                            listeners: {
                                                render: {
                                                    fn: me.onMainPageAttributeFormRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'DLSToolbar',
                                    replicatorEntity: 'pagesLocProps',
                                    id: 'pagesDLSToolbar',
                                    dock: 'top'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'pageContentDisplayer',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Contenus affichés',
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'displayedContentTab'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'pageContentGrid',
                                    title: '',
                                    forceFit: true,
                                    store: 'PageDisplayedContentsStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            localiserId: 'titleColumn',
                                            dataIndex: 'text',
                                            text: 'Titre'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onPagesCenterTabBoxAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    processBoiteBarreMeta: function(config) {
        config.tpl=[
        '<b>{text}</b> </br> <b>'+Rubedo.RubedoAutomatedElementsLoc.creationText+' : </b> {creation} <b>'+Rubedo.RubedoAutomatedElementsLoc.lastUpdateText+' : </b> {derniereModification} <b>'+Rubedo.RubedoAutomatedElementsLoc.authorText+' : </b> {createUser}  <b>'+Rubedo.RubedoAutomatedElementsLoc.versionText+' : </b>{version}'
        ];
        return config;
    },

    onPageSaveBtnAfterRender: function(component, eOpts) {
        component.findParentByType("window").getEl().addKeyListener({key:"s", ctrl:true}, function(e,t){
        if (!component.disabled){
            component.fireEvent("click", component);
            t.stopEvent();
        }
    });
    },

    onTreedragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropHandler, eOpts) {

        if (!ACL.interfaceRights["write.ui.pages"]){
            return(false);
        }
        Ext.getStore("PagesDataStore").suspendAutoSync();
        var movedOne=data.records[0];
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

    onTreedragdroppluginDrop: function(node, data, overModel, dropPosition, eOpts) {
        var task= new Ext.util.DelayedTask(function(){
            Ext.getStore("PagesDataStore").resumeAutoSync();
            Ext.getStore("PagesDataStore").sync();
        });
        task.delay(200);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if (newValue) {
            var task = new Ext.util.DelayedTask(function(){
                field.previousSibling().setReadOnly(true);
                field.previousSibling().setValue(null);
            });
            task.delay(100);

        }else {
            field.previousSibling().setReadOnly(false);
        }
    },

    onMainPageAttributeFormRender: function(component, eOpts) {
        var tagPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:[],
            anchor:"100%",
            name:"keywords",
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.keywordsText,
            localiserId:"keywordsField",
            multiSelect:true,
            forceSelection:false,
            createNewOnEnter:true,
            hideTrigger:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            pinList:false
        });
        component.add(tagPicker);
    },

    onPagesCenterTabBoxAfterRender: function(component, eOpts) {
        component.setActiveTab(2);
        component.setActiveTab(0);
    },

    onImageRender1: function(component, eOpts) {
        component.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/application.png');
    },

    onMaskZoomControlSliderChange1: function(slider, newValue, thumb, eOpts) {
        Ext.getCmp("mainPageEdition").setHeight(newValue);
    }

});