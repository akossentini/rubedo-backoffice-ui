/*
 * File: app/view/themePicker.js
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

Ext.define('Rubedo.view.themePicker', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.themePicker',

    requires: [
        'Ext.Img',
        'Ext.button.Button'
    ],

    id: 'themePicker',
    layout: 'anchor',
    bodyPadding: 20,
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'image',
                    anchor: '100%'
                },
                {
                    xtype: 'button',
                    localiserId: 'themePickerBtn',
                    anchor: '100%',
                    id: 'themePickerButton',
                    margin: '10 0 0 0',
                    text: 'Appliquer ce thème'
                }
            ]
        });

        me.callParent(arguments);
    }

});