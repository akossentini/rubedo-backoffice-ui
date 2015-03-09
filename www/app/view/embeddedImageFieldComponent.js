/*
 * File: app/view/embeddedImageFieldComponent.js
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

Ext.define('Rubedo.view.embeddedImageFieldComponent', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.embeddedImageFieldComponent',

    requires: [
        'Ext.Img',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden'
    ],

    height: 120,
    maxWidth: 400,
    fieldLabel: 'Label',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'image',
                            height: 120,
                            itemId: 'fieldEmbedImagePreview',
                            width: 120
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        Ext.widget("B64ImageUploadWindow",{openerId:button.getId()}).show();
                                    },
                                    margin: '0 10 0 0',
                                    iconCls: 'database_up_small',
                                    text: '',
                                    tooltip: 'Upload image'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up().up().getComponent("imageCode").setValue(null);
                                    },
                                    margin: '0 10 0 0',
                                    iconCls: 'close',
                                    text: '',
                                    tooltip: 'Remove'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            maxWidth: 200,
                            title: 'Image options',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Alt',
                                    labelWidth: 40,
                                    name: 'alt',
                                    submitValue: false
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Url',
                                    labelWidth: 40,
                                    name: 'url',
                                    submitValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'imageCode',
                            fieldLabel: 'Label',
                            name: 'imageCode',
                            submitValue: false
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});