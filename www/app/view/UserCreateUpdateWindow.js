/*
 * File: app/view/UserCreateUpdateWindow.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
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

Ext.define('Rubedo.view.UserCreateUpdateWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.UserCreateUpdateWindow',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Text'
    ],

    height: 464,
    id: 'UserCreateUpdateWindow',
    width: 809,
    layout: 'fit',
    constrainHeader: true,
    iconCls: 'user_edit',
    title: 'My Window',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            ACL: 'write.ui.users',
                            localiserId: 'saveBtn',
                            id: 'userCUSaveBtn',
                            iconCls: 'save',
                            text: 'Save'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'form',
                            localiserId: 'ucuFieldsTab',
                            id: 'userCUFields',
                            autoScroll: true,
                            bodyPadding: 10,
                            title: 'Fields',
                            items: [
                                {
                                    xtype: 'container',
                                    padding: 10,
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            localiserId: 'UTEmailField',
                                            RTip: 'User email. Mandatory.',
                                            anchor: '100%',
                                            fieldLabel: 'E-mail *',
                                            name: 'email',
                                            allowBlank: false,
                                            vtype: 'email'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    padding: 10,
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            localiserId: 'UTNameField',
                                            RTip: 'User name. Mandatory.',
                                            anchor: '100%',
                                            fieldLabel: 'Name *',
                                            name: 'name',
                                            allowBlank: false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            localiserId: 'taxoTab',
                            id: 'userCUTaxonomy',
                            bodyPadding: 10,
                            title: 'Taxonomy'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});