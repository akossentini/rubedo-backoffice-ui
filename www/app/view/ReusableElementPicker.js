/*
 * File: app/view/ReusableElementPicker.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
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

Ext.define('Rubedo.view.ReusableElementPicker', {
    extend: 'Ext.window.Window',
    alias: 'widget.ReusableElementPicker',

    height: 350,
    id: 'ReusableElementPicker',
    width: 600,
    resizable: false,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    title: 'Eléments réutilisables',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    managesStore: true,
                    flex: 0.5,
                    id: 'ReusableElementsGrid',
                    title: '',
                    store: 'ReusableElementsDataStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Nom',
                            flex: 1
                        }
                    ],
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: Ext.create('Ext.XTemplate', 
                                '{name:this.translator}',
                                {
                                    translator: function(name) {
                                        if (name=="row") {
                                            return("Lignes");
                                        } else if (name=="col") {
                                            return("Colonnes");
                                        } else { 
                                            return ("Blocs");
                                        }
                                    }
                                }
                            )
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
                                    disabled: true,
                                    id: 'resusableElementsDeleteBtn',
                                    iconCls: 'close',
                                    text: 'Supprimer',
                                    listeners: {
                                        click: {
                                            fn: me.onResusableElementsDeleteBtnClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    layout: {
                        align: 'center',
                        type: 'vbox'
                    },
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'reusableelementSimulation',
                            margin: '10 0 0 0',
                            width: 300
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'reusableelementDescription',
                            margin: '10 0 10 0',
                            styleHtmlContent: true,
                            tpl: [
                                '<h2>{name}</h2>',
                                '<p>{description}</p>'
                            ],
                            width: 350
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    id: 'REAddButton',
                                    iconCls: 'add',
                                    text: 'Ajouter'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onResusableElementsDeleteBtnClick: function(button, e, eOpts) {
        var fenetre = Ext.widget('delConfirmZ');
        fenetre.show();
        Ext.getCmp('delConfirmZOui').on('click', function() { 
            Ext.getCmp("ReusableElementsGrid").getStore().remove(Ext.getCmp("ReusableElementsGrid").getSelectionModel().getLastSelected());
            Ext.getCmp("resusableElementsDeleteBtn").disable();
            Ext.getCmp("reusableelementDescription").update(null);
            Ext.getCmp('delConfirmZ').close();

        }); 
    }

});