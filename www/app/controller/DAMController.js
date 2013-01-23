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

    selectDAMType: function(tablepanel, selections, options) {
        if (Ext.isEmpty(selections)){
            this.resetInterfaceNoSelect();
        } else {
            this.resetInterfaceSelect(selections[0]);
        }
    },

    onAddDAMBtnClick: function(button, e, options) {
        var DAMType= Ext.getCmp("DAMMTGrid").getSelectionModel().getLastSelected();
        var myEditor = Ext.widget("DAMCreateUpdateWindow");
        Ext.getCmp("DAMFieldBox").remove(Ext.getCmp("DAMFieldBox").getComponent(2));
        myEditor.show();
        this.renderDAMTypeFields(DAMType, false);
        this.renderTaxoFields(DAMType);
        Ext.getCmp("DAMCreateUpdateWindow").doLayout();
    },

    selectDAM: function(tablepanel, selections, options) {
        Ext.getCmp("DAMDeleteBtn").enable();
        Ext.getCmp("DAMUpdateBtn").enable();
        Ext.getCmp("DAMROBtn").enable();
        if (Ext.isEmpty(selections)) {
            Ext.getCmp("DAMDeleteBtn").disable();
            Ext.getCmp("DAMUpdateBtn").disable();
            Ext.getCmp("DAMROBtn").disable();
            var customMeta = "<b> "+Ext.getCmp("DAMMTGrid").getSelectionModel().getLastSelected().get("type")+ "</b>";
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').show();
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').update(customMeta);
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent(0).setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/folder.png');

        } else if (selections.length==1) {
            var customMeta = "<b> "+selections[0].get("title")+"</b></br><b>Création : </b>"+Ext.Date.format(selections[0].get("createTime"), 'd-m-Y')+"<b> Dernière modification : </b>"+Ext.Date.format(selections[0].get("lastUpdateTime"), 'd-m-Y')+"<b> Auteur : </b>"+selections[0].get("createUser").fullName;
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').show();
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').update(customMeta);
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent(0).setSrc("dam/get-thumbnail?id="+selections[0].get("id"));
        } else {
            Ext.getCmp("DAMUpdateBtn").disable();
            var customMeta = "<b> "+selections.length+" médias"+ "</b>";
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').show();
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').update(customMeta);
            Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent(0).setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/images.png');

        }
    },

    onDAMDeleteBtnClick: function(button, e, options) {
        Ext.getCmp("DAMCenter").getStore().remove(Ext.getCmp("DAMCenter").getSelectionModel().getSelection());
    },

    onDAMSubmitBtnClick: function(button, e, options) {
        button.up().setLoading(true);
        var me=this;
        var form=button.up().getForm();
        form.submit({
            clientValidation: true,
            url: 'dam/create',
            params: { 
                typeId: Ext.getCmp("DAMMTGrid").getSelectionModel().getLastSelected().get("id"),
                taxonomy: me.getTaxoValues()
            },
            success: function(form, action) {
                button.up().setLoading(false);
                button.up().up().close();
                Ext.getStore("DAMStore").load();
            },
            failure: function(form, action) {
                button.up().setLoading(false);
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                    Ext.Msg.alert('Erreur', 'Certains champs sont invalides');
                    break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                    Ext.Msg.alert('Erreur', 'Erreur Ajax');
                    break;
                    case Ext.form.action.Action.SERVER_INVALID:
                    Ext.Msg.alert('Erreur', action.result.msg);
                }
            }
        });


    },

    onDAMUpdateBtnClick: function(button, e, options) {
        var record = Ext.getCmp("DAMCenter").getSelectionModel().getLastSelected();
        var DAMType= Ext.getCmp("DAMMTGrid").getSelectionModel().getLastSelected();
        var myEditor = Ext.widget("DAMCreateUpdateWindow");
        myEditor.setTitle("Edition du média \" "+record.get("title")+" \"");
        Ext.getCmp("DAMSubmitBtn").hide();
        Ext.getCmp("DAMSubmitUpdateBtn").show();
        Ext.getCmp("DAMFieldBox").remove(Ext.getCmp("DAMFieldBox").getComponent(1));
        myEditor.show();
        this.renderDAMTypeFields(DAMType, true);
        this.renderTaxoFields(DAMType);
        var valueBox=record.get("fields");
        valueBox.title=record.get("title");
        valueBox.originalFileId=record.get("originalFileId");
        valueBox=Ext.Object.merge(valueBox,record.get("taxonomy"));
        myEditor.getComponent(0).getForm().setValues(valueBox);
        Ext.getCmp("DAMCreateUpdateWindow").doLayout();
    },

    onDAMSubmitUpdateBtnClick: function(button, e, options) {
        var me = this;
        if(Ext.getCmp("DAMFieldBox").getForm().isValid()){
            var record = Ext.getCmp("DAMCenter").getSelectionModel().getLastSelected();
            record.beginEdit();
            record.set("title",Ext.getCmp("DAMFieldBox").getComponent(0).getComponent(0).getValue());
            record.set("originalFileId",Ext.getCmp("DAMFieldBox").getComponent(1).getComponent(0).getValue());
            record.set("fields",Ext.getCmp("DAMFieldBox").getForm().getValues());
            record.set("taxonomy", me.getTaxoValues());
            record.endEdit();
            button.up().up().close();
        }
    },

    onDAMROBtnClick: function(button, e, options) {
        var record = Ext.getCmp("DAMCenter").getSelectionModel().getLastSelected();
        var DAMType= Ext.getCmp("DAMMTGrid").getSelectionModel().getLastSelected();
        var myEditor = Ext.widget("DAMCreateUpdateWindow");
        myEditor.setTitle(record.get("title"));
        Ext.getCmp("DAMSubmitBtn").hide();
        Ext.getCmp("DAMSubmitUpdateBtn").hide();
        Ext.getCmp("DAMSwitchEditBtn").show();
        Ext.getCmp("DAMFieldBox").remove(Ext.getCmp("DAMFieldBox").getComponent(1));
        myEditor.show();
        this.renderDAMTypeFields(DAMType, true);
        this.renderTaxoFields(DAMType);
        var valueBox=record.get("fields");
        valueBox.title=record.get("title");
        valueBox.originalFileId=record.get("originalFileId");
        valueBox=Ext.Object.merge(valueBox,record.get("taxonomy"));
        myEditor.getComponent(0).getForm().setValues(valueBox);
        Ext.Array.forEach(Ext.getCmp("DAMFieldBox").query("field"), function(thing){thing.setReadOnly(true);});
        Ext.getCmp("DAMCreateUpdateWindow").doLayout();
    },

    onDAMSwitchEditBtnClick: function(button, e, options) {
        var record = Ext.getCmp("DAMCenter").getSelectionModel().getLastSelected();
        var myEditor = Ext.getCmp("DAMCreateUpdateWindow");
        button.hide();
        Ext.Array.forEach(Ext.getCmp("DAMFieldBox").query("field"), function(thing){thing.setReadOnly(false);});
        Ext.getCmp("DAMSubmitUpdateBtn").show();
        myEditor.setTitle("Edition du média \" "+record.get("title")+" \"");


    },

    onGridpanelItemDblClick: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp("DAMUpdateBtn").fireEvent("click", Ext.getCmp("DAMUpdateBtn"));
    },

    resetInterfaceSelect: function(record) {
        var me =this;
        Ext.getCmp("addDAMBtn").enable();
        Ext.Array.forEach(Ext.getCmp("DAMInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.enable();});
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Mèdiathéque <b> > </b>", iconCls:"mediaTypes"}));
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: record.get("type"), iconCls:"folder"}));
        Ext.getStore("DAMStore").getProxy().extraParams.tFilter="[{\"property\":\"typeId\",\"value\":\""+record.get("id")+"\"}]";
        Ext.getStore("DAMStore").load();
        var customMeta = "<b> "+record.get("type")+ "</b>";
        Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').show();
        Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').update(customMeta);
        Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent(0).setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/folder.png');

    },

    resetInterfaceNoSelect: function() {
        Ext.Array.forEach(Ext.getCmp("DAMInterface").getComponent("contextBar").query("buttongroup"), function(btng){btng.disable();});
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").removeAll();
        Ext.getCmp("DAMInterface").getComponent("breadcrumb").add(Ext.widget("button", {text: "Types de médias", iconCls:"mediaTypes"}));
        Ext.getCmp("addDAMBtn").disable();
        Ext.getStore("DAMStore").removeAll();
        Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').hide();
        Ext.getCmp("DAMInterface").getDockedComponent('barreMeta').getComponent(0).setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/images.png');
    },

    renderDAMTypeFields: function(DAMType, updateMode) {
        var me=this;
        var fieldBox=Ext.getCmp("DAMFieldBox");
        Ext.Array.forEach(DAMType.get("fields"),function(field){
            me.renderMTField(Ext.clone(field), fieldBox, updateMode);
        });
    },

    renderMTField: function(protoData, renderTarget, updateMode) {
        var me=this;
        var configurator=protoData.config;
        if (protoData.cType == 'combobox') {
            var myStore=  Ext.create('Ext.data.Store', Ext.clone(protoData.config.store));
            configurator.store = myStore;
        } else if ((updateMode)&&(protoData.cType == 'Ext.form.field.File')){
            protoData.cType="Rubedo.view.GFSFileField";
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
        renderTarget.insert(renderTarget.items.items.length-4,casing);
    },

    renderTaxoFields: function(DAMType) {
        var formTaxoTC =  Ext.getCmp('DAMTaxoBox');
        var lesTaxo = DAMType.get("vocabularies");
        var i=0;
        for (i=0; i<lesTaxo.length; i++) {
            var leVocab = Ext.getStore('TaxonomyForDAM').findRecord('id', lesTaxo[i]);
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
                submitValue:false,
                autoScroll: false,
                store: storeT,
                queryMode: 'remote',
                queryParam: 'comboQuery',
                minChars:3,
                displayField: 'text',
                valueField: 'id',
                filterPickList: true,
                typeAhead: true,
                forceSelection: !leVocab.data.expandable,
                createNewOnEnter: leVocab.data.expandable,
                multiSelect: leVocab.data.multiSelect,
                allowBlank: !leVocab.data.mandatory
            });
            var enrobage =Ext.widget('ChampTC');
            enrobage.add(selecteur);
            enrobage.getComponent('helpBouton').setTooltip(leVocab.data.helpText);
            if (Ext.isEmpty(leVocab.data.helpText)){enrobage.getComponent('helpBouton').hide();}
            formTaxoTC.add(enrobage);

        }
    },

    getTaxoValues: function() {
        var values = { };
        Ext.Array.forEach(Ext.getCmp("DAMTaxoBox").query("field"),function(field){
            values[field.name]=field.getValue();
        });
        return(values);
    },

    init: function(application) {
        this.control({
            "#DAMMTGrid": {
                selectionchange: this.selectDAMType
            },
            "#addDAMBtn": {
                click: this.onAddDAMBtnClick
            },
            "#DAMCenter": {
                selectionchange: this.selectDAM,
                itemdblclick: this.onGridpanelItemDblClick
            },
            "#DAMDeleteBtn": {
                click: this.onDAMDeleteBtnClick
            },
            "#DAMSubmitBtn": {
                click: this.onDAMSubmitBtnClick
            },
            "#DAMUpdateBtn": {
                click: this.onDAMUpdateBtnClick
            },
            "#DAMSubmitUpdateBtn": {
                click: this.onDAMSubmitUpdateBtnClick
            },
            "#DAMROBtn": {
                click: this.onDAMROBtnClick
            },
            "#DAMSwitchEditBtn": {
                click: this.onDAMSwitchEditBtnClick
            }
        });
    }

});
