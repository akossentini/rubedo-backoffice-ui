/*
 * File: app/view/DAMMainView.js
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

Ext.define('Rubedo.view.DAMMainView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.DAMMainView',

    requires: [
        'Rubedo.view.override.DAMMainView',
        'Ext.ux.container.SwitchButtonSegment'
    ],

    title: '',
    forceFit: true,
    store: 'DAMStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                id: 'DAMImageDrop'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.get("readOnly")){
                            return("<i style=\"color:#777;\">"+value+"</i>");
                        } else {
                            return(value);
                        }
                    },
                    filter: true,
                    dataIndex: 'text',
                    text: 'Titre'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'author',
                    text: 'Auteur'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'lastUpdateTime',
                    text: 'Date de création',
                    format: 'd-m-Y'
                }
            ]
        });

        me.callParent(arguments);
    }

});