/*
 * File: app/controller/MainController.js
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

Ext.define('ContentContributor.controller.MainController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.MainController',

    fieldReplicate: function(button, e, options) {
        var nouvChamp=button.up().getComponent(1).cloneConfig();
        nouvChamp.anchor = '90%';
        nouvChamp.style = '{float:left;}';
        var enrobage =Ext.widget('fieldWrapper');
        enrobage.add(nouvChamp);
        enrobage.getComponent('helpBouton').setTooltip("Réplique du champ "+button.up().getComponent(1).fieldLabel);
        var supprimeur = Ext.widget('button', {iconCls: 'close', margin: '0 0 0 5', tooltip: 'Enlever', itemId: 'boutonEffaceurChamps'});
        supprimeur.on('click', function(){
            button.valeursM--;
            button.up().up().remove(supprimeur.up());
        });
        enrobage.add(supprimeur);
        button.up().up().insert(button.up().up().items.indexOf(button.up())+button.valeursM, enrobage);
        button.valeursM++;
    },

    saveContent: function(button, e, options) {
        if (Ext.getCmp("MainForm").getForm().isValid()){
            if (Ext.getCmp("MainForm").isUpdatingContent){

            } else {
                var myFields = Ext.getCmp("MainForm").getForm().getValues();
                var newContent = Ext.create('ContentContributor.model.contentDataModel', {
                    text:myFields.text,
                    fields:myFields,
                    taxonomy: { },
                    online:true,
                    status:button.cStatus,
                    typeId:AppGlobals.typeId

                });
                Ext.getCmp("MainForm").setLoading(true);
                Ext.getStore("Contents").addListener("write", function(){
                    Ext.getCmp("MainForm").setLoading(false);
                    Ext.Msg.alert('Succès', 'Le nouveau contenu a bien été enregistré');
                },this, {single:true});
                    Ext.getStore("Contents").add(newContent);

                }
            } else {
                Ext.Msg.alert('Erreur', 'Certains champs ne sont pas valides');
            }
    },

    initializeContentForm: function(contentType) {
        Ext.getCmp("MainForm").setTitle("Nouveau contenu "+contentType.type);
        this.renderMainFields(contentType.fields);
    },

    renderMainFields: function(fields) {
        var target = Ext.getCmp("MainForm");
        Ext.Array.forEach(fields, function(field,index){
            var configurator=Ext.clone(field.config);
            configurator.labelSeparator=" ";
            var newField= Ext.widget(field.cType, configurator);
            var wrapping= Ext.widget("fieldWrapper");
            newField.anchor = '90%';
            newField.style = '{float:left;}';
            wrapping.add(newField);
            wrapping.getComponent('helpBouton').setTooltip(configurator.tooltip);
            if (Ext.isEmpty(configurator.tooltip)){
                wrapping.getComponent('helpBouton').hidden=true;
            } 
            if (newField.multivalued) {
                enrobage.add(Ext.widget('button', {iconCls: 'add',valeursM: 1, margin: '0 0 0 5', tooltip: 'Valeurs multiples', itemId: 'fieldReplicatorBtn'}));

            }
            target.add(wrapping);


        });


        /*
        var formulaireTC = Ext.getCmp('boiteAChampsContenus');
        var champsD =contentType.get("champs");
        for (g=0; g<champsD.length; g++) {
        var donnees=champsD[g];
        var configurateur = Ext.clone(donnees.config);
        if (donnees.cType =='treepicker'){ 
        var monStore= Ext.getStore(donnees.store);
        configurateur.store = monStore;
        monStore.load();
        }
        else if (donnees.cType == 'combobox') {
        var monStore=  Ext.create('Ext.data.Store', Ext.clone(donnees.store));
        configurateur.store = monStore;
        }
        //begin temporary fix
        configurateur.labelSeparator=" ";
        //end temporary fix
        var nouvChamp = Ext.widget(donnees.cType, configurateur);
        nouvChamp.config=Ext.clone(donnees.config);
        //begin temporary fix
        if(nouvChamp.config.tooltip=="help text"){nouvChamp.config.tooltip="";}
        //end temporary fix
        if (donnees.cType =='triggerfield'){ 
            var Ouvrir = Ext.clone(donnees.ouvrir);
            nouvChamp.onTriggerClick= function() {
                var fenetre = Ext.widget(Ouvrir);
                fenetre.showAt(screen.width/2-200, 100);
            } ; 
            nouvChamp.ouvrir =Ext.clone(donnees.ouvrir);
        }  
        nouvChamp.anchor = '90%';
        nouvChamp.style = '{float:left;}';
        var enrobage =Ext.widget('ChampTC');
        enrobage.add(nouvChamp);
        enrobage.getComponent('helpBouton').setTooltip(nouvChamp.config.tooltip);
        if (Ext.isEmpty(nouvChamp.config.tooltip)){
            enrobage.getComponent('helpBouton').hidden=true;
        } 
        if (nouvChamp.multivalued) {
            enrobage.add(Ext.widget('button', {iconCls: 'add',valeursM: 1, margin: '0 0 0 5', tooltip: 'Valeurs multiples', itemId: 'fieldReplicatorBtn'}));

        };
        formulaireTC.add(enrobage);

    }

    */
    },

    init: function(application) {
        Ext.require("Rubedo.view.CKEField");
        Ext.define('AppGlobals', {singleton: true});

        this.control({
            "[itemId= 'boutonReplicateurChamps']": {
                click: this.fieldReplicate
            },
            "#mainDraftBtn, #mainSubmitBtn, #mainPublishBtn": {
                click: this.saveContent
            }
        });
    },

    mainAction: function() {
        var me=this;
        var options = decodeURIComponent(window.location.search.slice(1))
        .split('&')
        .reduce(function _reduce (a, b) {
            b = b.split('=');
            a[b[0]] = b[1];
            return a;
        }, {});
            if (!Ext.isEmpty(options.typeId)){
                Ext.Ajax.request({
                    url: '../../content-types/find-one',
                    params: {
                        id: options.typeId
                    },
                    success: function(response){
                        var result = Ext.JSON.decode(response.responseText).data;
                        AppGlobals.typeId=options.typeId;
                        Ext.getCmp("MainViewport").add(Ext.widget("MainForm"));
                        me.initializeContentForm(result);
                    }
                });
            }

    }

});
