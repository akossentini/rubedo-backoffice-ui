/*
 * File: app/view/termContextMenu.js
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

Ext.define('Rubedo.view.termContextMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.termContextMenu',

    id: 'termContextMenu',
    showSeparator: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    id: 'nouveauTermeTaxoField',
                    fieldLabel: 'Terme ',
                    labelWidth: 50,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    id: 'boutonAjouterTermesTaxo',
                    icon: '',
                    iconCls: 'add',
                    text: 'Ajouter'
                },
                {
                    xtype: 'button',
                    id: 'boutonSupprimerTermesTaxo',
                    iconCls: 'close',
                    text: 'Supprimer'
                }
            ]
        });

        me.callParent(arguments);
    }

});