/*
 * File: app/view/DAMInterface.js
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

Ext.define('Rubedo.view.DAMInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.DAMInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Rubedo.view.DAMMainView'
    ],

    height: 651,
    id: 'DAMInterface',
    width: 1038,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'mediaTypes',
    title: 'Mèdiathéque',
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
                            ACL: 'write.ui.dam',
                            disabled: false,
                            id: 'addDAMBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.dam',
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
                            disabled: true,
                            id: 'DAMUpdateBtn',
                            iconAlign: 'top',
                            iconCls: 'pencil_big',
                            scale: 'large',
                            text: 'Editer'
                        },
                        {
                            xtype: 'buttongroup',
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
                            itemId: 'boutonAide',
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
                    id: 'DAMFacetBox',
                    width: 240,
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

    onImageRender11: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/images.png');
    },

    onDAMROBtnRender: function(abstractcomponent, options) {
        if ((!ACL.interfaceRights["write.ui.dam"])&&(ACL.interfaceRights["read.ui.dam"])){
            abstractcomponent.show();
        }
    },

    onDAMSearchFieldSpecialkey: function(field, e, options) {
        if (e.getKey() == e.ENTER) {
            Ext.getCmp("DAMSearchBtn").fireEvent("click",Ext.getCmp("DAMSearchBtn"));
        }
    },

    onDAMMTGridRender: function(abstractcomponent, options) {
        Ext.getStore("MediaTypesForDAM").load();
        Ext.getStore("TaxonomyForDAM").load();
        Ext.getStore("DAMFacetteStore").activeFacettes={ };
        Ext.getStore("DAMFacetteStore").load();
    },

    onDAMInterfaceDestroy: function(abstractcomponent, options) {
        Ext.getStore("MediaTypesForDAM").removeAll();
        Ext.getStore("TaxonomyForDAM").removeAll();
        Ext.getStore("DAMFacetteStore").activeFacettes={ };
        Ext.getStore("DAMFacetteStore").removeAll();
    }

});