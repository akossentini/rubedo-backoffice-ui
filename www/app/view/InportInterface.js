/*
 * File: app/view/InportInterface.js
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

Ext.define('Rubedo.view.InportInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.InportInterface',

    requires: [
        'Rubedo.view.MyToolbar56',
        'Rubedo.view.WorkspaceCombo'
    ],

    localiserId: 'importMainWindow',
    height: 449,
    id: 'InportInterface',
    width: 712,
    layout: {
        type: 'card'
    },
    iconCls: 'database_up_small',
    title: 'Import',
    constrainHeader: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'mytoolbar56',
                    dock: 'bottom'
                }
            ],
            items: [
                {
                    xtype: 'form',
                    localiserId: 'importStage1Panel',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: 10,
                    title: 'Choix du fichier à importer',
                    timeout: 120,
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            layout: {
                                align: 'stretch',
                                padding: 1,
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 0.18,
                                    localiserId: 'importSeparatorField',
                                    fieldLabel: 'Séparateur',
                                    labelWidth: 60,
                                    name: 'separator',
                                    value: ';',
                                    allowBlank: false,
                                    listeners: {
                                        change: {
                                            fn: me.onTextfieldChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'filefield',
                                    extractFileInput: function() {
                                        var fileInput = Ext.getCmp("mainCSVinportField").fileInputEl.dom;
                                        return fileInput;
                                    },
                                    flex: 1,
                                    localiserId: 'importCSVFileField',
                                    id: 'mainCSVinportField',
                                    margin: '0 0 0 5',
                                    fieldLabel: 'Fichier CSV',
                                    labelWidth: 80,
                                    name: 'csvFile',
                                    allowBlank: false,
                                    buttonText: 'Choisir et analyser'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'importCSVFieldAuxilaryBtn',
                                    hidden: true,
                                    id: 'fileFieldHelper1',
                                    margin: '0 0 0 4',
                                    iconCls: 'close',
                                    text: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'mainCSVInportAnalyseContainer',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    localiserId: 'importStage1MainPanel',
                                    layout: {
                                        align: 'stretch',
                                        type: 'hbox'
                                    },
                                    title: 'Choisissez un fichier CSV pour afficher ses champs',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            title: '',
                                            forceFit: true,
                                            store: 'NotInportFieldsStore',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    localiserId: 'importIgnoredFieldsCol',
                                                    dataIndex: 'name',
                                                    text: 'Ne pas importer'
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false,
                                                plugins: [
                                                    Ext.create('Ext.grid.plugin.DragDrop', {

                                                    })
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            title: '',
                                            forceFit: true,
                                            store: 'InportAsFieldStore',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    localiserId: 'importImportAsFieldCol',
                                                    dataIndex: 'name',
                                                    text: 'Importer en tant que champ'
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false,
                                                plugins: [
                                                    Ext.create('Ext.grid.plugin.DragDrop', {

                                                    })
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            title: '',
                                            forceFit: true,
                                            store: 'InportAsTaxoStore',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    localiserId: 'importImportAsTaxoCol',
                                                    dataIndex: 'name',
                                                    text: 'Importer en tant que taxonomie'
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false,
                                                plugins: [
                                                    Ext.create('Ext.grid.plugin.DragDrop', {

                                                    })
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    localiserId: 'importStage2',
                    layout: {
                        type: 'fit'
                    },
                    title: 'Paramétrage des champs',
                    items: [
                        {
                            xtype: 'gridpanel',
                            title: '',
                            forceFit: true,
                            store: 'InportAsFieldStore',
                            viewConfig: {
                                markDirty: false,
                                plugins: [
                                    Ext.create('Ext.grid.plugin.DragDrop', {

                                    })
                                ]
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    localiserId: 'importS2NameColumn',
                                    dataIndex: 'name',
                                    text: 'Nom'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    localiserId: 'importS2NewnameCol',
                                    width: 130,
                                    dataIndex: 'newName',
                                    text: 'Nouveau nom (optionnel)',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    localiserId: 'importS2LabelCol',
                                    dataIndex: 'label',
                                    text: 'Libellé',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return(Ext.getStore("ImportableFieldTypesStore").findRecord("id", value).get("type"));
                                    },
                                    localiserId: 'importS2TypeCol',
                                    dataIndex: 'protoId',
                                    text: 'Type',
                                    editor: {
                                        xtype: 'combobox',
                                        allowBlank: false,
                                        editable: false,
                                        displayField: 'type',
                                        forceSelection: true,
                                        queryMode: 'local',
                                        store: 'ImportableFieldTypesStore',
                                        valueField: 'id'
                                    }
                                },
                                {
                                    xtype: 'booleancolumn',
                                    localiserId: 'importS2SearchableCol',
                                    dataIndex: 'searchable',
                                    text: 'Recherchable',
                                    falseText: 'Non',
                                    trueText: 'Oui',
                                    editor: {
                                        xtype: 'checkboxfield',
                                        inputValue: 'true',
                                        uncheckedValue: 'false'
                                    }
                                },
                                {
                                    xtype: 'booleancolumn',
                                    localiserId: 'importS2MandatoryCol',
                                    dataIndex: 'mandatory',
                                    text: 'Obligatoire',
                                    falseText: 'Non',
                                    trueText: 'Oui',
                                    editor: {
                                        xtype: 'checkboxfield',
                                        inputValue: 'true',
                                        uncheckedValue: 'false'
                                    }
                                }
                            ],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ]
                        },
                        {
                            xtype: 'hiddenfield',
                            isValid: function() {
                                var store=Ext.getStore("InportAsFieldStore");
                                if (store.query("protoId","text").length===0) {
                                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Rubedo.RubedoAutomatedElementsLoc.CTMustHaveTitleError);
                                    return(false);
                                } else if (store.query("protoId","text").length>1) {
                                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Rubedo.RubedoAutomatedElementsLoc.CTMustHaveOnlyOneTitleError);
                                    return(false);
                                } else if (store.query("protoId","summary").length>1) {
                                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Rubedo.RubedoAutomatedElementsLoc.CTMustHaveOnlyOneSummaryError);
                                    return(false);
                                }
                                else if (store.query("protoId","51234e09c0e0516a0b00000d").length>1) {
                                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Rubedo.RubedoAutomatedElementsLoc.CRMustHaveOnlyOneLocFieldError);
                                    return(false);
                                } else {
                                    return(true);
                                }
                            },
                            fieldLabel: 'Label'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    localiserId: 'importStage3',
                    title: 'Paramétrage de la taxonomie',
                    forceFit: true,
                    store: 'InportAsTaxoStore',
                    viewConfig: {
                        markDirty: false,
                        plugins: [
                            Ext.create('Ext.grid.plugin.DragDrop', {

                            })
                        ]
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'importS3NameCol',
                            dataIndex: 'name',
                            text: 'Nom'
                        },
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'importS3NewNameXol',
                            dataIndex: 'newName',
                            text: 'Nouveau nom (optionnel)',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'booleancolumn',
                            localiserId: 'importS3MandatoryCol',
                            dataIndex: 'mandatory',
                            text: 'Obligatoire',
                            falseText: 'Non',
                            trueText: 'Oui',
                            editor: {
                                xtype: 'checkboxfield',
                                inputValue: 'true',
                                uncheckedValue: 'false'
                            }
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ]
                },
                {
                    xtype: 'form',
                    localiserId: 'importFinalStage',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: 'Finalisation  et import',
                    items: [
                        {
                            xtype: 'fieldset',
                            localiserId: 'importS4Fielset1',
                            title: 'Paramètres du type de contenus',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    localiserId: 'nameField',
                                    fieldLabel: 'Nom',
                                    labelWidth: 165,
                                    name: 'ContentTypeType',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    fieldLabel: 'Espaces de travail',
                                    labelWidth: 165,
                                    name: 'ContentTypeWorkspaces',
                                    multiSelect: true,
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combobox',
                                    anchor: '100%',
                                    localiserId: 'workflowField',
                                    fieldLabel: 'Workflow',
                                    labelWidth: 165,
                                    name: 'ContentTypeWorkflow',
                                    value: 'Aucun',
                                    allowBlank: false,
                                    editable: false,
                                    forceSelection: true,
                                    store: [
                                        'Aucun',
                                        'Basique'
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            localiserId: 'importS4Fieldset2',
                            title: 'Paramètres des contenus',
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    localiserId: 'contributeWorkspaceField',
                                    fieldLabel: 'Contribution',
                                    labelWidth: 165,
                                    name: 'ContentsWriteWorkspace',
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    localiserId: 'difusionWorkspaceField',
                                    fieldLabel: 'Diffusion',
                                    labelWidth: 165,
                                    name: 'ContentsTarget',
                                    multiSelect: true,
                                    store: 'WorkspacesComboWithAll',
                                    anchor: '100%'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
                            localiserId: 'importBtn',
                            id: 'mainImportSubmitBtn',
                            scale: 'large',
                            text: 'Importer'
                        }
                    ]
                }
            ],
            listeners: {
                beforerender: {
                    fn: me.onInportInterfaceBeforeRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onInportInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        if (Ext.isEmpty(newValue)){
            field.addListener("blur", function(){
                if (Ext.isEmpty(field.getValue())){field.setValue(";");}
            }, this, {single:true});
            }
    },

    onInportInterfaceBeforeRender: function(component, eOpts) {
        Ext.getStore("NotInportFieldsStore").removeAll();
        Ext.getStore("InportAsFieldStore").removeAll();
        Ext.getStore("InportAsTaxoStore").removeAll();
    },

    onInportInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("NotInportFieldsStore").removeAll();
        Ext.getStore("InportAsFieldStore").removeAll();
        Ext.getStore("InportAsTaxoStore").removeAll();
    }

});