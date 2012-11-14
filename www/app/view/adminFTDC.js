/*
 * File: app/view/adminFTDC.js
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

Ext.define('Rubedo.view.adminFTDC', {
    extend: 'Ext.window.Window',
    alias: 'widget.adminFTDC',

    favoriteIcon: 'page_full.png',
    height: 578,
    id: 'adminFTDC',
    width: 1320,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'content-icon',
    title: 'Types de contenus',
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
                            itemId: 'origine',
                            iconCls: 'content-icon',
                            text: 'Types de contenus <b>></b> '
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
                                    fn: me.onImageRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'boiteBarreMeta',
                            tpl: [
                                '<b>{text}</b> </br> <b>Création : </b> {creation} <b>Dernière modification : </b> {derniereModification} <b>Auteur : </b> {auteur}  <b>Version : </b>{version}'
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
                            ACL: 'write.ui.contentTypes',
                            id: 'boutonNouveauTypeContenu',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.contentTypes',
                            disabled: true,
                            id: 'boutonSupprimerTypeContenu',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.contentTypes',
                            disabled: true,
                            headerPosition: 'bottom',
                            title: 'Edition',
                            columns: 4,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'boutonOuvrirFenetreTC',
                                    iconAlign: 'top',
                                    iconCls: 'add_big',
                                    scale: 'large',
                                    text: 'Nouveau champ'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'TCfieldUp',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_up_big',
                                    scale: 'large',
                                    text: 'Dèplacer'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'TCfieldDown',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_down_big',
                                    scale: 'large',
                                    text: 'Dèplacer'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'TCfieldDeleter',
                                    iconAlign: 'top',
                                    iconCls: 'remove_big',
                                    scale: 'large',
                                    text: 'Supprimer champ'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
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
                                    ACL: 'write.ui.contentTypes',
                                    id: 'boutonCopierTC',
                                    iconAlign: 'top',
                                    iconCls: 'applications_big',
                                    scale: 'large',
                                    text: 'Copier'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ajouterPanierTC',
                                    iconAlign: 'top',
                                    iconCls: 'shopping_cart_add_big',
                                    scale: 'large',
                                    text: 'Ajouter au panier'
                                },
                                {
                                    xtype: 'button',
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
                            ACL: 'write.ui.contentTypes',
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
                                    id: 'boutonEnregistrerTypeContenu',
                                    iconAlign: 'top',
                                    iconCls: 'floppy_disc_big',
                                    scale: 'large',
                                    text: 'Enregistrer'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
                            disabled: true,
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
                                    id: 'AdminfTCExporter',
                                    iconAlign: 'top',
                                    iconCls: 'application_down_big',
                                    scale: 'large',
                                    text: 'Exporter'
                                },
                                {
                                    xtype: 'button',
                                    ACL: 'write.ui.contentTypes',
                                    id: 'AdminfTCImporter',
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
                            itemId: 'boutonAide',
                            iconCls: 'info_big',
                            scale: 'large',
                            text: ''
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'AdminfTypesGrid',
                    width: 150,
                    title: '',
                    store: 'TypesContenusDataJson',
                    viewConfig: {
                        id: 'AdminfTypesGridView'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.data.dependant===false) {return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/page_full.png"> ' + value );}
                                else {return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/attach_document.png"> ' + value );}

                            },
                            width: 452,
                            dataIndex: 'type',
                            flex: 1,
                            text: 'Type',
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {

                    }),
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            ptype: 'cellediting'
                        })
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    id: 'tabPanTC',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            iconCls: 'edit',
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'conteneurChampsEditionTC',
                                    autoScroll: true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            frame: true,
                                            margin: 20,
                                            title: 'Champs obligatoires',
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
                                                            fieldLabel: 'Titre ',
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
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'form',
                                            frame: true,
                                            id: 'champsEditionTC',
                                            margin: 20,
                                            autoScroll: false,
                                            resizable: false,
                                            bodyPadding: 0,
                                            title: 'Champs éditables'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'form',
                                    frame: true,
                                    id: 'PaneauConfigChamps',
                                    width: 300,
                                    autoScroll: false,
                                    layout: {
                                        type: 'fit'
                                    },
                                    bodyPadding: 8,
                                    collapseDirection: 'right',
                                    collapsed: false,
                                    collapsible: true,
                                    iconCls: 'parametres',
                                    title: 'Propriétés',
                                    items: [
                                        {
                                            xtype: 'container',
                                            id: 'boiteConfigChampsTC',
                                            autoScroll: true,
                                            layout: {
                                                type: 'anchor'
                                            }
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'champTCIdField',
                                            fieldLabel: 'Label'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            iconCls: 'page_meta',
                            title: 'Métadonnées'
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            iconCls: 'page_taxonomy',
                            title: 'Taxonomie',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    autoRender: false,
                                    autoShow: false,
                                    id: 'vocabulairesTypesContenusGrid',
                                    title: 'Vocabulaires',
                                    store: 'TaxonomieDataJson',
                                    viewConfig: {
                                        autoRender: false
                                    },
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            flex: 1,
                                            text: 'Titre'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'description',
                                            flex: 3,
                                            text: 'Description'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'helpText',
                                            flex: 2,
                                            text: 'HelpText'
                                        },
                                        {
                                            xtype: 'booleancolumn',
                                            dataIndex: 'expandable',
                                            flex: 1,
                                            text: 'Etiquettes',
                                            falseText: 'non',
                                            trueText: 'oui'
                                        },
                                        {
                                            xtype: 'booleancolumn',
                                            dataIndex: 'mandatory',
                                            flex: 1,
                                            text: 'ChoixMultiple',
                                            falseText: 'non',
                                            trueText: 'oui'
                                        },
                                        {
                                            xtype: 'booleancolumn',
                                            dataIndex: 'mandatory',
                                            flex: 1,
                                            text: 'Obligatoire',
                                            falseText: 'non',
                                            trueText: 'oui'
                                        }
                                    ],
                                    listeners: {
                                        viewready: {
                                            fn: me.onVocabulairesTypesContenusGridViewReady,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            iconCls: 'user',
                            title: 'Droits'
                        },
                        {
                            xtype: 'panel',
                            iconCls: 'versions',
                            title: 'Historique'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_full.png');
    },

    onVocabulairesTypesContenusGridViewReady: function(tablepanel, options) {
        if (!ACL.interfaceRights["write.ui.contentTypes"]){
            tablepanel.getSelectionModel().setLocked(true);
        }
    }

});