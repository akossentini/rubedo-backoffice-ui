/*
 * File: app/view/ImagePreviewWindow.js
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

Ext.define('Rubedo.view.ImagePreviewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ImagePreviewWindow',

    minHeight: 100,
    minWidth: 100,
    autoScroll: true,
    resizable: false,
    iconCls: 'imageIco',
    title: 'Titre',
    constrain: false,
    constrainHeader: true,
    maximized: true,
    minimizable: false,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'image',
                    resizable: false,
                    src: '%20',
                    listeners: {
                        render: {
                            fn: me.onImageRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onImageRender: function(abstractcomponent, options) {
        abstractcomponent.getEl().on("load", function(){abstractcomponent.up().doLayout();});
    }

});