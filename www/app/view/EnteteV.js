/*
 * File: app/view/EnteteV.js
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

Ext.define('Rubedo.view.EnteteV', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.entete',

    height: 46,
    id: 'entete',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    disabled: true,
                    id: 'boutonPincipalInterface',
                    icon: 'resources/images/logoRubedo.png',
                    scale: 'large'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    id: 'desktopHomeBtn',
                    iconCls: 'desktopHome_med',
                    scale: 'medium',
                    text: '',
                    tooltip: 'Afficher le bureau'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    border: 0,
                    height: 30,
                    id: 'taskbarPrincipal',
                    enableOverflow: true
                },
                {
                    xtype: 'textfield',
                    id: 'ESSearchField',
                    itemId: 'filterField',
                    fieldLabel: '',
                    labelSeparator: ' ',
                    labelWidth: 68,
                    emptyText: 'Recherche',
                    listeners: {
                        specialkey: {
                            fn: me.onESSearchFieldSpecialkey,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'button',
                    id: 'ESSearchButton',
                    iconCls: 'search'
                }
            ]
        });

        me.callParent(arguments);
    },

    onESSearchFieldSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            Ext.getCmp("ESSearchButton").fireEvent("click",Ext.getCmp("ESSearchButton"));
        }
    }

});