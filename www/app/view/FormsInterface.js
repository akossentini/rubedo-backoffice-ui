/*
 * File: app/view/FormsInterface.js
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
    localiserId: 'formsWindow',
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
                            localiserId: 'addBtn',
                            id: 'addFormBtn',
                            iconAlign: 'top',
                            iconCls: 'add_big',
                            scale: 'large',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.forms',
                            localiserId: 'removeBtn',
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
                            localiserId: 'editGroup',
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
                                    localiserId: 'addPageBtn',
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
                                    localiserId: 'newElemBtn',
                                    disabled: true,
                                    id: 'formElementAddBtn',
                                    iconAlign: 'top',
                                    iconCls: 'add_big',
                                    scale: 'large',
                                    text: 'Nouvel élément'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'moveBtn',
                                    disabled: true,
                                    id: 'formElementMoveUpBtn',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_up_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'moveBtn',
                                    disabled: true,
                                    id: 'formElementMoveDownBtn',
                                    iconAlign: 'top',
                                    iconCls: 'arrow_down_big',
                                    scale: 'large',
                                    text: 'Déplacer'
                                },
                                {
                                    xtype: 'button',
                                    localiserId: 'removeBtn',
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
                            localiserId: 'clipboardGroup ',
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
                                    localiserId: 'duplicateBtn',
                                    id: 'formsDuplicateBtn',
                                    iconAlign: 'top',
                                    iconCls: 'applications_big',
                                    scale: 'large',
                                    text: 'Dupliquer'
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
                            ACL: 'write.ui.forms',
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
                                    ACL: 'write.ui.forms',
                                    localiserId: 'saveBtn',
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
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get("readOnly")){
                                    return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/note_lock.png"> ' + "<i style=\"color:#777;\">"+value+"</i>");
                                }
                                return('<img src="resources/icones/'+MyPrefData.iconsDir+'/16x16/note.png"> ' + value);
                            },
                            localiserId: 'titleColumn',
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
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'propsTab'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    localiserId: 'formTitleField',
                                    anchor: '100%',
                                    fieldLabel: 'Titre du questionnaire',
                                    labelWidth: 160,
                                    name: 'title',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textareafield',
                                    localiserId: 'descriptionField',
                                    anchor: '100%',
                                    fieldLabel: 'Descriptif',
                                    labelWidth: 160,
                                    name: 'description'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    localiserId: 'uniqueAnswerField',
                                    anchor: '10%',
                                    id: 'formUniqueAnswerCheck',
                                    style: '{float:left;}',
                                    fieldLabel: 'Unicité de la réponse',
                                    labelWidth: 160,
                                    name: 'uniqueAnswer',
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
                                    fieldLabel: 'Déjà répondu',
                                    labelWidth: 160,
                                    name: 'uniqueAnswerText'
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
                                    xtype: 'datefield',
                                    localiserId: 'openingDateField',
                                    anchor: '50%',
                                    margin: '0 10 0 0',
                                    style: '{float:left; clear:both;}',
                                    fieldLabel: 'Date de début ',
                                    labelWidth: 160,
                                    name: 'openingDate'
                                },
                                {
                                    xtype: 'datefield',
                                    localiserId: 'closingDateField',
                                    anchor: '50%',
                                    style: '{float:right; }',
                                    fieldLabel: 'Date de fin',
                                    labelWidth: 160,
                                    name: 'closingDate'
                                },
                                {
                                    xtype: 'textareafield',
                                    localiserId: 'endMessageField',
                                    anchor: '100%',
                                    fieldLabel: 'Message de fin',
                                    labelWidth: 160,
                                    name: 'endMessage'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'FormsEditor',
                            layout: {
                                type: 'fit'
                            },
                            iconCls: 'edit',
                            title: 'Edition',
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'editTab'
                            },
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
                            tabConfig: {
                                xtype: 'tab',
                                localiserId: 'rightsTab'
                            },
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    fieldLabel: 'Espaces de travail',
                                    labelWidth: 120,
                                    name: 'workspaces',
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
                                localiserId: 'exploitationField',
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
                                    localiserId: 'statsFieldSet',
                                    title: 'Statistiques',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            localiserId: 'totalResultFields',
                                            anchor: '100%',
                                            itemId: 'totalResults',
                                            fieldLabel: 'Nombre de personnes ayant commencé le questionnaire',
                                            labelWidth: 360,
                                            name: 'totalResults'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '50%',
                                            itemId: 'percentageField',
                                            style: '{float:right;}',
                                            fieldLabel: '',
                                            name: 'percentageComplete'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            localiserId: 'validResultField',
                                            anchor: '50%',
                                            itemId: 'validResults',
                                            fieldLabel: 'Nombre de personnes ayant terminé le questionnaire',
                                            labelWidth: 360,
                                            name: 'validResults'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    localiserId: 'resultsFieldSet',
                                    title: 'Résultats',
                                    items: [
                                        {
                                            xtype: 'button',
                                            localiserId: 'exportCSVBtn',
                                            id: 'formsExportCSVBtn',
                                            iconCls: 'arrow_down',
                                            text: 'Exporter en CSV'
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

    onSaveMTBtnAfterRender: function(component, eOpts) {
        component.findParentByType("window").getEl().addKeyListener({key:"s", ctrl:true}, function(e,t){
        if (!component.disabled){
            component.fireEvent("click", component);
            t.stopEvent();
        }
    });
    },

    onImageRender1: function(component, eOpts) {
        component.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/note_edit.png');
    },

    onFormUniqueAnswerCheckChange: function(field, newValue, oldValue, eOpts) {
        if (newValue===true) {
            Ext.getCmp("formUniqueAnswerTextField").show();
            Ext.getCmp("justAHelper11").show();

        } else {
            Ext.getCmp("formUniqueAnswerTextField").hide();
            Ext.getCmp("justAHelper11").hide();
        }
    },

    onFormStatsTabActivate: function(component, eOpts) {
        Ext.Ajax.request({
            url: 'forms/get-stats',
            params: {
                "form-id": Ext.getCmp("mainFormsGrid").getSelectionModel().getLastSelected().get("id")
            },
            success: function(response){
                var stats = Ext.JSON.decode(response.responseText);
                stats.data.percentageComplete="";
                if (stats.data.totalResults>0){
                    var myNum=(stats.data.validResults/stats.data.totalResults)*100;
                    stats.data.percentageComplete=" ( "+myNum.toPrecision(3)+"% )";
                } 
                component.getForm().setValues(stats.data);
            }
        });
    },

    onFormsInterfaceRender: function(component, eOpts) {
        Ext.getStore("FormsStore").load();
    },

    onFormsInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("FormsStore").removeAll();
    }

});