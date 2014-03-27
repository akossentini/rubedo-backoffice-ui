/*
 * File: app/view/MQField.js
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

Ext.define('Rubedo.view.MQField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.MQField',

    allowedFileType: 'Image',
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
        var myComponent = Ext.widget("MQFieldComponent");
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
            var assistant =Ext.widget("MQA", {targetId:component.getId(), allowedFileType:component.allowedFileType});
            assistant.show();
        });
        myComponent.getComponent("editBtn").on("click", function(){
            var assistant =Ext.widget("MQA", {targetId:component.getId(), allowedFileType:component.allowedFileType, editorMode:true, initialValue:Ext.clone(component.getValue())});
            assistant.show();
        });
        component.up().add(myComponent);
        component.fireEvent("change",component, component.getValue());
    }

});