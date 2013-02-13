/*
 * File: app/view/menuPrincipalInterface.js
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

Ext.define('Rubedo.view.menuPrincipalInterface', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuPrincipalInterface',

    border: 0,
    floating: true,
    frame: false,
    height: 300,
    id: 'menuPrincipalInterface',
    width: 350,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    bodyBorder: false,
    bodyPadding: 0,
    frameHeader: false,
    iconCls: 'meUser',
    overlapHeader: false,
    title: 'Alexandru Dobre',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    id: 'salamanderBox',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            height: 10,
                            hidden: false,
                            id: 'salamanderContext',
                            width: 220,
                            layout: {
                                type: 'absolute'
                            },
                            items: [
                                {
                                    xtype: 'menu',
                                    x: 0,
                                    y: 0,
                                    floating: false,
                                    frame: true,
                                    hidden: false,
                                    id: 'salamanderStudioMenu',
                                    width: 218,
                                    items: [
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.sites',
                                            favoriteIcon: 'globe_computer.png',
                                            itemId: 'sitesInterface',
                                            iconCls: 'referencement_icon',
                                            text: 'Sites'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.masks',
                                            favoriteIcon: 'application.png',
                                            itemId: 'adminFMDP',
                                            iconCls: 'masque-icon',
                                            text: 'Masques de page'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.contentTypes',
                                            favoriteIcon: 'page_full.png',
                                            itemId: 'adminFTDC',
                                            iconCls: 'content-icon',
                                            text: 'Types de contenus'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.damTypes',
                                            favoriteIcon: 'images.png',
                                            itemId: 'mediaTypesInterface',
                                            iconCls: 'mediaTypes',
                                            text: 'Types de médias'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'menu',
                                    x: 0,
                                    y: 0,
                                    floating: false,
                                    frame: true,
                                    hidden: false,
                                    id: 'salamanderAdminMenu',
                                    width: 218,
                                    plain: false,
                                    items: [
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.queries',
                                            favoriteIcon: 'database_search.png',
                                            itemId: 'queryManagerInterface',
                                            iconCls: 'database_search',
                                            text: 'Requêtes'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.taxonomy',
                                            favoriteIcon: 'tag.png',
                                            itemId: 'adminFTaxonomie',
                                            iconCls: 'page_taxonomy',
                                            text: 'Taxonomie'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.groups',
                                            favoriteIcon: 'users.png',
                                            itemId: 'adminFUtilisateurs',
                                            iconCls: 'user',
                                            text: 'Groupes'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.workspaces',
                                            favoriteIcon: 'users.png',
                                            itemId: 'WorkspacesInterface',
                                            iconCls: 'user',
                                            text: 'Workspaces'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.users',
                                            favoriteIcon: 'user_edit.png',
                                            floating: false,
                                            itemId: 'UserAdminWindow',
                                            iconCls: 'user_edit',
                                            text: 'Utilisateurs'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.technicalDashboard',
                                            favoriteIcon: 'chart.png',
                                            itemId: 'monitoringTools',
                                            iconCls: 'monitoring',
                                            text: 'Supervision'
                                        },
                                        {
                                            xtype: 'button',
                                            ACL: 'read.ui.workflows',
                                            favoriteIcon: 'processes.png',
                                            itemId: 'menuWorkflows',
                                            iconCls: 'process-icon',
                                            text: 'Workflows'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                render: {
                                    fn: me.onSalamanderContextRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'image',
                            height: 239,
                            id: 'salamanderLogo',
                            width: 210,
                            src: 'resources/images/logoBkg.png'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'left',
                    id: 'menuPrincipalDroite',
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'read.ui.pages',
                            favoriteIcon: 'application.png',
                            itemId: 'contributionPages',
                            iconCls: 'site-icon',
                            text: 'Pages'
                        },
                        {
                            xtype: 'button',
                            ACL: 'read.ui.pages',
                            favoriteIcon: 'computer.png',
                            itemId: 'contributionPrevisualisation',
                            iconCls: 'personalize',
                            text: 'Prévisualisation'
                        },
                        {
                            xtype: 'button',
                            ACL: 'read.ui.contents',
                            favoriteIcon: 'page_full.png',
                            itemId: 'contributionContenus',
                            iconCls: 'content-icon',
                            text: 'Contenus'
                        },
                        {
                            xtype: 'button',
                            ACL: 'read.ui.dam',
                            favoriteIcon: 'images.png',
                            itemId: 'DAMInterface',
                            iconCls: 'mediaTypes',
                            text: 'Médiathèque'
                        },
                        {
                            xtype: 'tbseparator',
                            ACL: 'read.ui.contents'
                        },
                        {
                            xtype: 'button',
                            usesMenu: true,
                            usedMenu: 'salamanderStudioMenu',
                            iconCls: 'applications',
                            text: 'Studio',
                            listeners: {
                                render: {
                                    fn: me.onButtonRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            usesMenu: true,
                            usedMenu: 'salamanderAdminMenu',
                            iconCls: 'process-icon',
                            text: 'Administration',
                            listeners: {
                                render: {
                                    fn: me.onButtonRender1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            favoriteIcon: 'tools.png',
                            itemId: 'userSettings',
                            iconCls: 'parametres',
                            text: 'Paramètres'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'deconnexionMenuPrincipal',
                            iconCls: 'deconecter',
                            text: 'Déconnexion'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onSalamanderContextRender: function(abstractcomponent, options) {
        Ext.Array.forEach(abstractcomponent.query("menu"), function(thing){thing.hide();});
    },

    onButtonRender: function(abstractcomponent, options) {
        if ((!ACL.interfaceRights["read.ui.sites"])&&(!ACL.interfaceRights["read.ui.masks"])&&(!ACL.interfaceRights["read.ui.contentTypes"])&&(!ACL.interfaceRights["read.ui.damTypes"])){
            abstractcomponent.hide();
        }
    },

    onButtonRender1: function(abstractcomponent, options) {
        if ((!ACL.interfaceRights["read.ui.queries"])&&(!ACL.interfaceRights["read.ui.taxonomy"])&&(!ACL.interfaceRights["read.ui.groups"])&&(!ACL.interfaceRights["read.ui.workspaces"])&&(!ACL.interfaceRights["read.ui.users"])&&(!ACL.interfaceRights["read.ui.technicalDashboard"])&&(!ACL.interfaceRights["read.ui.workflows"])){
            abstractcomponent.hide();
        }
    }

});