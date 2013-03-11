/*
 * File: app/controller/MediaTypesController.js
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

Ext.define('Rubedo.controller.MediaTypesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.MediaTypesController',

    onNewMTBtnClick: function(button, e, options) {
        Ext.widget("newMTWindow").show();
    },

    onCreateNewMTBtnClick: function(button, e, options) {
        if (button.up().getForm().isValid()) {
            var newMT=Ext.create("Rubedo.model.mediaTypeModel",button.up().getForm().getValues());
            newMT.set("vocabularies", [ ]);
            newMT.set("fields", [ ]);
            Ext.getStore("MediaTypes").add(newMT);
            button.up().up().close();
        }
    },

    onMainMTGridSelect: function(selModel, record, index, options) {
        this.resetInterfaceSelect(record);
    },

    onRemoveMTBtnClick: function(button, e, options) {
        var me=this;
        var cible = Ext.getCmp('mainMTGrid').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(cible)) {
            Ext.Ajax.request({
                url: 'dam-types/is-used',
                params: {
                    id: cible.get("id")
                },
                success: function(response){
                    var maskIsUsed=Ext.JSON.decode(response.responseText).used;
                    if (maskIsUsed){
                        Ext.Msg.alert('Suppression impossible', 'Ce type de médias est utilsé par des médias.');
                    } else {
                        var fenetre = Ext.widget('delConfirmZ');
                        fenetre.show();
                        Ext.getCmp('delConfirmZOui').on('click', function() { 
                            Ext.getCmp('mainMTGrid').getStore().remove(cible);
                            Ext.getCmp('delConfirmZ').close();
                            me.resetInterfaceNoSelect();

                        }); 
                    }
                }
            });


        }
    },

    onSaveMTBtnClick: function(button, e, options) {
        this.updateMT(Ext.getCmp("mainMTGrid").getSelectionModel().getLastSelected());
    },

    onNewMTFieldBtnClick: function(button, e, options) {
        Ext.widget("MTFieldAddWindow").show();
    },

    onMTFieldInsertBtnClick: function(button, e, options) {
        var proto=Ext.clone(Ext.getCmp("MTFieldSelectGrid").getSelectionModel().getLastSelected().getData());
        proto.protoId=proto.id;
        this.renderMTField(proto, Ext.getCmp('MTeditFields'));
        button.up().up().close();
    },

    onMTFieldSelectGridItemDblClick: function(tablepanel, record, item, index, e, options) {
        this.onMTFieldInsertBtnClick(Ext.getCmp("MTFieldInsertBtn"));
    },

    selectionEvents: function(abstractcomponent, options) {
        var usedNames=["original", "text"];
        //MTFieldId
        //MTFieldConfigsBox
        var me=this;
        var TCfield=abstractcomponent.getComponent(1);
        TCfield.getEl().on('click', function() {
            Ext.getCmp("MTfieldUp").enable();
            Ext.getCmp("MTfieldDown").enable();
            Ext.getCmp("MTfieldDeleter").enable();   
            if (Ext.getCmp('MTFieldId').getValue() != TCfield.id) {
                if (Ext.isDefined(Ext.getCmp(Ext.getCmp('MTFieldId').getValue()))){    
                    Ext.getCmp(Ext.getCmp('MTFieldId').getValue()).getEl().applyStyles('color:#000000');
                    var companion =Ext.getCmp(Ext.getCmp('MTFieldId').getValue()).up().getComponent("imageFieldComponent");
                    if (Ext.isDefined(companion)) {
                        companion.getEl().applyStyles('color:#000000');
                    }
                }
                Ext.getCmp('MTFieldId').setValue(TCfield.id);
                if (TCfield.isXType("ImagePickerField")) {
                    TCfield.up().getComponent("imageFieldComponent").getEl().frame(MyPrefData.themeColor);
                    TCfield.up().getComponent("imageFieldComponent").getEl().applyStyles('color:'+MyPrefData.themeColor);
                } else {
                    this.frame(MyPrefData.themeColor);
                    this.applyStyles('color:'+MyPrefData.themeColor);
                }
                var mesChamps = TCfield.configFields;
                var boiteParam = Ext.getCmp('MTFieldConfigsBox');
                boiteParam.removeAll();
                for(t=0; t<mesChamps.length; t++) {
                    if (mesChamps[t].type =='Ext.form.field.ComboBox') {
                        var monStore=  Ext.create('Ext.data.Store', mesChamps[t].store);
                        mesChamps[t].config.store= monStore;
                    }
                    var nouvChamp= Ext.create(mesChamps[t].type, mesChamps[t].config);
                    nouvChamp.labelSeparator= ' ';
                    nouvChamp.anchor='100%';
                    if (nouvChamp.name=="name"){
                        nouvChamp.validator=me.nameValidator;
                    }
                    nouvChamp.setValue(TCfield.config[nouvChamp.name]);
                    nouvChamp.setReadOnly((!ACL.interfaceRights["write.ui.damTypes"])||(Ext.getCmp("mainMTGrid").getSelectionModel().getLastSelected().get("readOnly")));
                    nouvChamp.on('change', function (thing) {
                        if (thing.isValid()){
                            TCfield.config[this.name]= this.getValue();
                            if (this.name=='fieldLabel') {
                                if (TCfield.isXType("ImagePickerField")) {
                                    TCfield.up().getComponent("imageFieldComponent").getComponent(0).setText(this.getValue()+" ");
                                } else {
                                    TCfield.setFieldLabel(this.getValue());
                                }
                            }
                            else if (this.name=='value') {
                                TCfield.setValue(this.getValue());
                            }
                            else if (this.name=='allowBlank') {
                                var currentOne=TCfield.config.fieldLabel;
                                if (this.getValue()) {
                                    currentOne=currentOne.replace(" *","");
                                } else {
                                    currentOne=currentOne+" *";
                                } 
                                TCfield.config.fieldLabel=currentOne;
                                if (TCfield.isXType("ImagePickerField")) {
                                    TCfield.up().getComponent("imageFieldComponent").getComponent(0).setText(currentOne+" ");
                                } else {
                                    TCfield.setFieldLabel(currentOne);
                                }
                            }
                            else if (this.name=='editable') {
                                TCfield.setEditable(this.getValue());
                                TCfield.reset();
                            }
                            else if (this.name=='multiSelect') {
                                TCfield.multiSelect = this.getValue();
                                TCfield.reset();
                            }
                            else if (this.name=='tooltip') {
                                abstractcomponent.getComponent('helpBouton').setTooltip(this.getValue());
                                if (Ext.isEmpty(this.getValue())){
                                    abstractcomponent.getComponent('helpBouton').hide();
                                } else {
                                    abstractcomponent.getComponent('helpBouton').show();
                                }
                            }
                            else if (this.name=='regex') {
                                TCfield.regex = new RegExp(this.getValue());
                            }
                            else {
                                TCfield[this.name]= this.getValue();
                            }
                            TCfield.validate();
                        }});
                        boiteParam.add(nouvChamp); 

                    }
                    if ((TCfield.isXType('combobox'))&&(!(TCfield.isXType('timefield')))) {
                        var optionsLC = Ext.widget('optionsLCGrid', {store : TCfield.getStore()});
                        boiteParam.add(optionsLC);

                    }
                }
            });
    },

    onMTfieldUpClick: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('MTFieldId').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().up().items.indexOf(field.up());
            if (pos > 0) {
                field.up().up().move(pos,pos-1);
            }
        }
    },

    onMTfieldDownClick: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('MTFieldId').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().up().items.indexOf(field.up());
            field.up().up().move(pos,pos+1);
        }
    },

    onMTfieldDeleterClick: function(button, e, options) {
        var field = Ext.getCmp(Ext.getCmp('MTFieldId').getValue());
        if (!Ext.isEmpty(field)) {
            field.up().destroy();
            Ext.getCmp("MTfieldUp").disable();
            Ext.getCmp("MTfieldDown").disable();
            Ext.getCmp('MTFieldId').setValue();
            Ext.getCmp("MTfieldDeleter").disable();
            Ext.getCmp("MTFieldConfigsBox").removeAll();
        }
    },

    onCopyMTBtnClick: function(button, e, options) {
        var rec = Ext.clone(Ext.getCmp("mainMTGrid").getSelectionModel().getLastSelected().data);
        delete(rec.id);
        rec.type=rec.type+" - Copie du "+Ext.Date.format(new Date(), 'j F, Y, G:i');
        Ext.getCmp("mainMTGrid").getStore().add(rec);
    },

    resetInterfaceNoSelect: function() {
        Ext.Array.forEach(Ext.getCmp("mediaTypesInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.disable();});
        Ext.getCmp("removeMTBtn").disable();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Types de médias", iconCls:"mediaTypes"}));
        Ext.getCmp('MTeditFields').removeAll();
        Ext.getCmp("MTfieldUp").disable();
        Ext.getCmp("MTfieldDown").disable();
        Ext.getCmp("MTfieldDeleter").disable();
        Ext.getCmp('MTFieldId').setValue();
        Ext.getCmp("MTFieldConfigsBox").removeAll();
        Ext.getCmp("MTcenterZone").disable();
        Ext.getCmp("mediaTypesEditForm").getForm().reset();
        Ext.getCmp("mediaTypesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').hide();
    },

    resetInterfaceSelect: function(record) {
        var me =this;
        Ext.Array.forEach(Ext.getCmp("mediaTypesInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.enable();});
        Ext.getCmp("removeMTBtn").enable();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Types de médias <b> > </b>", iconCls:"mediaTypes"}));
        Ext.getCmp("mediaTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: record.get("type"), iconCls:"mediaTypes"}));
        Ext.getCmp("MTcenterZone").enable();
        Ext.getCmp("MTfieldUp").disable();
        Ext.getCmp("MTfieldDown").disable();
        Ext.getCmp('MTFieldId').setValue();
        Ext.getCmp("mediaTypesEditForm").getForm().setValues(record.getData());
        Ext.getCmp("MTfieldDeleter").disable();
        Ext.getCmp("MTFieldConfigsBox").removeAll();
        var metaBox = Ext.getCmp("mediaTypesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
        var values= record.getData();
        values.creation= Ext.Date.format(values.createTime, 'd-m-Y');
        values.derniereModification= Ext.Date.format(values.lastUpdateTime, 'd-m-Y');
        metaBox.update(values);
        metaBox.show();
        var selector= [];
        Ext.Array.forEach(record.get("vocabularies"),function(vocabId){
            selector.push(Ext.getCmp("vocabulariesMTGrid").getStore().findRecord("id", vocabId));
        });
        Ext.getCmp("vocabulariesMTGrid").getSelectionModel().select(selector);
        var targetZone=Ext.getCmp('MTeditFields');
        Ext.suspendLayouts();
        targetZone.removeAll();
        Ext.Array.forEach(record.get("fields"),function(field){
            me.renderMTField(field, targetZone);
        });
        Ext.resumeLayouts();
        Ext.getCmp("MTeditFields").doLayout();
        if ((!ACL.interfaceRights["write.ui.damTypes"])||(record.get("readOnly"))) {
            Ext.Array.forEach(Ext.getCmp("mediaTypesEditForm").query("field"), function(thing){thing.setReadOnly(true);});
            Ext.getCmp("removeMTBtn").disable();
            Ext.getCmp("saveMTBtn").disable();
            Ext.getCmp("MTImportBtn").disable();
            Ext.getCmp("MTfieldDeleter").up().disable();
        } else {
            Ext.Array.forEach(Ext.getCmp("mediaTypesEditForm").query("field"), function(thing){thing.setReadOnly(false);});
            Ext.getCmp("removeMTBtn").enable();
            Ext.getCmp("saveMTBtn").enable();
            Ext.getCmp("MTImportBtn").enable();
            Ext.getCmp("MTfieldDeleter").up().enable();
        }
    },

    updateMT: function(record) {
        var me=this;
        var form = Ext.getCmp("mediaTypesEditForm").getForm();
        if (form.isValid()){
            record.beginEdit();
            record.set(form.getValues());
            var newVocabularies=Ext.Array.pluck(Ext.Array.pluck(Ext.getCmp("vocabulariesMTGrid").getSelectionModel().getSelection(), "data"), "id");
            record.set("vocabularies", newVocabularies);
            record.set("fields", me.recordFields(Ext.getCmp('MTeditFields')));
            record.endEdit();
        } else {
            Ext.Msg.alert('Erreur', 'Propriétés invalides dans l\'onglet "Droits"');
        }
    },

    renderMTField: function(protoData, renderTarget) {
        var me=this;
        var configurator=protoData.config;
        if (protoData.cType == 'combobox') {
            var myStore=  Ext.create('Ext.data.Store', Ext.clone(protoData.config.store));
            configurator.store = myStore;
        }
        var newField= Ext.create(protoData.cType, configurator);
        newField.config=protoData.config;
        newField.protoId=protoData.protoId;
        newField.configFields=Ext.getStore("MTFieldsStore").findRecord("id", protoData.protoId).get("configFields");
        newField.cType=protoData.cType;
        newField.anchor = '90%';
        newField.style = '{float:left;}';
        var casing =Ext.widget('ChampTC');
        casing.add(newField);
        casing.getComponent('helpBouton').setTooltip(newField.config.tooltip);
        if (Ext.isEmpty(newField.config.tooltip)){
            casing.getComponent('helpBouton').hidden=true;
        } 
        if (!me.nameAvailable(newField.name)) {
            var duplic = 1;
            while (!me.nameAvailable(newField.name+duplic)){
                duplic++;
            }
            newField.name=newField.name+duplic;
            newField.config.name=newField.config.name+duplic;

        }
        renderTarget.add(casing);
    },

    nameAvailable: function(name) {
        var usedNames=["originalFileId", "title"];
        Ext.Array.forEach(Ext.getCmp('MTeditFields').query("field"), function(field){
            Ext.Array.include(usedNames,field.name);
        });
        if (Ext.Array.contains(usedNames,name)){
            return(false);
        } else {
            return(true);
        }
    },

    recordFields: function(target) {
        var result = [ ];
        Ext.Array.forEach(target.query("field"), function(field){
            var newField = {
                cType:field.cType,
                config:field.config,
                protoId:field.protoId
            };
            if (field.isXType('combobox')) {
                var dones = field.getStore().data.items;
                var donesR = [ ];
                for (i=0; i<dones.length; i++) {
                    donesR.push({valeur: dones[i].data.valeur, nom: dones[i].data.nom });
                }
                newField.config.store = {
                    fields: ['valeur', 'nom'],
                    data: donesR
                };
            }
            result.push(newField);
        });
        return(result);
    },

    nameValidator: function(name) {
        var usedNames=["originalFileId", "title"];
        Ext.Array.forEach(Ext.getCmp('MTeditFields').query("field"), function(field){
            if (field.getId()!=Ext.getCmp(Ext.getCmp('MTFieldId').getValue()).getId()){
                Ext.Array.include(usedNames,field.name);
            }
        });
        if (Ext.Array.contains(usedNames,name)){
            return("Nom dèjà utilisé par un autre champ");
        } else {
            return(true);
        }
    },

    init: function(application) {
        this.control({
            "#newMTBtn": {
                click: this.onNewMTBtnClick
            },
            "#createNewMTBtn": {
                click: this.onCreateNewMTBtnClick
            },
            "#mainMTGrid": {
                select: this.onMainMTGridSelect
            },
            "#removeMTBtn": {
                click: this.onRemoveMTBtnClick
            },
            "#saveMTBtn": {
                click: this.onSaveMTBtnClick
            },
            "#newMTFieldBtn": {
                click: this.onNewMTFieldBtnClick
            },
            "#MTFieldInsertBtn": {
                click: this.onMTFieldInsertBtnClick
            },
            "#MTFieldSelectGrid": {
                itemdblclick: this.onMTFieldSelectGridItemDblClick
            },
            "#MTeditFields ChampTC": {
                afterrender: this.selectionEvents
            },
            "#MTfieldUp": {
                click: this.onMTfieldUpClick
            },
            "#MTfieldDown": {
                click: this.onMTfieldDownClick
            },
            "#MTfieldDeleter": {
                click: this.onMTfieldDeleterClick
            },
            "#copyMTBtn": {
                click: this.onCopyMTBtnClick
            }
        });
    }

});
