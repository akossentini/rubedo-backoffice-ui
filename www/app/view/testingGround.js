/*
 * File: app/view/testingGround.js
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

Ext.define('Rubedo.view.testingGround', {
    extend: 'Ext.window.Window',
    alias: 'widget.testingGround',

    height: 450,
    id: 'testingGround',
    width: 959,
    layout: {
        type: 'fit'
    },
    title: 'Testing ground',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: 'My Form',
                    listeners: {
                        afterrender: {
                            fn: me.onFormAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onFormAfterRender: function(component, eOpts) {
        var homePageSelector = Ext.create("Ext.ux.TreeMultiPicker", {
            store:Ext.getStore("PagePickerStore"),
            displayField:"text",
            labelWidth:110,
            fieldLabel:"Page d'accueil",
            id:"pickerMonkey",
            anchor: "100%",
            plugins:[Ext.create("Ext.ux.form.field.ClearButton")],
            name:"homePage"
        });
        component.add(homePageSelector);
    }

});