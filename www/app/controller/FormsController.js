/*
 * File: app/controller/FormsController.js
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

Ext.define('Rubedo.controller.FormsController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.FormsController',

    onAddFormBtnClick: function(button, e, options) {
        Ext.widget("newFormWindow").show();
    },

    onSubmitNewFormBtnClick: function(button, e, options) {
        var me=this;
        var form=button.up().getForm();
        if (form.isValid()){
            var newOne=Ext.create("Rubedo.model.formModel",form.getValues());
            newOne.set("workspaces",[ACL.defaultWorkspace]);
            Ext.getStore("FormsStore").add(newOne);
            Ext.getStore("FormsStore").addListener("datachanged", function(){
                Ext.getCmp("mainFormsGrid").getSelectionModel().select([newOne]);
            },this,{single:true});
                button.up().up().close();
            }
    },

    onRemoveFormBtnClick: function(button, e, options) {
        var target = Ext.getCmp('mainFormsGrid').getSelectionModel().getLastSelected();
        var me=this;
        if (!Ext.isEmpty(target)) {
            var window = Ext.widget('delConfirmZ');
            Ext.getCmp('ViewportPrimaire').add(window);
            window.show();
            Ext.getCmp('delConfirmZOui').on('click', function() { 
                Ext.getStore("FormsStore").remove(target);            
                Ext.getCmp('delConfirmZ').close();  
                me.resetInterfaceNoSelect();
            });  

        }
    },

    onMainFormsGridSelectionChange: function(tablepanel, selections, options) {
        var me=this;
        if (Ext.isEmpty(selections)){
            me.resetInterfaceNoSelect();
        } else {
            me.resetInterfaceSelect(selections[0], true);
        }
    },

    onFormSaveBtnClick: function(button, e, options) {
        var me=this;
        if (Ext.getCmp("formRightsForm").getForm().isValid()){
            if (Ext.getCmp("formPropsForm").getForm().isValid()){
                var target = Ext.getCmp('mainFormsGrid').getSelectionModel().getLastSelected();
                target.beginEdit();
                target.set(Ext.getCmp("formRightsForm").getForm().getValues());
                target.set(Ext.getCmp("formPropsForm").getForm().getValues());
                target.set("formPages",me.saveFormPages());
                target.endEdit();
                Ext.getStore("FormsStore").addListener("datachanged", function(){
                    me.resetInterfaceSelect(target);
                },this,{single:true});
                } else {
                    Ext.Msg.alert("Erreur", "Propriétés du formulaire invalides");
                    Ext.getCmp("FormsCenterZone").getLayout().setActiveItem(0);
                }
            } else {
                Ext.Msg.alert("Erreur", "Paramétrage des droits invalide");
                Ext.getCmp("FormsCenterZone").getLayout().setActiveItem(2);
            }
    },

    selectionEvents: function(abstractcomponent, options) {
        if (!abstractcomponent.isXType("RFormPage")){
            abstractcomponent.getEl().on("mouseover", function(e){
                abstractcomponent.addBodyCls("contrastFBorder");
                e.stopEvent();
            });
            abstractcomponent.getEl().on("mouseout", function(e){
                abstractcomponent.removeBodyCls("contrastFBorder");
                e.stopEvent();
            });
        } else {
            abstractcomponent.getEl().on("mouseover", function(e){
                var prevSelected = Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
                if ((Ext.isEmpty(prevSelected))||(prevSelected.id!==abstractcomponent.id)) {
                    abstractcomponent.setIconCls('selectBloc');
                }
                e.stopEvent();
            });
            abstractcomponent.getEl().on("mouseout", function(e){
                var prevSelected = Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
                if ((Ext.isEmpty(prevSelected))||(prevSelected.id!==abstractcomponent.id)) {
                abstractcomponent.setIconCls();}
                e.stopEvent();
            });

        }

        abstractcomponent.getEl().on("click", function(e){
            Ext.getCmp("formSelectedElementField").setValue(abstractcomponent.getId());
            e.stopEvent();
        });


    },

    onFormSelectedElementFieldChange: function(field, newValue, oldValue, options) {
        var previousOne = Ext.getCmp(oldValue);
        if (!Ext.isEmpty(previousOne)){
            if (!previousOne.isXType("RFormPage")){
                previousOne.removeBodyCls("selectedFElement");
            } else {
                previousOne.setIconCls();
            }
        }
        Ext.Array.forEach(Ext.getCmp("formElementsEditBtnGroup").query("button"),function(thing){thing.disable();});
        var newOne=Ext.getCmp(newValue);
        if (!Ext.isEmpty(newOne)){
            newOne.getEl().frame(MyPrefData.themeColor);
            if (newValue=="FormsEditContainer"){
                newOne.addBodyCls("selectedFElement");
                Ext.getCmp("formAddPageBtn").enable();
            } else {

                if (newOne.isXType("RFormPage")){
                    Ext.getCmp("formElementAddBtn").enable();
                    Ext.getCmp("formElementMoveUpBtn").enable();
                    Ext.getCmp("formElementMoveDownBtn").enable();
                    Ext.getCmp("formElementRemoveBtn").enable();
                    newOne.setIconCls('editBloc');
                } else if (newOne.isXType("RFormField")){
                    Ext.getCmp("formElementMoveUpBtn").enable();
                    Ext.getCmp("formElementMoveDownBtn").enable();
                    Ext.getCmp("formElementRemoveBtn").enable();
                    newOne.addBodyCls("selectedFElement");
                }
            }
        }
    },

    onFormElementAddBtnClick: function(button, e, options) {
        Ext.widget("addFormFieldWindow").show();
    },

    onFormAddPageBtnClick: function(button, e, options) {
        Ext.Ajax.request({
            url: 'xhr-get-mongo-id',
            params: { },
            success: function(response){
                var servedId = Ext.JSON.decode(response.responseText).mongoID;
                var target=Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
                var newPage = Ext.widget("RFormPage", {id:servedId});
                newPage.itemConfig={
                    label:"Page "+(target.items.items.length+1)
                };
                target.add(newPage); 
                Ext.getCmp("FormsEditor").doLayout();
                newPage.getEl().dom.click();
            },
            failure: function(){
                Ext.Msg.alert('Erreur', 'Erreur dans la récupération d\'un identifiant.');

            }
        });
    },

    onFormElementMoveUpBtnClick: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().items.indexOf(field);
            if (pos > 0) {
                field.up().move(pos,pos-1);
            }
        }
    },

    onFormElementMoveDownBtnClick: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().items.indexOf(field);
            field.up().move(pos,pos+1);
        }
    },

    onFormElementRemoveBtnClick: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
        field.up().remove(field);
        Ext.getCmp('formSelectedElementField').setValue(null);
    },

    onInsertFormElementBtnClick: function(button, e, options) {
        var insertor=Ext.clone(Ext.getCmp("formFieldSelectGrid").getSelectionModel().getLastSelected().getData());
        Ext.Ajax.request({
            url: 'xhr-get-mongo-id',
            params: { },
            success: function(response){
                var servedId = Ext.JSON.decode(response.responseText).mongoID;
                var target=Ext.getCmp(Ext.getCmp('formSelectedElementField').getValue());
                var newElement= Ext.widget("RFormField", {id:servedId});
                newElement.itemConfig=insertor.itemConfig;
                target.add(newElement); 
                button.up().up().close();
                Ext.getCmp("FormsEditor").doLayout();
                newElement.getEl().dom.click();

            },
            failure: function(){
                Ext.Msg.alert('Erreur', 'Erreur dans la récupération d\'un identifiant.');

            }
        });
    },

    resetInterfaceSelect: function(record, pageRefresh) {
        Ext.getCmp("formPropsForm").getForm().setValues(record.getData());
        Ext.getCmp("formRightsForm").getForm().setValues(record.getData());
        Ext.getCmp("FormsCenterZone").enable();
        Ext.Array.forEach(Ext.getCmp("FormsInterface").getDockedComponent("contextBar").query("buttongroup"), function(thing){thing.enable();});
        Ext.getCmp("removeFormBtn").enable();
        Ext.getCmp("FormsInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("FormsInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Formulaires <b> > </b>", iconCls:"form_small"}));
        Ext.getCmp("FormsInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: record.get("title"), iconCls:"form_small"}));
        var metaBox = Ext.getCmp("FormsInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
        var values= record.getData();
        values.creation= Ext.Date.format(values.createTime, 'd-m-Y');
        values.derniereModification= Ext.Date.format(values.lastUpdateTime, 'd-m-Y');
        metaBox.update(values);
        metaBox.show();
        if (pageRefresh){
            Ext.getCmp("formSelectedElementField").setValue(null);
            Ext.getCmp("FormsEditContainer").removeAll();
            this.readFormPages(record.get("formPages"));
        }
    },

    resetInterfaceNoSelect: function() {
        Ext.getCmp("formPropsForm").getForm().reset();
        Ext.getCmp("formRightsForm").getForm().reset();
        Ext.getCmp("FormsCenterZone").getLayout().setActiveItem(0);
        Ext.getCmp("FormsCenterZone").disable();
        Ext.Array.forEach(Ext.getCmp("FormsInterface").getDockedComponent("contextBar").query("buttongroup"), function(thing){thing.disable();});
        Ext.getCmp("removeFormBtn").disable();
        Ext.getCmp("FormsInterface").getDockedComponent("barreMeta").getComponent("boiteBarreMeta").hide();
        Ext.getCmp("FormsInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("FormsInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Formulaires", iconCls:"form_small"}));
        Ext.getCmp("formSelectedElementField").setValue(null);
        Ext.getCmp("FormsEditContainer").removeAll();
    },

    saveFormPages: function() {
        var pages =[ ];
        Ext.Array.forEach(Ext.getCmp("FormsEditContainer").items.items, function(page){
            var newPage = {
                id:page.id,
                itemConfig:page.itemConfig,
                elements:[ ]
            };
            Ext.Array.forEach(page.items.items, function(element){
                var newElement = {
                    id:element.id,
                    itemConfig:element.itemConfig
                };
                newPage.elements.push(newElement);
            });
            pages.push(newPage);
        });
        return(pages);
    },

    readFormPages: function(pages) {
        var target=Ext.getCmp("FormsEditContainer");
        Ext.Array.forEach(pages, function(page){
            var newPage = Ext.widget("RFormPage", {id:page.id});
            newPage.itemConfig=page.itemConfig;
            Ext.Array.forEach(page.elements, function(element){
                var newElement = Ext.widget("RFormField", element);
                newPage.add(newElement);
            });
            target.add(newPage);
        });
    },

    init: function(application) {
        this.control({
            "#addFormBtn": {
                click: this.onAddFormBtnClick
            },
            "#submitNewFormBtn": {
                click: this.onSubmitNewFormBtnClick
            },
            "#removeFormBtn": {
                click: this.onRemoveFormBtnClick
            },
            "#mainFormsGrid": {
                selectionchange: this.onMainFormsGridSelectionChange
            },
            "#formSaveBtn": {
                click: this.onFormSaveBtnClick
            },
            "#FormsEditor panel": {
                render: this.selectionEvents
            },
            "#formSelectedElementField": {
                change: this.onFormSelectedElementFieldChange
            },
            "#formElementAddBtn": {
                click: this.onFormElementAddBtnClick
            },
            "#formAddPageBtn": {
                click: this.onFormAddPageBtnClick
            },
            "#formElementMoveUpBtn": {
                click: this.onFormElementMoveUpBtnClick
            },
            "#formElementMoveDownBtn": {
                click: this.onFormElementMoveDownBtnClick
            },
            "#formElementRemoveBtn": {
                click: this.onFormElementRemoveBtnClick
            },
            "#insertFormElementBtn": {
                click: this.onInsertFormElementBtnClick
            }
        });
    }

});
