/*
 * File: app/view/InportInterface.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
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

    height: 449,
    id: 'InportInterface',
    width: 712,
    layout: {
        type: 'card'
    },
    iconCls: 'database_up_small',
    title: 'Importation',

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
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: 10,
                    title: 'Choix du fichier à importer',
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
                    xtype: 'gridpanel',
                    title: 'Paramètrage des champs',
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
                            dataIndex: 'name',
                            text: 'Nom'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'newName',
                            text: 'Nouveau nom (optionel)',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'label',
                            text: 'Libellé',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return(Ext.getStore("TypesChampsDataStore").findRecord("id", value).get("type"));
                            },
                            dataIndex: 'protoId',
                            text: 'Type',
                            editor: {
                                xtype: 'combobox',
                                allowBlank: false,
                                editable: false,
                                displayField: 'type',
                                forceSelection: true,
                                queryMode: 'local',
                                store: 'TypesChampsDataStore',
                                valueField: 'id'
                            }
                        },
                        {
                            xtype: 'booleancolumn',
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
                    xtype: 'gridpanel',
                    title: 'Paramètrage de la taxonomie',
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
                            dataIndex: 'name',
                            text: 'Nom'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'newName',
                            text: 'Nouveau nom (optionel)',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'booleancolumn',
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
                    autoScroll: true,
                    bodyPadding: 10,
                    title: 'Finalisation  et importation',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Paramètres du tye de contenus',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
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
                            title: 'Paramètres des contenus',
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    fieldLabel: 'Contribution',
                                    labelWidth: 165,
                                    name: 'ContentsWriteWorkspace',
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    fieldLabel: 'Diffusion',
                                    labelWidth: 165,
                                    name: 'ContentsTarget',
                                    multiSelect: true,
                                    store: 'WorkspacesComboWithAll',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Date de début de publication ',
                                    labelWidth: 165,
                                    name: 'ContentsStartPublicationDate'
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Date de fin de publication ',
                                    labelWidth: 165,
                                    name: 'ContentsEndPublicationDate'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
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