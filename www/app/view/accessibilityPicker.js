/*
 * File: app/view/accessibilityPicker.js
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

Ext.define('Rubedo.view.accessibilityPicker', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accessibilityPicker',

    requires: [
        'Ext.form.FieldSet',
        'Ext.button.Button'
    ],

    height: 250,
    id: 'accessibilityPicker',
    width: 400,
    bodyPadding: 10,
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    localiserId: 'hcmodeFieldset',
                    padding: 10,
                    title: 'Mode contraste élevé',
                    items: [
                        {
                            xtype: 'button',
                            localiserId: 'hcmodeActivateBtn',
                            anchor: '100%',
                            id: 'highContrastButton',
                            text: 'Activer'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});