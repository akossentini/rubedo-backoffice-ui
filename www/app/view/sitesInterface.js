/*
 * File: app/view/sitesInterface.js
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

Ext.define('Rubedo.view.sitesInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.sitesInterface',

    requires: [
        'Rubedo.view.WorkspaceCombo',
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17'
    ],

    height: 449,
    id: 'sitesInterface',
    width: 753,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'referencement_icon',
    title: 'Sites',
    constrainHeader: true,
    maximizable: false,
    minimizable: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    height: 30,
                    itemId: 'breadcrumb',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'origine',
                            iconCls: 'referencement_icon',
                            text: 'Sites'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    height: 64,
                    items: [
                        {
                            xtype: 'button',
                            ACL: 'write.ui.sites',
                            id: 'siteAddBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.sites',
                            disabled: true,
                            id: 'siteRemoveBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.sites',
                            disabled: true,
                            id: 'updateSiteBtn',
                            iconAlign: 'top',
                            iconCls: 'floppy_disc_big',
                            scale: 'large',
                            text: 'Enregistrer'
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
                                '<b>{text}</b> </br> <b>Création : </b> {creation} <b>Dernière modification : </b> {derniereModification} <b>Auteur : </b> {createUser}  <b>Version : </b>{version}'
                            ]
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    managesStore: false,
                    id: 'mainSitesGrid',
                    width: 200,
                    title: '',
                    forceFit: true,
                    store: 'SitesJson',
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get("readOnly")) {
                                    return("<i style=\"color:#777;\">"+value+"</i>");
                                } else {
                                    return(value);
                                }
                            },
                            dataIndex: 'text',
                            text: 'Nom de domaine'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    flex: 1,
                    disabled: true,
                    id: 'mainSiteProps',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            title: 'Site',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'text',
                                    fieldLabel: 'Nom de domaine *',
                                    labelWidth: 110,
                                    allowBlank: false,
                                    regex: new RegExp(/^([a-z]|[1-9]|[-]|[.]){0,}$/)
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'alias',
                                    fieldLabel: 'Alias ',
                                    labelWidth: 110
                                },
                                {
                                    xtype: 'combobox',
                                    managesStore: true,
                                    anchor: '100%',
                                    name: 'theme',
                                    fieldLabel: 'Theme ',
                                    labelWidth: 110,
                                    displayField: 'label',
                                    store: 'SiteThemesStore',
                                    valueField: 'text'
                                },
                                {
                                    xtype: 'combobox',
                                    anchor: '100%',
                                    name: 'protocol',
                                    fieldLabel: 'Protocole *',
                                    labelWidth: 110,
                                    allowBlank: false,
                                    editable: false,
                                    forceSelection: true,
                                    multiSelect: true,
                                    store: [
                                        'HTTP',
                                        'HTTPS'
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    hidden: true,
                                    name: 'mainLanguage',
                                    fieldLabel: 'Langue principale '
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    hidden: true,
                                    name: 'languages',
                                    fieldLabel: 'Langues '
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    hidden: true,
                                    name: 'filter',
                                    fieldLabel: 'Filtre '
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'title',
                                    fieldLabel: 'Titre par défaut',
                                    labelWidth: 110
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    name: 'description',
                                    fieldLabel: 'Description par défaut',
                                    labelWidth: 110,
                                    maxLength: 250
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'author',
                                    value: 'Powered by Rubedo',
                                    fieldLabel: 'Auteur par défaut',
                                    labelWidth: 110
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    labelWidth: 110,
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                }
                            ],
                            listeners: {
                                render: {
                                    fn: me.onFieldsetRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'fieldset',
                            hidden: true,
                            collapsed: true,
                            collapsible: true,
                            title: 'Messagerie',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    name: 'activeMessagery',
                                    fieldLabel: 'Activé ',
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'SMTPServer',
                                    fieldLabel: 'Serveur SMTP '
                                },
                                {
                                    xtype: 'numberfield',
                                    anchor: '100%',
                                    name: 'SMTPPort',
                                    fieldLabel: 'Port SMTP ',
                                    allowDecimals: false,
                                    minValue: 0
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'SMTPLogin',
                                    fieldLabel: 'Login SMTP '
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    inputType: 'password',
                                    name: 'SMTPPassword',
                                    fieldLabel: 'Mot de passe SMTP '
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'defaultEmail',
                                    fieldLabel: 'E-mail par défaut ',
                                    vtype: 'email'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            hidden: true,
                            collapsed: true,
                            collapsible: true,
                            title: 'Accessibilité',
                            items: [
                                {
                                    xtype: 'combobox',
                                    anchor: '100%',
                                    name: 'accessibilityLevel',
                                    fieldLabel: 'Niveau d\'accessibilité ',
                                    store: [
                                        'RGAA A',
                                        'RGAA AA',
                                        'RGAA AAA'
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'opquastLogin',
                                    fieldLabel: 'Login Opquast '
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    inputType: 'password',
                                    name: 'opquastPassword',
                                    fieldLabel: 'Mot de passe Optquast '
                                }
                            ]
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ]
        });

        me.callParent(arguments);
    },

    onFieldsetRender: function(abstractcomponent, options) {
        var homePageSelector = Ext.create("Ext.ux.TreePicker", {
            store:Ext.getStore("PagePickerStore"),
            displayField:"text",
            labelWidth:110,
            fieldLabel:"Page d'accueil",
            id:"sitesHomePicker",
            anchor: "100%",
            name:"homePage"
        });
        var singlePageSelector = Ext.create("Ext.ux.TreePicker", {
            store:Ext.getStore("PagePickerStore"),
            displayField:"text",
            labelWidth:110,
            fieldLabel:"Page de détail par défaut",
            id:"sitesSinglePicker",
            anchor: "100%",
            name:"defaultSingle"
        });



        var tagPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:[],
            anchor:"100%",
            name:"keywords",
            labelWidth:110,
            fieldLabel:"Mots clés par défaut",
            multiSelect:true,
            forceSelection:false,
            createNewOnEnter:true,
            hideTrigger:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            pinList:false
        });
        abstractcomponent.add(tagPicker);
        abstractcomponent.add(homePageSelector);
        abstractcomponent.add(singlePageSelector);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/globe_computer.png');
    }

});