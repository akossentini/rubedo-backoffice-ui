/*
 * File: app/view/DAMCreateUpdateWindow.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.view.DAMCreateUpdateWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.DAMCreateUpdateWindow',

    requires: [
        'Rubedo.view.MyTool17',
        'Rubedo.view.WorkspaceCombo',
        'Rubedo.view.DLSToolbar',
        'Ext.panel.Tool',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.ux.TreePicker'
    ],

    localiserId: 'newDamWindow',
    height: 518,
    id: 'DAMCreateUpdateWindow',
    minHeight: 220,
    width: 900,
    constrain: true,
    overflowY: 'auto',
    layout: 'card',
    constrainHeader: true,
    iconCls: 'mediaTypes',
    title: 'Nouveau média',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'mytool17'
                }
            ],
            items: [
                {
                    xtype: 'form',
                    id: 'DAMFieldBox',
                    itemId: 'mainLocItem',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'DAMMainFileFieldBox',
                                    padding: 10,
                                    width: 300,
                                    layout: 'anchor',
                                    listeners: {
                                        render: {
                                            fn: me.onContainerRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'DAMSEcondaryFieldsBox',
                                    margin: '10 0 0 20',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'container',
                                            anchor: '100%',
                                            padding: 10,
                                            layout: 'anchor',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    localiserId: 'damTitleField',
                                                    RTip: 'Titre du média. Obligatoire.',
                                                    anchor: '90%',
                                                    style: {
                                                        float: 'left'
                                                    },
                                                    fieldLabel: 'Titre *',
                                                    labelSeparator: ' ',
                                                    name: 'title',
                                                    allowBlank: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            padding: 10,
                                            layout: 'anchor',
                                            items: [
                                                {
                                                    xtype: 'filefield',
                                                    localiserId: 'damOrginalFileField',
                                                    RTip: 'Fichier principal du média. Obligatoire.',
                                                    anchor: '90%',
                                                    style: {
                                                        float: 'left'
                                                    },
                                                    fieldLabel: 'Fichier original *',
                                                    labelSeparator: ' ',
                                                    name: 'originalFileId',
                                                    allowBlank: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            localiserId: 'taxonomyFieldset',
                            id: 'DAMTaxoBox',
                            title: 'Taxonomie'
                        },
                        {
                            xtype: 'fieldset',
                            localiserId: 'workspacesFieldset',
                            title: 'Espaces de travail',
                            items: [
                                {
                                    xtype: 'WorkspaceCombo',
                                    localiserId: 'contributeWorkspaceField',
                                    fieldLabel: 'Contribution',
                                    name: 'writeWorkspace',
                                    store: 'ContributeWorkspacesCombo',
                                    anchor: '90%'
                                },
                                {
                                    xtype: 'WorkspaceCombo',
                                    localiserId: 'diffusionWorkspaceField',
                                    fieldLabel: 'Diffusion',
                                    name: 'target',
                                    multiSelect: true,
                                    store: 'WorkspacesComboWithAll',
                                    anchor: '90%'
                                }
                            ]
                        }
                    ]
                }
            ],
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
                            localiserId: 'damSubmitNewBtn',
                            id: 'DAMSubmitBtn',
                            iconCls: 'save',
                            text: 'Créer ce nouveau média'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'damSubmitUpdateBtn',
                            hidden: true,
                            id: 'DAMSubmitUpdateBtn',
                            iconCls: 'save',
                            text: 'Enregistrer les modifications'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'DAMSwitchEditBtn',
                            text: 'Passer en mode édition'
                        }
                    ]
                },
                {
                    xtype: 'DLSToolbar',
                    replicatorEntity: 'DAMReplicatorEntity',
                    specialContentsMode: true,
                    id: 'DAMDSLToolbar',
                    dock: 'top'
                }
            ]
        });

        me.callParent(arguments);
    },

    onContainerRender: function(component, eOpts) {
        if (Ext.isEmpty(Ext.getStore("MTForDAMEdit").getRange())){
            var leType=Ext.getCmp("DAMMTGrid").getSelectionModel().getLastSelected().get("mainFileType");
        } else {
            var leType=Ext.getStore("MTForDAMEdit").getRange()[0].get("mainFileType");
        }
        var mainField= Ext.create("Rubedo.view.GFSFileField", {
            name:"originalFileId",
            allowBlank:false,
            id:"DAMOriginalUpd",
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.originalFileMText,
            style:{"float":"left"},
            localiserId:"damOrginalLargeFileField",
            bigMode:true,
            fileType:leType
        });
        component.insert(0, mainField);
    }

});