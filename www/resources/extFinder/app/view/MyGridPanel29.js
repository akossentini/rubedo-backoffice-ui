/*
 * File: app/view/MyGridPanel29.js
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

Ext.define('extFinder.view.MyGridPanel29', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygridpanel29',

    requires: [
        'extFinder.view.override.MyGridPanel29',
        'Ext.ux.container.SwitchButtonSegment'
    ],

    managesStore: false,
    id: 'dragload',
    title: '',
    forceFit: true,
    store: 'ImagePickerStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                id: 'DAMImageDrop'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'filename',
                    text: 'Fichier'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return(value.fullName);
                    },
                    dataIndex: 'createUser',
                    text: 'Auteur'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'createTime',
                    text: 'Date de création',
                    format: 'd-m-Y'
                }
            ],
            listeners: {
                itemdblclick: {
                    fn: me.onImagesSpecialGridItemDblClick,
                    scope: me
                },
                selectionchange: {
                    fn: me.onImagesSpecialGridSelectionChange,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ACL: 'write.ui.medias',
                    dock: 'top',
                    height: 64,
                    hidden: true,
                    items: [
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'DAMmainImageDeleteBtn',
                            iconAlign: 'top',
                            iconCls: 'remove_big',
                            scale: 'large',
                            text: 'Supprimer',
                            listeners: {
                                click: {
                                    fn: me.onDAMmainImageDeleteBtnClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'ImagePickerChooseBtn',
                            icon: '../icones/blue/24x24/accept.png',
                            scale: 'medium',
                            text: 'Choisir',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onToolbarAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onImagesSpecialGridItemDblClick: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp("ImagePickerChooseBtn").fireEvent("click", Ext.getCmp("ImagePickerChooseBtn"));
    },

    onDAMmainImageDeleteBtnClick: function(button, e, options) {
        Ext.getCmp("dragload").getStore().remove(Ext.getCmp("imagesSpecialGrid").getSelectionModel().getSelection());
    },

    onImagesSpecialGridSelectionChange: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            Ext.getCmp("DAMmainImageDeleteBtn").disable();
            Ext.getCmp("ImagePickerChooseBtn").disable();
        } else {
            Ext.getCmp("DAMmainImageDeleteBtn").enable();
            Ext.getCmp("ImagePickerChooseBtn").enable();

        }
    },

    onButtonClick: function(button, e, options) {
        var myPrefix= "";
        if(window.opener.location.href.indexOf("backoffice")==-1){
            myPrefix= "backoffice/";
        }
        var fileURL="file/get/file-id/"+button.up().up().getSelectionModel().getLastSelected().get("id");
        window.opener.CKEDITOR.tools.callFunction( CKEOptions.CKEditorFuncNum, fileURL );
        window.close();
    },

    onToolbarAfterRender: function(abstractcomponent, options) {
        if (ACL["write.ui.medias"]){var contained = Ext.create("Ext.ux.upload.plugin.Window",{title:"Ajoutez des images",height:300,width:440});
        abstractcomponent.add(Ext.create('Ext.ux.upload.Button', {
            text: 'Uploader des images',
            iconCls:"arrow_up",
            hidden:true,
            //singleFile: true,

            plugins: [contained],

            uploader: 
            {
                url: '../../image/put?token='+ACL.CSRFToken,
                autoStart: false,
                max_file_size: '2mb',			
                drop_element: 'dragload',
                statusQueuedText: 'Pret à télécharger',
                statusUploadingText: 'Téléchargement ({0}%)',
                statusFailedText: '<span style="color: red">Erreur</span>',
                statusDoneText: '<span style="color: green">Fini</span>',

                statusInvalidSizeText: 'Fichier trop volumineux',
                statusInvalidExtensionText: 'Type de fichier invalide'
            },
            listeners: 
            {
                filesadded: function(uploader, files)								
                {
                    //console.log('filesadded');
                    return true;
                },

                beforeupload: function(uploader, file)								
                {
                    //console.log('beforeupload');			
                },

                fileuploaded: function(uploader, file)								
                {
                    //console.log('fileuploaded');
                },

                uploadcomplete: function(uploader, success, failed)								
                {
                    abstractcomponent.up().getStore().load();
                    contained.window.close();
                },
                scope: this
            }


        }));}
    }

});