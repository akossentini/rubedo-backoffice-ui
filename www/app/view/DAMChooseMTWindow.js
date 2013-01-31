/*
 * File: app/view/DAMChooseMTWindow.js
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

Ext.define('Rubedo.view.DAMChooseMTWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.DAMChooseMTWindow',

    height: 119,
    id: 'DAMChooseMTWindow',
    width: 400,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'Choissez un type de média',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            name: 'typeId',
                            fieldLabel: 'Type',
                            allowBlank: false,
                            editable: false,
                            displayField: 'type',
                            forceSelection: true,
                            store: 'MediaTypesForDAM',
                            valueField: 'id'
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
                            id: 'addDamAfterTypeBtn',
                            scale: 'large',
                            text: 'Créer un nouveau média de ce type'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});