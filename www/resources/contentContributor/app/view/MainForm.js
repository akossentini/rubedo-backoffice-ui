/*
 * File: resources/contentContributor/app/view/MainForm.js
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

Ext.define('ContentContributor.view.MainForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.MainForm',

    border: 0,
    id: 'MainForm',
    overflowY: 'auto',
    bodyPadding: 20,
    title: 'Nouveau Contenu',
    titleAlign: 'center',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ACL: 'write.ui.contents',
                    dock: 'bottom',
                    border: 0,
                    style: '{background:#fff !important;}',
                    items: [
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            ACL: 'write.ui.contents.published',
                            cStatus: 'published',
                            localiserId: 'publishBtn',
                            id: 'mainPublishBtn',
                            icon: 'resources/icones/blue/24x24/floppy_disc_accept.png',
                            scale: 'medium',
                            text: 'Publier'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 20
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                window.parent.destroyModal("add-content-window");
                            },
                            localiserId: 'cancelBtn',
                            icon: 'resources/icones/blue/24x24/remove.png',
                            scale: 'medium',
                            text: 'Annuler'
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        }
                    ]
                }
            ],
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
                            localiserId: 'contentTitleField',
                            anchor: '90%',
                            style: '{float:left}',
                            fieldLabel: 'Titre ',
                            labelSeparator: ' *',
                            name: 'text',
                            allowBlank: false
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
                            localiserId: 'summaryField',
                            anchor: '90%',
                            style: '{float:left}',
                            fieldLabel: 'Résumé',
                            labelSeparator: ' ',
                            name: 'summary'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});