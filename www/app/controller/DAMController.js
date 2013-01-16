/*
 * File: app/controller/DAMController.js
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

Ext.define('Rubedo.controller.DAMController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.DAMController',

    onGridpanelSelectionChange: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            this.resetInterfaceNoSelect();
        } else {
            this.resetInterfaceSelect(selections[0]);
        }
    },

    resetInterfaceSelect: function(record) {
        var me =this;
        Ext.Array.forEach(Ext.getCmp("DAMInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.enable();});
        Ext.getCmp("removeMTBtn").enable();
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Mèdiathéque <b> > </b>", iconCls:"mediaTypes"}));
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: record.get("type"), iconCls:"folder"}));

    },

    resetInterfceNoSelect: function() {
        Ext.Array.forEach(Ext.getCmp("DAMInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.disable();});
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Types de médias", iconCls:"mediaTypes"}));

    },

    init: function(application) {
        this.control({
            "#DAMMTGrid": {
                selectionchange: this.onGridpanelSelectionChange
            }
        });
    }

});