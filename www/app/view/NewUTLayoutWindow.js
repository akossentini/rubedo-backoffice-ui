/*
 * File: app/view/NewUTLayoutWindow.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
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

Ext.define('Rubedo.view.NewUTLayoutWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.NewUTLayoutWindow',

    localiserId: 'newLayoutWindow',
    width: 400,
    constrain: true,
    resizable: false,
    layout: {
        type: 'fit'
    },
    title: 'New layout',
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
                            xtype: 'textfield',
                            localiserId: 'nameField',
                            anchor: '100%',
                            fieldLabel: 'Nom',
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            fieldLabel: 'Type',
                            name: 'type',
                            value: 'Detail'
                        },
                        {
                            xtype: 'combobox',
                            localiserId: 'nmSiteField',
                            anchor: '100%',
                            id: 'nouveauMasqueSite3',
                            fieldLabel: 'Site ',
                            name: 'site',
                            allowBlank: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'SitesComboUTLayouts',
                            valueField: 'id',
                            listeners: {
                                afterrender: {
                                    fn: me.onNouveauMasqueSiteAfterRender1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'createNewLayoutBtn',
                            anchor: '100%',
                            id: 'NewCTLayoutWindowSubmitBtn1',
                            scale: 'medium',
                            text: 'Create new layout'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onNouveauMasqueSiteAfterRender1: function(component, eOpts) {
        var results = component.getStore().getRange();
        if ((!Ext.isEmpty(results))&&(results.length==1)){
            component.select(results[0]);
            component.hide();
        }
    }

});