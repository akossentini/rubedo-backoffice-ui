/*
 * File: app/view/ESSearchField.js
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

Ext.define('Rubedo.view.ESSearchField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ESSearchField',

    id: 'ESSearchField',
    itemId: 'filterField',
    fieldLabel: '',
    labelSeparator: ' ',
    labelWidth: 68,
    emptyText: 'Search',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                specialkey: {
                    fn: me.onESSearchFieldSpecialkey,
                    scope: me
                }
            }
        });

        me.processESSearchField(me);
        me.callParent(arguments);
    },

    processESSearchField: function(config) {
        config.emptyText=Rubedo.RubedoAutomatedElementsLoc.searchText;
        return config;
    },

    onESSearchFieldSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            Ext.getCmp("ESSearchButton").fireEvent("click",Ext.getCmp("ESSearchButton"));
        }
    }

});