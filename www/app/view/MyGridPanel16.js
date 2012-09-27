/*
 * File: app/view/MyGridPanel16.js
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

Ext.define('Rubedo.view.MyGridPanel16', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygridpanel16',

    requires: [
        'Rubedo.view.override.MyGridPanel16'
    ],

    title: '',
    store: 'UsersDataStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'name',
                    flex: 1,
                    text: 'Nom',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'email',
                    flex: 1,
                    text: 'Email',
                    editor: {
                        xtype: 'textfield',
                        vtype: 'email'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'telephone',
                    flex: 1,
                    text: 'Téléphone',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'adress',
                    flex: 1,
                    text: 'Adresse',
                    editor: {
                        xtype: 'textareafield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'position',
                    flex: 1,
                    text: 'Poste',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'department',
                    flex: 1,
                    text: 'Département',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'groups',
                    flex: 1,
                    text: 'Groupes'
                },
                {
                    xtype: 'datecolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'creationDate',
                    flex: 1,
                    text: 'Création'
                },
                {
                    xtype: 'datecolumn',
                    hidden: true,
                    dataIndex: 'lastUpdate',
                    flex: 1,
                    text: 'Dernière Modification'
                }
            ],
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting'
                })
            ]
        });

        me.callParent(arguments);
    }

});