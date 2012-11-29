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

    managesStore: false,
    title: '',
    store: 'UsersAdminDataStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    dataIndex: 'name',
                    flex: 1,
                    text: 'Nom'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'title',
                    flex: 1,
                    text: 'Civilité'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'organisation',
                    flex: 1,
                    text: 'Organisation'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'service',
                    flex: 1,
                    text: 'Service'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'post',
                    flex: 1,
                    text: 'Fonction'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'email',
                    flex: 1,
                    text: 'E-mail'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'telephone',
                    flex: 1,
                    text: 'Téléphone'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'mobile',
                    flex: 1,
                    text: 'Mobile'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'coordinates',
                    flex: 1,
                    text: 'Coordonnées'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'language',
                    flex: 1,
                    text: 'Langue'
                },
                {
                    xtype: 'gridcolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'country',
                    flex: 1,
                    text: 'Pays'
                },
                {
                    xtype: 'datecolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'createTime',
                    flex: 1,
                    text: 'Création'
                },
                {
                    xtype: 'datecolumn',
                    filter: true,
                    hidden: true,
                    dataIndex: 'updateTime',
                    flex: 1,
                    text: 'Mise à jour'
                }
            ]
        });

        me.callParent(arguments);
    }

});