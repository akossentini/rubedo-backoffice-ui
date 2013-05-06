/*
 * File: app/view/directRTEField.js
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

Ext.define('Rubedo.view.directRTEField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.directRTEField',

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

    onHiddenfieldRender: function(component, eOpts) {
        var myComponent = Ext.widget("directRTEFieldComponent");
        myComponent.setFieldLabel(component.fieldLabel+" ");
        component.on("change", function(a,newValue){
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
            component.setValue(null);
        });
        myComponent.getComponent("addBtn").on("click", function(){
            var myEditor = Ext.widget("RichTextConfigurator");
            Ext.getCmp("richTextConfiguratorSubmit").targetedId=component.getId();
            Ext.getCmp("richTextConfiguratorSubmit").directMode=true;
            myEditor.show();
        });

        myComponent.getComponent("editBtn").on("click", function(){
            var myEditor = Ext.widget("RichTextConfigurator");

            Ext.getCmp("richTextConfiguratorSubmit").targetedId=component.getId();
            Ext.getCmp("richTextConfiguratorSubmit").directMode=true;
            myEditor.show();
            myEditor.getComponent(0).setValue(component.getValue());

        });
        component.up().add(myComponent);
        component.fireEvent("change",component, component.getValue());

    }

});