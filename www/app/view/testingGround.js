/*
 * File: app/view/testingGround.js
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

Ext.define('Rubedo.view.testingGround', {
    extend: 'Ext.window.Window',
    alias: 'widget.testingGround',

    requires: [
        'Rubedo.view.CKEField'
    ],

    height: 351,
    id: 'testingGround',
    width: 959,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Testing ground',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    autoScroll: true,
                    bodyPadding: 10,
                    title: 'My Panel',
                    items: [
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            inputId: 'ckTest1',
                            fieldLabel: 'Label'
                        },
                        {
                            xtype: 'CKEField',
                            anchor: '100%',
                            id: 'test11',
                            allowBlank: false
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});