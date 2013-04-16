/*
 * File: app/view/ImageFieldComponentSmall.js
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

Ext.define('Rubedo.view.ImageFieldComponentSmall', {
    extend: 'Ext.container.Container',
    alias: 'widget.ImageFieldComponentSmall',

    anchor: '90%',
    height: 52,
    margin: '0 0 10 0',
    width: 177,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',
                    width: 100,
                    text: 'My Label :'
                },
                {
                    xtype: 'container',
                    itemId: 'buttonHolder',
                    margin: '0 0 0 5',
                    width: 29,
                    layout: {
                        type: 'absolute'
                    },
                    items: [
                        {
                            xtype: 'button',
                            x: 0,
                            y: 0,
                            itemId: 'fieldChangeImage',
                            iconCls: 'edit',
                            text: '',
                            tooltip: 'Choisir un média'
                        },
                        {
                            xtype: 'button',
                            x: 0,
                            y: 30,
                            itemId: 'fieldClearImage',
                            iconCls: 'close',
                            text: '',
                            tooltip: 'Désélectionner'
                        }
                    ]
                },
                {
                    xtype: 'image',
                    height: 52,
                    itemId: 'fieldImagePreview',
                    listeners: {
                        render: {
                            fn: me.onFieldImagePreviewRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onFieldImagePreviewRender: function(component, eOpts) {
        component.getEl().on("load", function(){component.up().doLayout();});
    }

});