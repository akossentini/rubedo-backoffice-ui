/*
 * File: app/controller/SitesController.js
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

Ext.define('Rubedo.controller.SitesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.SitesController',

    selectSite: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)) {
            Ext.getCmp("sitesInterface").getComponent("breadcrumb").removeAll();
            Ext.getCmp("sitesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Sites", iconCls:"referencement_icon"}));
            Ext.getCmp("siteRemoveBtn").disable();
            Ext.getCmp("mainSiteProps").up().disable();
            Ext.getCmp("updateSiteBtn").disable();
            Ext.getCmp("mainSiteProps").getForm().reset();
        } else {
            Ext.getCmp("sitesInterface").getComponent("breadcrumb").removeAll();
            Ext.getCmp("sitesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Sites <b> > </b>", iconCls:"referencement_icon"}));
            Ext.getCmp("sitesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: selected[0].get("text"), iconCls:"referencement_icon"}));
            Ext.getCmp("siteRemoveBtn").enable();
            Ext.getCmp("mainSiteProps").up().enable();
            Ext.getCmp("updateSiteBtn").enable();
            Ext.getStore("PagePickerStore").getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\""+selected[0].get("id")+"\"}]";
            Ext.getStore("PagePickerStore").load();

            Ext.getCmp("mainSiteProps").getForm().setValues(Ext.clone(selected[0].getData()));
            if (Ext.isEmpty(Ext.getCmp("sitesHomePicker").getValue())){
                Ext.getCmp("sitesHomePicker").setValue([]);
            }
            if ((!ACL.interfaceRights["write.ui.sites"])||(selected[0].get("readOnly"))){
                Ext.getCmp("updateSiteBtn").disable();
                Ext.getCmp("siteRemoveBtn").disable();
                Ext.Array.forEach(Ext.getCmp("mainSiteProps").query("field"), function(field){field.setReadOnly(true);});
            } else {
                Ext.Array.forEach(Ext.getCmp("mainSiteProps").query("field"), function(field){field.setReadOnly(false);});
            }
            Ext.getCmp("sitesDLSToolbar").recievei18n(selected[0].get("i18n"),selected[0].get("locale"),selected[0].get("nativeLanguage"));
            var boiteMeta = Ext.getCmp("sitesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
            var valeurs= Ext.clone(selected[0].data);
            valeurs.creation= Ext.Date.format(valeurs.createTime, Ext.Date.defaultFormat);
            valeurs.derniereModification= Ext.Date.format(valeurs.lastUpdateTime, Ext.Date.defaultFormat);
            boiteMeta.update(valeurs);
            boiteMeta.show();

        }
    },

    deleteSite: function(button, e, eOpts) {
        var target = Ext.getCmp('mainSitesGrid').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(target)) {
            var delCon = Ext.widget('delConfirmZ');
            delCon.show();
            Ext.getCmp('delConfirmZOui').on('click', function() { 

                if ((!Ext.isEmpty(Ext.getCmp("pagesSitesCombo")))&&(Ext.getCmp("pagesSitesCombo").getValue()==Ext.getCmp("mainSitesGrid").getSelectionModel().getLastSelected().get("id"))) {
                    Ext.MessageBox.confirm(Rubedo.RubedoAutomatedElementsLoc.warningTitle,Rubedo.RubedoAutomatedElementsLoc.siteModifWarning, function(anser){
                        if (anser=="yes"){
                            Ext.getCmp("contributionPages").close();
                            Ext.getCmp('mainSitesGrid').getStore().remove(target);
                            Ext.getStore("SitesJson").addListener("datachanged",function(){
                                if (Ext.getStore("MasquesDataJson").isUsed) {
                                    Ext.getStore("MasquesDataJson").load();
                                }
                            },this,{single:true});
                                //button.disable();
                                Ext.getCmp("sitesInterface").getComponent("breadcrumb").removeAll();
                                Ext.getCmp("sitesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Sites", iconCls:"referencement_icon"}));
                                Ext.getCmp("sitesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').hide();
                                Ext.getCmp("mainSiteProps").getForm().reset();
                                Ext.getCmp('delConfirmZ').close();
                            } 
                        });
                    } else {


                        Ext.getCmp('mainSitesGrid').getStore().remove(target);
                        Ext.getStore("SitesJson").addListener("datachanged",function(){
                            if (Ext.getStore("MasquesDataJson").isUsed) {
                                Ext.getStore("MasquesDataJson").load();
                            }
                        },this,{single:true});
                            //button.disable();
                            Ext.getCmp("sitesInterface").getComponent("breadcrumb").removeAll();
                            Ext.getCmp("sitesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Sites", iconCls:"referencement_icon"}));
                            Ext.getCmp("sitesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').hide();
                            Ext.getCmp("mainSiteProps").getForm().reset();
                            Ext.getCmp('delConfirmZ').close();

                        }});  

                    }
    },

    openAddSiteWindow: function(button, e, eOpts) {
        Ext.widget("siteBuilderWizzard").show();
    },

    createNewSite: function(button, e, eOpts) {
        var form = button.up().getForm();
        if (form.isValid()){
            var newSite= Ext.create("Rubedo.model.sitesDataModel", form.getValues());
            Ext.getStore("SitesJson").add(newSite);
            Ext.getStore("SitesJson").addListener("datachanged",function(){
                Ext.getCmp('mainSitesGrid').getSelectionModel().select(newSite);
            },this,{single:true});


                button.up().up().close();
            }
    },

    updateSiteSubmit: function(button, e, eOpts) {
        var me=this;
        var form = Ext.getCmp("mainSiteProps").getForm();
        if (form.isValid()){
            if ((!Ext.isEmpty(Ext.getCmp("pagesSitesCombo")))&&(Ext.getCmp("pagesSitesCombo").getValue()==Ext.getCmp("mainSitesGrid").getSelectionModel().getLastSelected().get("id"))) {
                Ext.MessageBox.confirm(Rubedo.RubedoAutomatedElementsLoc.warningTitle,Rubedo.RubedoAutomatedElementsLoc.siteModifWarning, function(anser){
                    if (anser=="yes"){
                        Ext.getCmp("contributionPages").close();
                        var myRec=Ext.getCmp("mainSitesGrid").getSelectionModel().getLastSelected();
                        myRec.beginEdit();
                        myRec.set(form.getValues(false, false, false, true)); 
                        Ext.getCmp("sitesDLSToolbar").persisti18n(myRec);
                        myRec.endEdit();
                        Ext.getStore("SitesJson").addListener("datachanged",function(){
                            me.selectSite(Ext.getCmp("mainSitesGrid"),[myRec]);
                            if (Ext.getStore("MasquesDataJson").isUsed) {
                                Ext.getStore("MasquesDataJson").load();
                            }
                        },this,{single:true});
                        }
                    });
                } else {
                    var myRec=Ext.getCmp("mainSitesGrid").getSelectionModel().getLastSelected();
                    myRec.beginEdit();
                    myRec.set(form.getValues(false, false, false, true)); 
                    Ext.getCmp("sitesDLSToolbar").persisti18n(myRec);
                    myRec.endEdit();
                    Ext.getStore("SitesJson").addListener("datachanged",function(){
                        me.selectSite(Ext.getCmp("mainSitesGrid"),[myRec]);
                        if (Ext.getStore("MasquesDataJson").isUsed) {
                            Ext.getStore("MasquesDataJson").load();
                        }
                    },this,{single:true});
                    }
                }else{
                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle,Rubedo.RubedoAutomatedElementsLoc.invalidFieldsError);
                }
    },

    onSitesInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("SitesJson").removeAll();
        Ext.getStore("PagePickerStore").getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\"emptyDecoy\"}]";
        Ext.getStore("PagePickerStore").load();
        Ext.getStore("AllLanguagesStore").removeAll();
        Ext.getStore("AllLanguagesStore2").removeAll();
    },

    onMainSitesGridRender: function(component, eOpts) {
        Ext.getStore("SitesJson").load();
        Ext.getStore("AllLanguagesStore").load();
        Ext.getStore("AllLanguagesStore2").load();
    },

    onSiteWizzardCreateBtnClick: function(button, e, eOpts) {
        var form = button.up().up().getForm();
        if (form.isValid()){
            var newSite= Ext.create("Rubedo.model.sitesDataModel", form.getValues());
            var nativeLanguage=Ext.getCmp("workingLanguageField").getValue();
            newSite.set("nativeLanguage", nativeLanguage);
            var i18n= { };
            i18n[nativeLanguage]={
                title:form.getValues().title,
                description:form.getValues().description,
                author:form.getValues().author
            };
            newSite.set("i18n",i18n);
            Ext.getStore("SitesJson").add(newSite);
            Ext.getStore("SitesJson").addListener("datachanged",function(){
                Ext.getCmp('mainSitesGrid').getSelectionModel().select(newSite);
                if (Ext.getStore("MasquesDataJson").isUsed) {
                    Ext.getStore("MasquesDataJson").load();
                }
            },this,{single:true});
                button.up().up().up().close();
            }
    },

    init: function(application) {
        this.control({
            "#mainSitesGrid": {
                selectionchange: this.selectSite,
                render: this.onMainSitesGridRender
            },
            "#siteRemoveBtn": {
                click: this.deleteSite
            },
            "#siteAddBtn": {
                click: this.openAddSiteWindow
            },
            "#newSiteSubmitBtn": {
                click: this.createNewSite
            },
            "#updateSiteBtn": {
                click: this.updateSiteSubmit
            },
            "#sitesInterface": {
                beforeclose: this.onSitesInterfaceBeforeClose
            },
            "#siteWizzardCreateBtn": {
                click: this.onSiteWizzardCreateBtnClick
            }
        });
    }

});
