/*
 * File: app/view/MyGridPanel16.js
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

Ext.define('Rubedo.view.MyGridPanel16', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygridpanel16',

    requires: [
        'Rubedo.view.override.MyGridPanel16'
    ],

    managesStore: false,
    title: '',
    store: 'UsersAdminDataStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'name',
                    text: 'Nom',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'title',
                    text: 'Civilité',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'organisation',
                    text: 'Organisation',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'service',
                    text: 'Service',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'post',
                    text: 'Fonction',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'email',
                    text: 'E-mail',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'telephone',
                    text: 'Téléphone',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'mobile',
                    text: 'Mobile',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'coordinates',
                    text: 'Coordonnées',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'language',
                    text: 'Langue',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'country',
                    text: 'Pays',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'createTime',
                    text: 'Création',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'updateTime',
                    text: 'Mise à jour',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});