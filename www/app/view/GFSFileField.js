/*
 * File: app/view/GFSFileField.js
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

Ext.define('Rubedo.view.GFSFileField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.GFSFileField',

    height: 0,
    fieldLabel: 'Label',

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
        var sizer="";
        if (component.bigMode) {
            var myComponent = Ext.widget("GFSFileFieldComponentBig");
        } else {
            var myComponent = Ext.widget("GFSFileFieldComponent");
            sizer="&size=thumbnail";
        }
        myComponent.getComponent(0).setText(component.fieldLabel+" ");
        myComponent.getComponent("buttonHolder").getComponent("fieldDownloadFile").on("click", function(){
            window.onbeforeunload=Ext.emptyFn;
            window.location.href="file/get?file-id="+component.getValue()+"&attachment=download";
            var task63 = new Ext.util.DelayedTask(function(){
                window.onbeforeunload = function() { return Rubedo.RubedoAutomatedElementsLoc.windowBeforeUnloadMessage; };
            });
            task63.delay(400);
        });
        myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").on("click", function(){
            if (component.fileType=="Image"){
                var showBox = Ext.widget("ImagePreviewWindow", {maxWidth:window.innerWidth, maxHeight:window.innerHeight});
                showBox.getComponent(0).setSrc("image/get?file-id="+component.getValue()+"&version="+Ext.getStore("DAMEditStore").getRange()[0].get("version"));
                showBox.show();
            }
            //handle cases one by one
        });
        myComponent.on("afterrender",function(){
            if (Ext.isEmpty(component.getValue())){

                myComponent.getComponent("fieldImagePreview").setSrc("resources/icones/"+MyPrefData.iconsDir+"/128x128/image_remove.png");

                myComponent.getComponent("buttonHolder").getComponent("fieldDownloadFile").disable();
                myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").disable();
                if (component.bigMode) {
                    myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").disable();
                }
                myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").disable();
            } else {
                if (component.fileType=="Image"){
                    myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").enable();
                    myComponent.getComponent("fieldImagePreview").setSrc("image/get?file-id="+component.getValue()+"&version="+Ext.getStore("DAMEditStore").getRange()[0].get("version")+sizer);
                    if (component.bigMode) {
                        myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").enable();
                    }
                } else {
                    myComponent.getComponent("fieldImagePreview").setSrc("../file/get-thumbnail");
                    myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").disable();
                }
                myComponent.getComponent("buttonHolder").getComponent("fieldDownloadFile").enable();
                myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").enable();
            }

            myComponent.getEl().on("click",function(){

                component.getEl().dom.click();
            });
        });
        component.up().add(myComponent);
        myComponent.getComponent("buttonHolder").getComponent("fieldChangeFile").on("click",function(){
            Ext.widget("GFSFieldUploadWindow",{targetField:component.id}).show();
        });
        myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").on("click",function(){
            var myPixlrEditor=Ext.widget("pixlrEditorWindow");
            myPixlrEditor.targetedImageId=component.getValue();
            myPixlrEditor.targetedImageVersion=Ext.getStore("DAMEditStore").getRange()[0].get("version");
            myPixlrEditor.targetedImageTitle=Ext.getStore("DAMEditStore").getRange()[0].get("title");
            myPixlrEditor.on("beforeclose",function(){
                if (myPixlrEditor.hasEdited){
                    Ext.getStore("DAMEditStore").getRange()[0].data.version=Ext.getStore("DAMEditStore").getRange()[0].data.version+1;
                    var task = new Ext.util.DelayedTask(function(){
                        myComponent.getComponent("fieldImagePreview").setSrc(null);
                        myComponent.getComponent("fieldImagePreview").setSrc("image/get?file-id="+component.getValue()+"&version="+Ext.getStore("DAMEditStore").getRange()[0].get("version")+sizer);
                    });
                    task.delay(400);
                }}); 
                myPixlrEditor.show();
            });
            myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").on("click",function(){
                var delCon = Ext.widget('delConfirmZ');
                delCon.show();
                Ext.getCmp('delConfirmZOui').on('click', function() { 
                    component.setValue(null);
                    delCon.close();
                }); 
            });
            component.on("change",function(theField,newValue){
                if ((newValue==="")||(Ext.isEmpty(newValue))){
                    myComponent.getComponent("fieldImagePreview").setSrc("resources/icones/"+MyPrefData.iconsDir+"/128x128/image_remove.png");
                    myComponent.getComponent("buttonHolder").getComponent("fieldDownloadFile").disable();
                    myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").disable();
                    if (component.bigMode) {
                        myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").disable();
                    }
                    myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").disable();

                } else {
                    if (component.fileType=="Image"){
                        myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").enable();
                        myComponent.getComponent("fieldImagePreview").setSrc("image/get?file-id="+component.getValue()+"&version="+Ext.getStore("DAMEditStore").getRange()[0].get("version")+sizer);
                        if (component.bigMode) {
                            myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").enable();
                        }
                    } else {
                        myComponent.getComponent("fieldImagePreview").setSrc("../file/get-thumbnail");
                        myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").disable();
                    }
                    myComponent.getComponent("buttonHolder").getComponent("fieldDownloadFile").enable();
                    myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").enable();

                }

            });
            if (component.readOnly){
                myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").hide();
                if (component.bigMode) {
                    myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").hide();
                }
                myComponent.getComponent("buttonHolder").getComponent("fieldChangeFile").hide();
            } else {
                myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").show();
                if (component.bigMode) {
                    myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").show();
                }
                myComponent.getComponent("buttonHolder").getComponent("fieldChangeFile").show();
            }
            if (component.fileType!="Image"){
                if (component.bigMode) {
                    myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").disable();
                }
            } else {
                //handle image online editing
            }
            if (component.fileType=="Office"){
                myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").hide();
            }

            component.on("writeablechange", function(){
                if (component.readOnly){
                    myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").hide();
                    if (component.bigMode) {
                        myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").hide();
                    }
                    myComponent.getComponent("buttonHolder").getComponent("fieldChangeFile").hide();
                } else {
                    myComponent.getComponent("buttonHolder").getComponent("fieldClearFile").show();
                    if (component.bigMode) {
                        myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").show();
                    }
                    myComponent.getComponent("buttonHolder").getComponent("fieldChangeFile").show();
                }
                if (component.fileType!="Image"){
                    if (component.bigMode) {
                        myComponent.getComponent("buttonHolder").getComponent("fieldEditFile").disable();
                    }
                } else {
                    //handle image online editing
                }
                if (component.fileType=="Office"){
                    myComponent.getComponent("buttonHolder").getComponent("fieldPreviewFile").hide();
                }
            });
    }

});