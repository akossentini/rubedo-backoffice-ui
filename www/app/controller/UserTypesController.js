/*
 * File: app/controller/UserTypesController.js
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

Ext.define('Rubedo.controller.UserTypesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.UserTypesController',

    onNewUTBtnClick: function(button, e, eOpts) {
        Ext.widget("newUTWindow").show();
    },

    onCreateNewUTBtnClick: function(button, e, eOpts) {
        if (button.up().getForm().isValid()) {
            var newMT=Ext.create("Rubedo.model.userType",button.up().getForm().getValues());
            newMT.set("vocabularies", [ ]);
            newMT.set("fields", [ ]);
            newMT.set("signUpType","none");
            newMT.set("defaultGroup",Ext.getStore("GroupsComboStore2").findRecord("name","public").get("id"));
            Ext.getStore("UserTypes").add(newMT);
            button.up().up().close();
        }
    },

    onMainUTGridSelectionChange: function(rowmodel, record, index, eOpts) {
        this.resetInterfaceSelect(record);
    },

    onRemoveUTBtnClick: function(button, e, eOpts) {
        var me=this;
        var cible = Ext.getCmp('mainUTGrid').getSelectionModel().getSelection()[0];
        if (Ext.isDefined(cible)) {
            Ext.Ajax.request({
                url: 'user-types/is-used',
                method:"GET",
                params: {
                    id: cible.get("id")
                },
                success: function(response){
                    var maskIsUsed=Ext.JSON.decode(response.responseText).used;
                    if (maskIsUsed){
                        Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Rubedo.RubedoAutomatedElementsLoc.userTypeIsUsedError);
                    } else {
                        var fenetre = Ext.widget('delConfirmZ');
                        fenetre.specificMessage=Rubedo.RubedoAutomatedElementsLoc.thisUserTypeText;
                        fenetre.show();
                        Ext.getCmp('delConfirmZOui').on('click', function() { 
                            Ext.getCmp('mainUTGrid').getStore().remove(cible);
                            Ext.getCmp('delConfirmZ').close();
                            me.resetInterfaceNoSelect();
                        }); 
                    }
                }
            });
        }
    },

    onSaveUTBtnClick: function(button, e, eOpts) {
        var me=this;
        var record=Ext.getCmp("mainUTGrid").getSelectionModel().getLastSelected();
        var form = Ext.getCmp("userTypesEditForm").getForm();
        if (form.isValid()){
            record.beginEdit();
            record.set(form.getValues());
            var newVocabularies=Ext.Array.pluck(Ext.Array.pluck(Ext.getCmp("vocabulariesUTGrid").getSelectionModel().getSelection(), "data"), "id");
            record.set("vocabularies", newVocabularies);
            record.set("fields", me.recordFields(Ext.getCmp('UTeditFields')));
            record.endEdit();
        } else {
            Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, Rubedo.RubedoAutomatedElementsLoc.invalidRightsPropertiesError);
        }
    },

    onCopyUTBtnClick: function(button, e, eOpts) {
        var rec = Ext.clone(Ext.getCmp("mainUTGrid").getSelectionModel().getLastSelected().data);
        delete(rec.id);
        rec.type=rec.type+" - Copy "+Ext.Date.format(new Date(), 'j F, Y, G:i');
        rec.readOnly=false;
        delete(rec.version);
        delete(rec.createTime);
        delete(rec.lastUpdateTime);
        Ext.getCmp("mainUTGrid").getStore().add(rec);
    },

    onNewUTFieldBtnClick: function(button, e, eOpts) {
        Ext.widget("UTFieldAddWindow").show();
    },

    onUTFieldInsertBtnClick: function(button, e, eOpts) {
        var proto=Ext.clone(Ext.getCmp("UTFieldSelectGrid").getSelectionModel().getLastSelected().getData());
        proto.protoId=proto.id;
        this.renderUTField(proto, Ext.getCmp('UTeditFields'));
        button.up().up().close();
    },

    selectionEvents: function(component, eOpts) {
        var usedNames=["email","login","password"]; //ADD OTHER ONES
        var me=this;
        var TCfield=component.getComponent(1);
        TCfield.getEl().on('click', function() {
            Ext.getCmp("UTfieldUp").enable();
            Ext.getCmp("UTfieldDown").enable();
            Ext.getCmp("UTfieldDeleter").enable();   
            if (Ext.getCmp('UTFieldId').getValue() != TCfield.id) {
                if (Ext.isDefined(Ext.getCmp(Ext.getCmp('UTFieldId').getValue()))){    
                    Ext.getCmp(Ext.getCmp('UTFieldId').getValue()).getEl().applyStyles('color:#000000');
                    var companion =Ext.getCmp(Ext.getCmp('UTFieldId').getValue()).up().getComponent(2);
                    if (Ext.isDefined(companion)) {
                        companion.getEl().applyStyles('color:#000000');
                    }
                }
                Ext.getCmp('UTFieldId').setValue(TCfield.id);
                if ((TCfield.isXType("ImagePickerField"))||(TCfield.isXType("localiserField"))||(TCfield.isXType("externalMediaField"))||(TCfield.isXType("DCEField"))) {
                    TCfield.up().getComponent(2).getEl().frame(MyPrefData.themeColor);
                    TCfield.up().getComponent(2).getEl().applyStyles('color:'+MyPrefData.themeColor);
                } else {
                    this.frame(MyPrefData.themeColor);
                    this.applyStyles('color:'+MyPrefData.themeColor);
                }
                var mesChamps = TCfield.configFields;
                var boiteParam = Ext.getCmp('UTFieldConfigsBox');
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
                    if ((mesChamps[t].type =='Rubedo.view.CTMTField')||(mesChamps[t].type =='Rubedo.view.CTCField')){

                        var properMT =Ext.clone(TCfield.config[nouvChamp.name]);
                        nouvChamp.getStore().targetField=nouvChamp.id;
                        nouvChamp.getStore().addListener("load", function(){  
                            Ext.getCmp(this.targetField).setValue(properMT);
                        },nouvChamp.getStore(),{single:true});
                        }
                        if ((nouvChamp.name=="fieldLabel")||(nouvChamp.name=="tooltip")){
                            nouvChamp.hide();
                            var replacerField=Ext.widget('genericLocTextField',{
                                fieldLabel:nouvChamp.fieldLabel,
                                anchor:"100%",
                                targetEntity:TCfield.getId(),
                                targetEntityProp:nouvChamp.name,
                                CTMode:true,
                                companionFieldId:nouvChamp.getId(),
                                initialLanguage:Ext.getStore("CurrentUserDataStore").getRange()[0].get("language")
                            });
                            boiteParam.add(replacerField);
                        }
                        if ((nouvChamp.name=="localizable")){
                            nouvChamp.hide();
                        }
                        nouvChamp.setReadOnly((!ACL.interfaceRights["write.ui.userTypes"])||(Ext.getCmp("mainUTGrid").getSelectionModel().getLastSelected().get("readOnly")));
                        nouvChamp.on('change', function (thing) {
                            if (thing.isValid()){
                                if(this.isXType("timefield")){
                                    TCfield.config[this.name]=Ext.Date.format(this.getValue(),"H:i");
                                } else if(this.isXType("datefield")){
                                    TCfield.config[this.name]=Ext.Date.format(this.getValue(),"U");
                                } else { 
                                    TCfield.config[this.name]= this.getValue();
                                }
                                if ((this.name=='name')&&((TCfield.isXType("radiogroup"))||(TCfield.isXType("checkboxgroup")))){
                                    var ntcrVal=this.getValue();
                                    Ext.Array.forEach(TCfield.config.items, function(ntch){ntch.name=ntcrVal;});
                                }
                                if (this.name=='fieldLabel') {

                                    if (TCfield.isXType("ImagePickerField")) {
                                        TCfield.up().getComponent(2).getComponent(0).setText(this.getValue());
                                    } else if ((TCfield.isXType("localiserField"))||(TCfield.isXType("externalMediaField"))||(TCfield.isXType("DCEField"))){
                                        TCfield.up().getComponent(2).setFieldLabel(this.getValue());
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
                                        TCfield.up().getComponent(2).getComponent(0).setText(currentOne+" ");
                                    } else if ((TCfield.isXType("localiserField"))||(TCfield.isXType("externalMediaField"))||(TCfield.isXType("DCEField"))){
                                        TCfield.up().getComponent(2).setFieldLabel(currentOne);
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
                                    component.getComponent('helpBouton').setTooltip(this.getValue());
                                    if (Ext.isEmpty(this.getValue())){
                                        component.getComponent('helpBouton').hide();
                                    } else {
                                        component.getComponent('helpBouton').show();
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
                        if ((TCfield.isXType("radiogroup"))||(TCfield.isXType("checkboxgroup"))) {
                            var itemsConfigurator=Ext.widget("specialTCFieldItemsConfigurator");
                            itemsConfigurator.targetedId=TCfield.id;
                            boiteParam.add(itemsConfigurator); 
                        }
                    }
                });
    },

    onUTfieldUpClick: function(button, e, eOpts) {
        var field = Ext.getCmp(Ext.getCmp('UTFieldId').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().up().items.indexOf(field.up());
            if (pos > 0) {
                field.up().up().move(pos,pos-1);
            }
        }
    },

    onUTfieldDownClick: function(button, e, eOpts) {
        var field = Ext.getCmp(Ext.getCmp('UTFieldId').getValue());
        if (!Ext.isEmpty(field)) {
            var pos = field.up().up().items.indexOf(field.up());
            field.up().up().move(pos,pos+1);
        }
    },

    onUTfieldDeleterClick: function(button, e, eOpts) {
        var field = Ext.getCmp(Ext.getCmp('UTFieldId').getValue());
        if (!Ext.isEmpty(field)) {
            field.up().destroy();
            Ext.getCmp("UTfieldUp").disable();
            Ext.getCmp("UTfieldDown").disable();
            Ext.getCmp('UTFieldId').setValue();
            Ext.getCmp("UTfieldDeleter").disable();
            Ext.getCmp("UTFieldConfigsBox").removeAll();
        }
    },

    onUTFieldSelectGridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onUTFieldInsertBtnClick(Ext.getCmp("UTFieldInsertBtn"));
    },

    onUsersInterfaceTypeGridSelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)){
            Ext.Array.forEach(Ext.getCmp("UsersInterface").getComponent("contextBar").query("buttongroup"), function(btn){btn.disable();});
            Ext.getStore("UsersAdminDataStore").clearFilter(true);
            Ext.getStore("UsersAdminDataStore").removeAll();
            Ext.getCmp("addUserBtn").disable();
        } else {
            Ext.Array.forEach(Ext.getCmp("UsersInterface").getComponent("contextBar").query("buttongroup"), function(btn){btn.enable();});
            Ext.getStore("UsersAdminDataStore").clearFilter(true);
            Ext.getStore("UsersAdminDataStore").filter("typeId",selected[0].get("id"));
            Ext.getStore("UsersAdminDataStore").loadPage(1);
            Ext.getCmp("addUserBtn").enable();
        }
    },

    onUsersInterfaceCenterGridSelectionChange: function(model, selected, eOpts) {
        Ext.getCmp("editUserBtn").disable();
        Ext.getCmp("removeUserBtn").disable();
        if (Ext.isEmpty(selected)){
        } else if (selected.length==1) {
            Ext.getCmp("editUserBtn").enable();
            Ext.getCmp("removeUserBtn").enable();
        } else {
            Ext.getCmp("removeUserBtn").enable();
        }
    },

    onAddUserBtnClick: function(button, e, eOpts) {
        var myType=Ext.getCmp("usersInterfaceTypeGrid").getSelectionModel().getLastSelected();
        this.fireUserCreate(myType);
    },

    onEditUserBtnClick: function(button, e, eOpts) {
        var record=Ext.getCmp("usersInterfaceCenterGrid").getSelectionModel().getLastSelected();
        this.fireUserEdit(record);
    },

    onRemoveUserBtnClick: function(button, e, eOpts) {
        Ext.getCmp("usersInterfaceCenterGrid").getStore().remove(Ext.getCmp("usersInterfaceCenterGrid").getSelectionModel().getSelection());
    },

    onUsersInterfaceCenterGridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp("editUserBtn").fireEvent("click",Ext.getCmp("editUserBtn"));
    },

    resetInterfaceNoSelect: function() {
        Ext.Array.forEach(Ext.getCmp("UserTypesInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.disable();});
        Ext.getCmp("removeUTBtn").disable();
        Ext.getCmp("UserTypesInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("UserTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "User types ", iconCls:"user",localiserId:"userTypesLaunchBtn"}));
        Ext.getCmp('UTeditFields').removeAll();
        Ext.getCmp("UTfieldUp").disable();
        Ext.getCmp("UTfieldDown").disable();
        Ext.getCmp("UTfieldDeleter").disable();
        Ext.getCmp('UTFieldId').setValue();
        Ext.getCmp("UTFieldConfigsBox").removeAll();
        Ext.getCmp("UTcenterZone").disable();
        Ext.getCmp("userTypesEditForm").getForm().reset();
        Ext.getCmp("UserTypesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').hide();
    },

    resetInterfaceSelect: function(record) {
        var me =this;

        Ext.Array.forEach(Ext.getCmp("UserTypesInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.enable();});
        Ext.getCmp("removeUTBtn").enable();
        Ext.getCmp("UserTypesInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("UserTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "User types ", iconCls:"user",localiserId:"userTypesLaunchBtn"}));
        Ext.getCmp("UserTypesInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: record.get("type"), iconCls:"user"}));
        Ext.getCmp("UTcenterZone").enable();
        Ext.getCmp("UTfieldUp").disable();
        Ext.getCmp("UTfieldDown").disable();
        Ext.getCmp('UTFieldId').setValue();
        Ext.getCmp("userTypesEditForm").getForm().setValues(record.getData());
        Ext.getCmp("UTfieldDeleter").disable();
        Ext.getCmp("UTFieldConfigsBox").removeAll();
        var metaBox = Ext.getCmp("UserTypesInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
        var values= record.getData();
        values.creation= Ext.Date.format(values.createTime, Ext.Date.defaultFormat);
        values.derniereModification= Ext.Date.format(values.lastUpdateTime, Ext.Date.defaultFormat);
        metaBox.update(values);
        metaBox.show();
        var selector= [];
        Ext.Array.forEach(record.get("vocabularies"),function(vocabId){
            if (!Ext.isEmpty(Ext.getCmp("vocabulariesUTGrid").getStore().findRecord("id", vocabId))){
                selector.push(Ext.getCmp("vocabulariesUTGrid").getStore().findRecord("id", vocabId));
            }
        });
        Ext.getCmp("vocabulariesUTGrid").getSelectionModel().select(selector);


        var targetZone=Ext.getCmp('UTeditFields');
        Ext.suspendLayouts();
        targetZone.removeAll();
        Ext.Array.forEach(record.get("fields"),function(field){
            me.renderUTField(field, targetZone);
        });
        Ext.resumeLayouts();
        Ext.getCmp("UTeditFields").doLayout();
        var task = new Ext.util.DelayedTask(function(){
            Ext.getCmp("UTeditFields").doLayout();
        });
        task.delay(200);
        if ((!ACL.interfaceRights["write.ui.userTypes"])||(record.get("readOnly"))) {
            Ext.Array.forEach(Ext.getCmp("userTypesEditForm").query("field"), function(thing){thing.setReadOnly(true);});
            Ext.getCmp("removeUTBtn").disable();
            Ext.getCmp("saveUTBtn").disable();
            Ext.getCmp("UTImportBtn").disable();
            Ext.getCmp("UTfieldDeleter").up().disable();
        } else {
            Ext.Array.forEach(Ext.getCmp("userTypesEditForm").query("field"), function(thing){thing.setReadOnly(false);});
            Ext.getCmp("removeUTBtn").enable();
            Ext.getCmp("saveUTBtn").enable();
            Ext.getCmp("UTImportBtn").enable();
            Ext.getCmp("UTfieldDeleter").up().enable();
        }



    },

    renderUTField: function(protoData, renderTarget, isUserCU) {
        var me=this;
        var configurator=protoData.config;
        if (!Ext.isEmpty(configurator.i18n)){
            var BOLanguage=Ext.getStore("CurrentUserDataStore").getRange()[0].get("language");
            if (!Ext.isEmpty(configurator.i18n[BOLanguage])){
                if (!Ext.isEmpty(configurator.i18n[BOLanguage].fieldLabel)){
                    configurator.fieldLabel=configurator.i18n[BOLanguage].fieldLabel;
                }
                if (!Ext.isEmpty(configurator.i18n[BOLanguage].tooltip)){
                    configurator.tooltip=configurator.i18n[BOLanguage].tooltip;
                }
            }
        }
        if (protoData.cType == 'combobox') {
            var myStore=  Ext.create('Ext.data.Store', Ext.clone(protoData.config.store));
            configurator.store = myStore;
        }
        var newField= Ext.create(protoData.cType, configurator);
        newField.config=protoData.config;
        newField.protoId=protoData.protoId;
        newField.configFields=Ext.getStore("UTFieldTypes").findRecord("id", protoData.protoId).get("configFields");
        newField.cType=protoData.cType;
        newField.anchor = '90%';
        newField.style = '{float:left;}';
        var casing =Ext.widget('ChampTC');
        casing.add(newField);
        casing.getComponent('helpBouton').setTooltip(configurator.tooltip);
        if (Ext.isEmpty(configurator.tooltip)){
            casing.getComponent('helpBouton').hidden=true;
        } 
        if (isUserCU){
        } else {
            if (!me.nameAvailable(newField.name)) {
                var duplic = 1;
                while (!me.nameAvailable(newField.name+duplic)){
                    duplic++;
                }
                newField.name=newField.name+duplic;
                newField.config.name=newField.config.name+duplic;

            }
        }
        renderTarget.add(casing);
    },

    nameAvailable: function(name) {
        var usedNames=["email","login","password"]; //ADD OTHER ONES
        Ext.Array.forEach(Ext.getCmp('UTeditFields').query("field"), function(field){
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
        Ext.Array.forEach(target.query("ChampTC"), function(ctc){
            var field=ctc.getComponent(1);
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
        var usedNames=["email","login","password"]; //ADD OTHER ONES
        Ext.Array.forEach(Ext.getCmp('UTeditFields').query("field"), function(field){
            if (field.getId()!=Ext.getCmp(Ext.getCmp('UTFieldId').getValue()).getId()){
                Ext.Array.include(usedNames,field.name);
            }
        });
        if (Ext.Array.contains(usedNames,name)){
            return(Rubedo.RubedoAutomatedElementsLoc.fieldNameAlreadyUsedError);
        } else {
            return(true);
        }
    },

    fireUserCreate: function(userType) {
        var me=this;
        var myEditor=Ext.widget("UserCreateUpdateWindow", {title:"New user "+userType.get("type")});
        myEditor.show();
        var targetZone=Ext.getCmp("userCUFields");
        Ext.Array.forEach(userType.get("fields"),function(field){
            me.renderUTField(field, targetZone, true);
        });
        me.renderTaxoFields(userType);
        Ext.getCmp("userCUSaveBtn").on("click", function(){
            me.createUser(userType);
        });
    },

    renderTaxoFields: function(DAMType, useSep) {
        var formTaxoTC =  Ext.getCmp('userCUTaxonomy');
        var lesTaxo = DAMType.get("vocabularies");
        if (Ext.isEmpty(lesTaxo)) {
            //formTaxoTC.hide();
        } else {
            var i=0;
            for (i=0; i<lesTaxo.length; i++) {
                if (useSep){
                    var leVocab = Ext.getStore('TaxonomyForDam2').findRecord('id', lesTaxo[i]);
                } else {
                    var leVocab = Ext.getStore('TaxonomyForU').findRecord('id', lesTaxo[i]);
                }
                if (!Ext.isEmpty(leVocab)){
                    if (leVocab.get("inputAsTree")){
                        var storeT = Ext.create("Ext.data.TreeStore", {
                            model:"Rubedo.model.taxonomyTermModel",
                            remoteFilter:"true",
                            proxy: {
                                type: 'ajax',
                                api: {
                                    read: 'taxonomy-terms/tree'
                                },
                                reader: {
                                    type: 'json',
                                    messageProperty: 'message'
                                },
                                encodeFilters: function(filters) {
                                    var min = [],
                                        length = filters.length,
                                        i = 0;

                                    for (; i < length; i++) {
                                        min[i] = {
                                            property: filters[i].property,
                                            value   : filters[i].value
                                        };
                                        if (filters[i].type) {
                                            min[i].type = filters[i].type;
                                        }
                                        if (filters[i].operator) {
                                            min[i].operator = filters[i].operator;
                                        }
                                    }
                                    return this.applyEncoding(min);
                                }
                            },
                            filters: {
                                property: 'vocabularyId',
                                value: leVocab.get("id")
                            }

                        });
                        var toUse="Ext.ux.TreePicker";
                        if(leVocab.get("multiSelect")){toUse="Ext.ux.TreeMultiPicker";}
                        if(leVocab.get("id")=='navigation'){storeT.getProxy().api={read:"taxonomy-terms/navigation-tree"};}
                        storeT.load();
                        var selecteur = Ext.create(toUse, {
                            name:leVocab.get("id"),
                            fieldLabel: leVocab.get("name"),
                            store: storeT,
                            anchor:"90%",
                            ignoreIsNotPage:true,
                            displayField:"text",
                            allowBlank: !leVocab.data.mandatory,
                            plugins:[Ext.create("Ext.ux.form.field.ClearButton")]
                        });


                    } else {
                        var storeT = Ext.create('Ext.data.JsonStore', {
                            model:"Rubedo.model.taxonomyTermModel",
                            remoteFilter:"true",
                            proxy: {
                                type: 'ajax',
                                api: {
                                    read: 'taxonomy-terms'
                                },
                                reader: {
                                    type: 'json',
                                    messageProperty: 'message',
                                    root: 'data'
                                },
                                encodeFilters: function(filters) {
                                    var min = [],
                                        length = filters.length,
                                        i = 0;

                                    for (; i < length; i++) {
                                        min[i] = {
                                            property: filters[i].property,
                                            value   : filters[i].value
                                        };
                                        if (filters[i].type) {
                                            min[i].type = filters[i].type;
                                        }
                                        if (filters[i].operator) {
                                            min[i].operator = filters[i].operator;
                                        }
                                    }
                                    return this.applyEncoding(min);
                                }
                            },
                            filters: {
                                property: 'vocabularyId',
                                value: leVocab.get("id")
                            }

                        });
                        storeT.on("beforeload", function(s,o){
                            o.filters=Ext.Array.slice(o.filters,0,1);
                            if (!Ext.isEmpty(o.params.comboQuery)){

                                var newFilter=Ext.create('Ext.util.Filter', {
                                    property:"text",
                                    value:o.params.comboQuery,
                                    operator:'like'
                                });

                                o.filters.push(newFilter);

                            }


                        });
                        var selecteur = Ext.widget('comboboxselect', {
                            name:leVocab.get("id"),
                            anchor:"90%",
                            fieldLabel: leVocab.get("name"),
                            autoScroll: false,
                            store: storeT,
                            queryMode: 'remote',
                            queryParam: 'comboQuery',
                            minChars:3,
                            grow:false,
                            displayField: 'text',
                            valueField: 'id',
                            filterPickList: true,
                            typeAhead: true,
                            forceSelection: !leVocab.data.expandable,
                            createNewOnEnter: leVocab.data.expandable,
                            multiSelect: leVocab.data.multiSelect,
                            allowBlank: !leVocab.data.mandatory
                        });

                    }
                    var enrobage =Ext.widget('ChampTC');
                    enrobage.add(selecteur);
                    enrobage.getComponent('helpBouton').setTooltip(leVocab.data.helpText);
                    if (Ext.isEmpty(leVocab.data.helpText)){enrobage.getComponent('helpBouton').hide();}
                    formTaxoTC.add(enrobage);

                }}}
    },

    fireUserEdit: function(record) {
        var me=this;
        var myEditor=Ext.widget("UserCreateUpdateWindow", {title:record.get("name")});
        userType=Ext.getStore("UserTypesForUsers").findRecord("id",record.get("typeId"));
        myEditor.show();
        var targetZone=Ext.getCmp("userCUFields");
        Ext.Array.forEach(userType.get("fields"),function(field){
            me.renderUTField(field, targetZone, true);
        });
        me.renderTaxoFields(userType);
        var fieldUpdater=record.get("fields");
        if (Ext.isEmpty(fieldUpdater)){
            fieldUpdater={ };
        }
        fieldUpdater.name=record.get("name");
        fieldUpdater.email=record.get("email");
        Ext.getCmp('userCUFields').getForm().setValues(fieldUpdater);
        Ext.getCmp('userCUTaxonomy').getForm().setValues(record.get("taxonomy"));
        var credentialsForm=Ext.widget("userUpdateCreadentialsForm");
        myEditor.getComponent(0).add(credentialsForm);
        credentialsForm.getForm().setValues(record.getData());
        Ext.getCmp("userCUSaveBtn").on("click", function(){
            me.editUser(record);
        });
    },

    createUser: function(userType) {
        var fieldsForm=Ext.getCmp("userCUFields");
        var taxoForm=Ext.getCmp("userCUTaxonomy");
        if ((fieldsForm.isValid())&&(taxoForm.isValid())){
            var newUser={ };
            var fieldValues=fieldsForm.getValues();
            newUser.name=fieldValues.name;
            newUser.email=fieldValues.email;
            newUser.login=newUser.email;
            delete fieldValues.name;
            delete fieldValues.email;
            newUser.fields=fieldValues;
            newUser.taxonomy=taxoForm.getValues();
            newUser.typeId=userType.get("id");
            newUser.groups=[userType.get("defaultGroup")];
            newUser.defaultGroup=userType.get("defaultGroup");
            Ext.getCmp("usersInterfaceCenterGrid").getStore().add(newUser);
            Ext.getCmp("UserCreateUpdateWindow").close();
        }
    },

    editUser: function(record) {
        var fieldsForm=Ext.getCmp("userCUFields");
        var taxoForm=Ext.getCmp("userCUTaxonomy");
        if ((fieldsForm.isValid())&&(taxoForm.isValid())){
            var newUser={ };
            var fieldValues=fieldsForm.getValues();
            newUser.name=fieldValues.name;
            newUser.email=fieldValues.email;
            delete fieldValues.name;
            delete fieldValues.email;
            newUser.fields=fieldValues;
            newUser.taxonomy=taxoForm.getValues();
            record.set(newUser);
            Ext.getCmp("UserCreateUpdateWindow").close();
        }
    },

    init: function(application) {
        this.control({
            "#newUTBtn": {
                click: this.onNewUTBtnClick
            },
            "#createNewUTBtn": {
                click: this.onCreateNewUTBtnClick
            },
            "#mainUTGrid": {
                select: this.onMainUTGridSelectionChange
            },
            "#removeUTBtn": {
                click: this.onRemoveUTBtnClick
            },
            "#saveUTBtn": {
                click: this.onSaveUTBtnClick
            },
            "#copyUTBtn": {
                click: this.onCopyUTBtnClick
            },
            "#newUTFieldBtn": {
                click: this.onNewUTFieldBtnClick
            },
            "#UTFieldInsertBtn": {
                click: this.onUTFieldInsertBtnClick
            },
            "#UTeditFields ChampTC": {
                afterrender: this.selectionEvents
            },
            "#UTfieldUp": {
                click: this.onUTfieldUpClick
            },
            "#UTfieldDown": {
                click: this.onUTfieldDownClick
            },
            "#UTfieldDeleter": {
                click: this.onUTfieldDeleterClick
            },
            "#UTFieldSelectGrid": {
                itemdblclick: this.onUTFieldSelectGridItemDblClick
            },
            "#usersInterfaceTypeGrid": {
                selectionchange: this.onUsersInterfaceTypeGridSelectionChange
            },
            "#usersInterfaceCenterGrid": {
                selectionchange: this.onUsersInterfaceCenterGridSelectionChange,
                itemdblclick: this.onUsersInterfaceCenterGridItemDblClick
            },
            "#addUserBtn": {
                click: this.onAddUserBtnClick
            },
            "#editUserBtn": {
                click: this.onEditUserBtnClick
            },
            "#removeUserBtn": {
                click: this.onRemoveUserBtnClick
            }
        });
    }

});
