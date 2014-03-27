/*
 * File: app/view/termContextMenu.js
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

Ext.define('Rubedo.view.termContextMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.termContextMenu',

    requires: [
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    id: 'termContextMenu',
    showSeparator: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    localiserId: 'termField',
                    id: 'nouveauTermeTaxoField',
                    fieldLabel: 'Terme ',
                    labelWidth: 50,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    localiserId: 'addBtn',
                    id: 'boutonAjouterTermesTaxo',
                    icon: '',
                    iconCls: 'add',
                    text: 'Ajouter'
                },
                {
                    xtype: 'button',
                    localiserId: 'removeBtn',
                    id: 'boutonSupprimerTermesTaxo',
                    iconCls: 'close',
                    text: 'Supprimer'
                }
            ]
        });

        me.callParent(arguments);
    }

});