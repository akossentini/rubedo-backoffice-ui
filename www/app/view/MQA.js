/*
 * File: app/view/MQA.js
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

Ext.define('Rubedo.view.MQA', {
    extend: 'Ext.window.Window',
    alias: 'widget.MQA',

    requires: [
        'Rubedo.view.MyToolbar56',
        'Rubedo.view.assisstantRE5'
    ],

    height: 373,
    id: 'MQA',
    width: 469,
    layout: {
        type: 'card'
    },
    title: 'Assistant de requêtage sur médias',
    constrain: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'mytoolbar56',
                    dock: 'bottom'
                }
            ],
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: 'Choix des types de médias',
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            id: 'DAMTypeWizCombo',
                            name: 'DAMTypes',
                            fieldLabel: 'Types de media',
                            allowBlank: false,
                            editable: false,
                            displayField: 'type',
                            forceSelection: true,
                            multiSelect: true,
                            store: 'MediaTypesFORDAMPicker',
                            valueField: 'id'
                        }
                    ],
                    listeners: {
                        deactivate: {
                            fn: me.onFormDeactivate,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'form',
                    id: 'assisstantRE2',
                    overflowY: 'auto',
                    bodyPadding: 10,
                    title: 'Choix des règles sur la taxonomie'
                },
                {
                    xtype: 'assisstantRE5'
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'anchor'
                    },
                    bodyPadding: 10,
                    title: 'Enregistrement',
                    items: [
                        {
                            xtype: 'button',
                            anchor: '100%',
                            scale: 'large',
                            text: 'Enregistrer'
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onMQARender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onMQABeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onFormDeactivate: function(abstractcomponent, options) {
        abstractcomponent.up().reactToMTChange();
    },

    onMQARender: function(abstractcomponent, options) {
        Ext.getStore("MediaTypesFORDAMPicker").getProxy().extraParams.filter="[{\"property\":\"mainFileType\",\"value\":\""+abstractcomponent.allowedFileType+"\"}]";
        Ext.getStore("MediaTypesFORDAMPicker").on("load",function(a,records){
            if (records.length==1){
                Ext.getCmp("DAMTypeWizCombo").select(records[0]);
            }
        });
        Ext.getStore("MediaTypesFORDAMPicker").load();
        Ext.getStore('TaxonomyForQA').load();
    },

    onMQABeforeClose: function(panel, options) {
        Ext.getStore("MediaTypesFORDAMPicker").removeAll();
        Ext.getStore('TaxonomyForQA').removeAll();
    },

    readMyQuery: function() {
        var mainWin= Ext.getCmp("MQA");
        var result = {};
        result.vocabularies={ };
        result.fieldRules={ };
        Ext.Array.forEach(mainWin.query("field"),function(field){
            if (field.submitValue){
                if (field.isVocabularyField) {
                    if (Ext.isEmpty(result.vocabularies[field.vocabularyId])){
                        result.vocabularies[field.vocabularyId]={ };                
                    }
                    if (Ext.isArray(field.getValue())){
                        result.vocabularies[field.vocabularyId][field.usedRole]=field.getValue();
                    } else {
                        result.vocabularies[field.vocabularyId][field.usedRole]=[field.getValue()];
                    }

                } else if (field.isAddedRuleField){
                    if (Ext.isEmpty(result.fieldRules[field.ruleId])){
                        result.fieldRules[field.ruleId]={ };           
                    }
                    result.fieldRules[field.ruleId][field.usedRole]=field.getValue();
                } else { 
                    result[field.name]=field.getValue();
                }
            }
        });
        if (!Ext.isArray(result.DAMTypes)){
            result.contentTypes=[result.DAMTypes];
        }
        return(result);
    },

    reactToMTChange: function() {
        var keepInMind=false;
        var editorMode = false;
        var simpleMode = false;
        Ext.getCmp('assisstantRE2').removeAll();
        var selectedTypes=Ext.getCmp("DAMTypeWizCombo").getValue();
        var vocabularies= [];
        Ext.Array.forEach(selectedTypes, function(type){
            var myVocs = Ext.getStore("MediaTypesFORDAMPicker").findRecord("id",type).get("vocabularies");
            vocabularies=Ext.Array.merge(vocabularies,myVocs);
        });
        var storeL = Ext.create('Ext.data.Store', {
            fields: ['valeur', 'nom'],
            data : [
            {valeur: 'AND', nom :'ET'},
            {valeur: 'OR', nom :'OU'}
            ]
        });

        var lien = Ext.create('Ext.form.ComboBox', {
            anchor: '100%',
            fieldLabel: 'Relation entre les règles ',
            store: storeL,
            value: 'OU',
            name: "vocabulariesRule",
            queryMode: 'local',
            displayField: 'nom',
            valueField: 'valeur',
            labelWidth: 150,
            editable: false,
            forceSelect: true,
            allowBlank: false

        });
        var champsRegles = [ ];
        champsRegles.push({nom:'Création',
            valeur: {
                cType: 'datefield',
                name: 'creation',
                ruleId:'createTime',
                label: 'Création'
            }
        });
        champsRegles.push({nom:'Dernière modification',
            valeur: {
                cType: 'datefield',
                name: 'derniereModification',
                ruleId:'lastUpdateTime',
                label: 'Dernière modification'
            }});
            Ext.getStore('champsTCARStore').loadData(champsRegles);
            var vocabulaires=vocabularies;
            if (vocabulaires.length>1) {Ext.getCmp('assisstantRE2').add(lien);}
            Ext.Array.remove(vocabulaires,"navigation");
            var k =0;
            for (k=0; k<vocabulaires.length; k++) {

                var leVocab = Ext.getStore('TaxonomyForQA').findRecord('id', vocabulaires[k]);
                var vocabAPlat= [ ];
                //this.miseAPlatTaxo(leVocab.data.termes.children, vocabAPlat);


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
                    vocabularyId:leVocab.get("id"),
                    isVocabularyField:true,
                    usedRole:"terms",
                    anchor:"100%",
                    fieldLabel: leVocab.get("name"),
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
                    multiSelect: Ext.clone(leVocab.data.multiSelect),
                    allowBlank: !leVocab.data.mandatory
                });

                var storeR = Ext.create('Ext.data.Store', {
                    fields: ['valeur', 'nom'],
                    data : [
                    {valeur: 'all', nom :'Contient tous les termes'},
                    {valeur: 'allRec', nom :'Contient tous les termes ou au moins un descendant par terme'},
                    {valeur: 'some', nom :'Contient au moins un des termes'},
                    {valeur: 'someRec', nom :'Contient au moins un des termes ou au moins un des descendants d’un des termes'}
                    ]
                });

                var regle = Ext.create('Ext.form.ComboBox', {
                    name:leVocab.get("id")+"QueryRule",
                    anchor: '100%',
                    vocabularyId:leVocab.get("id"),
                    isVocabularyField:true,
                    usedRole:"rule",
                    fieldLabel: 'Règle',
                    store: storeR,
                    queryMode: 'local',
                    displayField: 'nom',
                    valueField: 'valeur',
                    editable: false,
                    value: 'some',
                    forceSelect: true,
                    allowBlank: false

                });
                if ((keepInMind)&&(editorMode)&&(!Ext.isEmpty(initialQuery.vocabularies[leVocab.get("id")]))){
                    regle.setValue(initialQuery.vocabularies[leVocab.get("id")].rule[0]);
                    selecteur.setValue(initialQuery.vocabularies[leVocab.get("id")].terms);
                }
                if (simpleMode) {
                    regle.setValue("all");
                    regle.setReadOnly(true);
                    regle.hide();
                    selecteur.multiSelect=false;
                    var enrobage=Ext.widget("container", {anchor:"100%", layout:"anchor"});
                } else {


                    var enrobage = Ext.widget('fieldset', {
                        title : leVocab.get("name"),
                        collapsible: true


                    });}
                    enrobage.add(selecteur);
                    enrobage.add(regle);
                    enrobage.collapse();
                    Ext.getCmp('assisstantRE2').add(enrobage);



                }    
    }

});