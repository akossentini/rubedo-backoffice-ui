/*
 * File: app/view/ConfigSpecBloc.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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

Ext.define('Rubedo.view.ConfigSpecBloc', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.ConfigSpecBloc',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Tab'
    ],

    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    localiserId: 'blockConfigSimplePanel',
                    bodyPadding: 10,
                    title: 'Simple',
                    tabConfig: {
                        xtype: 'tab',
                        localiserId: 'blockConfigSimplePanel'
                    }
                },
                {
                    xtype: 'form',
                    localiserId: 'blockConfigAdvancedPanel',
                    bodyPadding: 10,
                    title: 'Avancé',
                    tabConfig: {
                        xtype: 'tab',
                        localiserId: 'blockConfigAdvancedPanel'
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onFormAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onFormAfterRender: function(component, eOpts) {
        try{
         component.getComponent(0).setTitle(Rubedo.RubedoInterfaceLoc['blockConfigSimplePanel'].title);
         component.getComponent(1).setTitle(Rubedo.RubedoInterfaceLoc['blockConfigAdvancedPanel'].title);



        } catch(err){}
    }

});