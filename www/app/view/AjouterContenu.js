/*
 * File: app/view/AjouterContenu.js
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

Ext.define('Rubedo.view.AjouterContenu', {
    extend: 'Ext.window.Window',
    alias: 'widget.ajouterContenu',

    requires: [
        'Rubedo.view.WorkspaceCombo',
        'Rubedo.view.NestedContentsGrid',
        'Rubedo.view.MyTool17',
        'Ext.ux.TreePicker'
    ],

    floating: true,
    height: 500,
    id: 'ajouterContenu',
    width: 900,
    layout: {
        type: 'fit'
    },
    iconCls: 'content-icon',
    title: 'Nouveau Contenu',
    constrainHeader: true,
    maximizable: false,
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
                            isUpdate: false,
                            ACL: 'write.ui.contents.draft',
                            id: 'boutonEnregistrerNouveauContenu',
                            iconCls: 'save',
                            text: 'Brouillon'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.contents.pending',
                            id: 'boutonSoumettreNouveauContenu',
                            iconCls: 'save',
                            text: 'Soumettre'
                        },
                        {
                            xtype: 'button',
                            isUpdate: false,
                            ACL: 'write.ui.contents.published',
                            id: 'boutonPublierNouveauContenu',
                            iconCls: 'publish',
                            text: 'Publier'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'form',
                                    height: 101,
                                    id: 'boiteAChampsContenus',
                                    autoScroll: true,
                                    bodyPadding: 10,
                                    title: '',
                                    items: [
                                        {
                                            xtype: 'container',
                                            padding: 10,
                                            layout: {
                                                type: 'anchor'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '90%',
                                                    style: '{float:left}',
                                                    name: 'text',
                                                    fieldLabel: 'Titre *',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'helpBouton',
                                                    style: '{float:right;}',
                                                    handleMouseEvents: false,
                                                    iconCls: 'help',
                                                    pressedCls: 'x-btn',
                                                    text: '',
                                                    tooltip: 'Titre du contenu. Obligatoire.'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            padding: 10,
                                            layout: {
                                                type: 'anchor'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    anchor: '90%',
                                                    style: '{float:left}',
                                                    name: 'summary',
                                                    fieldLabel: 'Résumé *',
                                                    labelSeparator: ' '
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'helpBouton',
                                                    style: '{float:right;}',
                                                    handleMouseEvents: false,
                                                    iconCls: 'help',
                                                    pressedCls: 'x-btn',
                                                    text: '',
                                                    tooltip: 'Résumé facultatif du contenu.'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'contentMetadataBox',
                            bodyPadding: 10,
                            title: 'Métadonnées',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Publication',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            name: 'startPublicationDate',
                                            fieldLabel: 'Date de début de publication ',
                                            labelWidth: 200
                                        },
                                        {
                                            xtype: 'datefield',
                                            anchor: '100%',
                                            name: 'endPublicationDate',
                                            fieldLabel: 'Date de fin de publication ',
                                            labelWidth: 200
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'boiteATaxoContenus',
                            bodyPadding: 10,
                            title: 'Taxonomie'
                        },
                        {
                            xtype: 'form',
                            id: 'boiteADroitsContenus',
                            bodyPadding: 10,
                            title: 'Droits',
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    name: 'writeWorkspace',
                                    submitValue: true,
                                    anchor: '90%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    name: 'target',
                                    submitValue: true,
                                    fieldLabel: 'Cible',
                                    multiSelect: true,
                                    anchor: '90%'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            hidden: false,
                            id: 'contentsVersionPanel',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Versions',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    title: '',
                                    forceFit: true,
                                    store: 'VersioningStore',
                                    viewConfig: {

                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'text',
                                            text: 'Titre'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'publishVersion',
                                            text: 'Version',
                                            format: '0'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return(Ext.Date.format(new Date(value),"F j, Y, G:i"));
                                            },
                                            dataIndex: 'publishTime',
                                            text: 'Date de publication'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'publishUser',
                                            text: 'Auteur'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'nestedContentsTab',
                            layout: {
                                type: 'fit'
                            },
                            title: 'Contenus Imbriqués',
                            tabConfig: {
                                xtype: 'tab',
                                id: 'nestedContensTabConfig'
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    height: 54,
                                    items: [
                                        {
                                            xtype: 'buttongroup',
                                            height: 50,
                                            bodyPadding: 4,
                                            headerPosition: 'bottom',
                                            title: 'Ajouter un contenu imbriqué',
                                            columns: 2,
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'nestedContentsAddCombo',
                                                    fieldLabel: 'Type de contenu à ajouter ',
                                                    labelWidth: 160,
                                                    allowBlank: false,
                                                    editable: false,
                                                    displayField: 'type',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    store: 'DepContentsCombo',
                                                    typeAhead: true,
                                                    valueField: 'id'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'nestedContentsAddBtn',
                                                    margin: '0 0 0 10',
                                                    iconCls: 'add',
                                                    text: 'Ajouter'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'nestedContentsDeleteBtn',
                                            iconAlign: 'top',
                                            iconCls: 'remove_med',
                                            scale: 'medium',
                                            text: 'Supprimer'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'nestedContentsModifyBtn',
                                            iconAlign: 'top',
                                            iconCls: 'pencil_med',
                                            scale: 'medium',
                                            text: 'Modifier'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'nestedContentsOnlineBtn',
                                            iconAlign: 'top',
                                            iconCls: 'online_med',
                                            scale: 'medium',
                                            text: 'Mettre en ligne'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'nestedContentsOfflineBtn',
                                            iconAlign: 'top',
                                            iconCls: 'offline_med',
                                            scale: 'medium',
                                            text: 'Mettre hors  ligne'
                                        },
                                        {
                                            xtype: 'tbfill'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'info_big',
                                            scale: 'large',
                                            text: ''
                                        }
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'NestedContentsGrid'
                                }
                            ]
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'mytool17'
                }
            ]
        });

        me.callParent(arguments);
    }

});