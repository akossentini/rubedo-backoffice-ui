/*
 * File: app/view/PersoPicUploadWindow.js
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

Ext.define('Rubedo.view.PersoPicUploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.PersoPicUploadWindow',

    height: 102,
    width: 400,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Uploader une image',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'filefield',
                            anchor: '100%',
                            fieldLabel: 'Fichier',
                            name: 'file',
                            allowBlank: false,
                            buttonText: 'Choisir'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                button.up().setLoading(true);
                                var me=this;
                                var form=button.up().getForm();
                                form.submit({
                                    clientValidation: true,
                                    url: 'file/put',
                                    params: { 

                                    },
                                    success: function(form, action) {
                                        button.up().setLoading(false);
                                        if (button.up().up().userMode){
                                            Ext.getStore("CurrentUserDataStore").getRange()[0].set("photo", action.result.data.id);
                                            Ext.getCmp("userProfilePicture").setSrc("image/get?file-id="+action.result.data.id);
                                        } else {
                                            Ext.getCmp("userAdminGrid").getSelectionModel().getLastSelected().set("photo", action.result.data.id);
                                            Ext.getCmp("userAdminProfilePicture").setSrc("image/get?file-id="+action.result.data.id);
                                        }
                                        button.up().up().close();
                                    },
                                    failure: function(form, action) {
                                        button.up().setLoading(false);
                                        switch (action.failureType) {
                                            case Ext.form.action.Action.CLIENT_INVALID:
                                            Ext.Msg.alert('Erreur', 'Certains champs sont invalides');
                                            break;
                                            case Ext.form.action.Action.CONNECT_FAILURE:
                                            Ext.Msg.alert('Erreur', 'Erreur Ajax');
                                            break;
                                            case Ext.form.action.Action.SERVER_INVALID:
                                            Ext.Msg.alert('Erreur', action.result.msg);
                                        }
                                    }
                                });

                            },
                            anchor: '50%',
                            margin: '0 10 0 0',
                            iconCls: 'ouiSpetit',
                            text: 'Valider'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                button.up().up().close();
                            },
                            anchor: '50%',
                            margin: '0 0 0 10',
                            iconCls: 'close',
                            text: 'Annuler'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});