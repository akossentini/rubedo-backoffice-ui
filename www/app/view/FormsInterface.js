/*
 * File: app/view/FormsInterface.js
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

Ext.define('Rubedo.view.FormsInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormsInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Rubedo.view.FormsEditContainer',
        'Rubedo.view.WorkspaceCombo'
    ],

    favoriteIcon: 'note_edit.png',
    height: 627,
    id: 'FormsInterface',
    width: 1080,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    iconCls: 'form_small',
    title: 'Questionnaires',
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
                    dock: 'top',
                    height: 30,
                    itemId: 'breadcrumb',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'form_small',
                            text: 'Questionnaires'
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
                            ACL: 'write.ui.forms',
                            id: 'addFormBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.forms',
                            disabled: true,
                            id: 'removeFormBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer'
                        },
                        {
                            xtype: 'buttongroup',
                            ACL: 'write.ui.forms',
                            disabled: true,
                            id: 'formElementsEditBtnGroup',
                            headerPosition: 'bottom',
                            title: 'Edition',
                            columns: 5,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'formAddPageBtn',
                                    iconAlign: 'top',
                                    iconCls: 'page_add_big',
                                    scale: 'large',
                                    text: 'Nouvelle page',
                                    tooltip: 'Permet d\'ajouter une page dans un formulaire (gestion d\'étapes)'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'formElementAddBtn',
                                    iconAlign: 'top',
                                    iconCls: 'add_big',
                                    scale: 'large',
                                    text: 'Nouvel élément'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'formElementMoveUpBtn',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_up_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'formElementMoveDownBtn',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_down_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'formElementRemoveBtn',
                                    iconAlign: 'top',
                                    iconCls: 'remove_big',
                                    scale: 'large',
                                    text: 'Supprimer'
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
                                    ACL: 'write.ui.forms',
                                    id: 'formsDuplicateBtn',
                                    iconAlign: 'top',
                                    iconCls: 'applications_big',
                                    scale: 'large',
                                    text: 'Dupliquer'
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
                            ACL: 'write.ui.forms',
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
                                    ACL: 'write.ui.forms',
                                    id: 'formSaveBtn',
                                    iconAlign: 'top',
                                    iconCls: 'floppy_disc_big',
                                    scale: 'large',
                                    text: 'Enregistrer',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onSaveMTBtnAfterRender,
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
                            RApplication: 'forms',
                            itemId: 'RHelpBtn',
                            iconCls: 'info_big',
                            scale: 'large',
                            text: ''
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'formSelectedElementField',
                            fieldLabel: 'Label'
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
                        {
                            xtype: 'container',
                            itemId: 'boiteBarreMeta',
                            margin: '0 0 0 20',
                            tpl: [
                                '<b>{title}</b> </br> <b>Création : </b> {creation} <b>Dernière modification : </b> {derniereModification} <b>Auteur : </b> {createUser}  <b>Version : </b>{version}'
                            ]
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'mainFormsGrid',
                    width: 220,
                    resizable: true,
                    resizeHandles: 'e',
                    title: '',
                    forceFit: true,
                    store: 'FormsStore',
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get("readOnly")){
                                    return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/note_lock.png"> ' + "<i style=\"color:#777;\">"+value+"</i>");
                                }
                                return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/note.png"> ' + value);
                            },
                            dataIndex: 'title',
                            text: 'Titre'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    disabled: true,
                    id: 'FormsCenterZone',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'form',
                            id: 'formPropsForm',
                            autoScroll: true,
                            bodyPadding: 10,
                            iconCls: 'parametres',
                            title: 'Propriétés',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'title',
                                    fieldLabel: 'Titre du questionnaire',
                                    labelWidth: 160,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    name: 'description',
                                    fieldLabel: 'Descriptif',
                                    labelWidth: 160
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '10%',
                                    id: 'formUniqueAnswerCheck',
                                    style: '{float:left;}',
                                    name: 'uniqueAnswer',
                                    fieldLabel: 'Unicité de la réponse',
                                    labelWidth: 160,
                                    boxLabel: '',
                                    inputValue: 'true',
                                    uncheckedValue: 'false',
                                    listeners: {
                                        change: {
                                            fn: me.onFormUniqueAnswerCheckChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 20 0 20',
                                    style: '{float:left;}',
                                    allowDepress: false,
                                    enableToggle: true,
                                    handleMouseEvents: false,
                                    iconCls: 'help',
                                    pressed: true,
                                    pressedCls: 'x-btn',
                                    text: '',
                                    tooltip: 'L\'unicité a pour objectif de restreindre la soumission d\'un questionnaire'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '90%',
                                    hidden: true,
                                    id: 'formUniqueAnswerTextField',
                                    style: '{float:left;}',
                                    name: 'uniqueAnswerText',
                                    fieldLabel: 'Déjà répondu',
                                    labelWidth: 160
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'justAHelper11',
                                    style: '{float:right;}',
                                    iconCls: 'help',
                                    text: '',
                                    tooltip: 'Message affiché si l\'utilisateur a déjà répondu au questionnaire'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '90%',
                                    hidden: true,
                                    id: 'formUniqueAnswerNoCookie',
                                    style: '{float:left;}',
                                    name: 'noCookieMessage',
                                    fieldLabel: 'Pas de cookie',
                                    labelWidth: 160
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'justAHelper12',
                                    style: '{float:right;}',
                                    iconCls: 'help',
                                    text: '',
                                    tooltip: 'Message affiché si l\'utilisateur n\'a pas activé les cookies sur son navigateur'
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '50%',
                                    margin: '0 10 0 0',
                                    style: '{float:left; clear:both;}',
                                    name: 'openingDate',
                                    fieldLabel: 'Date de début ',
                                    labelWidth: 160
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '50%',
                                    style: '{float:right; }',
                                    name: 'closingDate',
                                    fieldLabel: 'Date de fin',
                                    labelWidth: 160
                                },
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    name: 'endMessage',
                                    fieldLabel: 'Message de fin',
                                    labelWidth: 160
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            floating: false,
                            id: 'FormsEditor',
                            autoScroll: false,
                            layout: {
                                type: 'fit'
                            },
                            iconCls: 'edit',
                            title: 'Edition',
                            items: [
                                {
                                    xtype: 'FormsEditContainer'
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'formRightsForm',
                            bodyPadding: 10,
                            iconCls: 'user',
                            title: 'Droits',
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    name: 'workspaces',
                                    fieldLabel: 'Espaces de travail',
                                    labelWidth: 120,
                                    multiSelect: true,
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '100%'
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'formStatsTab',
                            bodyPadding: 10,
                            iconCls: 'monitoring',
                            title: 'Exploitation',
                            tabConfig: {
                                xtype: 'tab',
                                tooltip: 'L\'exploitation des questionnaires permet d\'exporter les résultats dans le format csv'
                            },
                            listeners: {
                                activate: {
                                    fn: me.onFormStatsTabActivate,
                                    scope: me
                                }
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Statistiques',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            itemId: 'totalResults',
                                            name: 'totalResults',
                                            fieldLabel: 'Nombre de personnes ayant commencé le questionnaire',
                                            labelWidth: 360
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '50%',
                                            itemId: 'percentageField',
                                            style: '{float:right;}',
                                            name: 'percentageComplete',
                                            fieldLabel: ''
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '50%',
                                            itemId: 'validResults',
                                            name: 'validResults',
                                            fieldLabel: 'Nombre de personnes ayant terminé le questionnaire',
                                            labelWidth: 360
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Exportation',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'formsExportCSVBtn',
                                            iconCls: 'arrow_down',
                                            text: 'Exporter en CSV',
                                            listeners: {
                                                click: {
                                                    fn: me.onFormsExportCSVBtnClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onFormsInterfaceRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onFormsInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onSaveMTBtnAfterRender: function(abstractcomponent, options) {
        abstractcomponent.findParentByType("window").getEl().addKeyListener({key:"s", ctrl:true}, function(e,t){
        if (!abstractcomponent.disabled){
            abstractcomponent.fireEvent("click", abstractcomponent);
            t.stopEvent();
        }
    });
    },

    onImageRender1: function(abstractcomponent, options) {
        abstractcomponent.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/note_edit.png');
    },

    onFormUniqueAnswerCheckChange: function(field, newValue, oldValue, options) {
        if (newValue===true) {
            Ext.getCmp("formUniqueAnswerTextField").show();
            Ext.getCmp("formUniqueAnswerNoCookie").show();
            Ext.getCmp("justAHelper11").show();
            Ext.getCmp("justAHelper12").show();

        } else {
            Ext.getCmp("formUniqueAnswerTextField").hide();
            Ext.getCmp("formUniqueAnswerNoCookie").hide();
            Ext.getCmp("justAHelper11").hide();
            Ext.getCmp("justAHelper12").hide();
        }
    },

    onFormStatsTabActivate: function(abstractcomponent, options) {
        Ext.Ajax.request({
            url: 'forms/get-stats',
            params: {
                "form-id": Ext.getCmp("mainFormsGrid").getSelectionModel().getLastSelected().get("id")
            },
            success: function(response){
                var stats = Ext.JSON.decode(response.responseText);
                stats.data.percentageComplete="";
                if (stats.data.totalResults>0){
                    stats.data.percentageComplete=" ( "+(stats.data.validResults/stats.data.totalResults)*100+"% )";
                } 
                abstractcomponent.getForm().setValues(stats.data);
            }
        });
    },

    onFormsExportCSVBtnClick: function(button, e, options) {
        window.location="forms/get-csv?display-qnb=1&form-id="+Ext.getCmp("mainFormsGrid").getSelectionModel().getLastSelected().get("id");
    },

    onFormsInterfaceRender: function(abstractcomponent, options) {
        Ext.getStore("FormsStore").load();
    },

    onFormsInterfaceBeforeClose: function(panel, options) {
        Ext.getStore("FormsStore").removeAll();
    }

});