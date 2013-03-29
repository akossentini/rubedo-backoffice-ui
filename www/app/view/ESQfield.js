/*
 * File: app/view/ESQfield.js
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

Ext.define('Rubedo.view.ESQfield', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.ESQfield',

    queryMode: true,
    geoQueryMode: false,
    fieldLabel: 'Label',
    labelSeparator: ' ',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onHiddenfieldRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onHiddenfieldRender: function(abstractcomponent, options) {
        var myComponent = Ext.widget("ESQfieldComponent");
        myComponent.setFieldLabel(abstractcomponent.fieldLabel+" ");
        abstractcomponent.on("change", function(a,newValue){
            if (Ext.isEmpty(newValue)){
                myComponent.getComponent("addBtn").show();
                myComponent.getComponent("editBtn").hide();
                myComponent.getComponent("removeBtn").hide();
            } else {
                myComponent.getComponent("addBtn").hide();
                myComponent.getComponent("editBtn").show();
                myComponent.getComponent("removeBtn").show();
            }
        });
        myComponent.getComponent("removeBtn").on("click", function(){
            abstractcomponent.setValue(null);
        });
        myComponent.getComponent("addBtn").on("click", function(){
            var delay = 10;
            var prev = Ext.getCmp("searchResultsWindow");
            if (!Ext.isEmpty(prev)){
                prev.close();
                delay=400;
            }
            var task = new Ext.util.DelayedTask(function(){
                Ext.widget("searchResultsWindow", {
                    queryMode:abstractcomponent.queryMode,
                    geoQueryMode:abstractcomponent.geoQueryMode,
                    targetedId:abstractcomponent.getId(),
                    predefFacettes:null
                }).show();
            });
            task.delay(delay);

        });

        myComponent.getComponent("editBtn").on("click", function(){
            var delay = 10;
            var prev = Ext.getCmp("searchResultsWindow");
            if (!Ext.isEmpty(prev)){
                prev.close();
                delay=400;
            }
            var task = new Ext.util.DelayedTask(function(){
                Ext.widget("searchResultsWindow", {
                    queryMode:abstractcomponent.queryMode,
                    geoQueryMode:abstractcomponent.geoQueryMode,
                    targetedId:abstractcomponent.getId(),
                    predefFacettes:Ext.JSON.decode(abstractcomponent.getValue())
                }).show();
            });
            task.delay(delay);

        });
        abstractcomponent.up().add(myComponent);
        abstractcomponent.fireEvent("change",abstractcomponent, abstractcomponent.getValue());

    }

});