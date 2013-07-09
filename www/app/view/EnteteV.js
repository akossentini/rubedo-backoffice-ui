/*
 * File: app/view/EnteteV.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

    requires: [
        'Rubedo.view.ESSearchField'
    ],

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
                    xtype: 'hiddenfield',
                    id: 'workingLanguageField',
                    fieldLabel: 'Label'
                },
                {
                    xtype: 'button',
                    id: 'workingLanguageBtn',
                    iconCls: 'infoWarning',
                    text: '',
                    tooltip: 'No working language selected',
                    tooltipType: 'title',
                    menu: {
                        xtype: 'menu',
                        frame: true,
                        id: 'LanguageChangerMenu',
                        minWidth: 60,
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'Menu Item'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Menu Item'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Menu Item'
                            }
                        ]
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'ESSearchField'
                },
                {
                    xtype: 'button',
                    id: 'ESSearchButton',
                    iconCls: 'search'
                }
            ]
        });

        me.callParent(arguments);
    }

});