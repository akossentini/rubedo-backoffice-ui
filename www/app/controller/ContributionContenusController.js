/*
 * File: app/controller/ContributionContenusController.js
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

Ext.define('Rubedo.controller.ContributionContenusController', {
    extend: 'Ext.app.Controller',

    models: [
        'contenusDataModel'
    ],
    stores: [
        'ContenusDataJson'
    ],
    views: [
        'AjouterContenu'
    ],

    typeSelect: function(dataviewmodel, record, options) {
        var filArianne = Ext.getCmp("TypesContenusGrid").findParentByType('window').getDockedComponent('filArianne');
        var typeFil = filArianne.getComponent('type');
        if (Ext.isDefined(typeFil)) {typeFil.setText(record.data.type);}
        else { typeFil= Ext.widget('button',{iconCls: "folder", text:record.data.type, itemId:'type'});
        filArianne.add(typeFil);
    }
    this.getContenusDataJsonStore().clearFilter();
    this.getContenusDataJsonStore().filter("typeId",record.get("id"));
    this.getContenusDataJsonStore().load();
    Ext.Array.forEach(Ext.getCmp("contributionContenus").getComponent("contextBar").query("buttongroup"), function(btn){btn.enable();});
    Ext.getCmp("ajoutPanierContenus").disable();
    Ext.getCmp("boutonSupprimerContenu").disable();
    Ext.getCmp("boutonModifierContenu").disable();
    Ext.getCmp("boutonCopierContenus").disable();
    var  customMeta = record.get("type");
    var imageMeta = Ext.getCmp('contributionContenus').getDockedComponent('barreMeta').getComponent('imageBarreMeta');
    imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/folder.png');  
    var boiteMeta = Ext.getCmp("contributionContenus").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
    boiteMeta.update(customMeta);
    },

    contentSaveAndPublish: function(button, e, options) {
        this.nContenuRecorder('published',button.isUpdate);
    },

    contentSave: function(button, e, options) {
        this.nContenuRecorder('draft', button.isUpdate);
    },

    contentDelete: function(button, e, options) {
        var cible = Ext.getCmp('ContenusGrid').getSelectionModel().getSelection();
        this.getContenusDataJsonStore().remove(cible);
    },

    contentEdit: function(button, e, options) {
        var cible = Ext.getCmp('ContenusGrid').getSelectionModel().getSelection()[0];
        Ext.getCmp("boutonAjouterContenu").fireEvent("click");
        Ext.getCmp('boiteAChampsContenus').getForm().setValues(cible.get("champs"));
        Ext.Object.each(cible.get("champs"), function(key, value, myself){
            if (Ext.isArray(value)) {
                var multiField=Ext.getCmp('boiteAChampsContenus').query('[name='+key+']')[0];
                var y=0;
                if (multiField.multivalued) {
                    Ext.Array.each(value,function(val,index){
                        if (index>0) {
                            multiField.up().getComponent('boutonReplicateurChamps').fireEvent("click",multiField.up().getComponent('boutonReplicateurChamps'));
                        }
                        Ext.getCmp('boiteAChampsContenus').query('[name='+key+']')[index].setValue(val);
                    }); 
                }
            }
        });

        Ext.getCmp("boiteATaxoContenus").getForm().setValues(cible.get("taxonomie"));
        Ext.getCmp("boutonEnregistrerNouveauContenu").isUpdate=true;
        Ext.getCmp("boutonPublierNouveauContenu").isUpdate=true;
        Ext.getCmp('ajouterContenu').setTitle("Modifier un contenu");
    },

    contentsSelect: function(tablepanel, selections, options) {
        var boiteMeta = Ext.getCmp("contributionContenus").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
        var imageMeta = Ext.getCmp('contributionContenus').getDockedComponent('barreMeta').getComponent('imageBarreMeta');
        var customMeta= "";
        if (selections.length===0) {
            Ext.getCmp("ajoutPanierContenus").disable();
            Ext.getCmp("boutonSupprimerContenu").disable();
            Ext.getCmp("boutonModifierContenu").disable();
            Ext.getCmp("boutonCopierContenus").disable();
            customMeta = Ext.getCmp('TypesContenusGrid').getSelectionModel().getLastSelected().data.type;
            imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/folder.png');    

        } else if (selections.length==1) {
            Ext.getCmp("ajoutPanierContenus").enable();
            Ext.getCmp("boutonSupprimerContenu").enable();
            Ext.getCmp("boutonModifierContenu").enable();
            Ext.getCmp("boutonCopierContenus").enable();
            customMeta=selections[0].data.text+"</br> Creation : "+selections[0].data.creation+
            " Dernière modification : "+selections[0].data.derniereModification+" Version : "+selections[0].data.version+
            " Auteur : "+selections[0].data.auteur;
            imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_full.png');

        } else {
            Ext.getCmp("ajoutPanierContenus").enable();
            Ext.getCmp("boutonSupprimerContenu").enable();
            Ext.getCmp("boutonModifierContenu").disable();
            Ext.getCmp("boutonCopierContenus").disable();
            customMeta=selections.length+" Contenus";
            imageMeta.setSrc('resources/icones/'+MyPrefData.iconsDir+'/48x48/page_full.png');

        }

        boiteMeta.update(customMeta);
    },

    doubleClickEdit: function(tablepanel, record, item, index, e, options) {
        Ext.getCmp("boutonModifierContenu").fireEvent("click");
    },

    putContentsOnline: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){

            content.set("online", true);
        });
        Ext.getStore("ContenusDataJson").resumeAutoSync();
        Ext.getStore("ContenusDataJson").sync();
    },

    putContentsOffline: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){
            content.set("online", false);
        });
        Ext.getStore("ContenusDataJson").resumeAutoSync();
        Ext.getStore("ContenusDataJson").sync();
    },

    contentAcceptPublish: function(button, e, options) {
        Ext.getStore("ContenusDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection(), function(content){

            content.set("etat", "published");
        });
        Ext.getStore("ContenusDataJson").resumeAutoSync();
        Ext.getStore("ContenusDataJson").sync();
    },

    nContenuRecorder: function(etat, update) {
        if ((Ext.getCmp("boiteAChampsContenus").getForm().isValid())&&(Ext.getCmp("boiteATaxoContenus").getForm().isValid())){
            var champs=Ext.getCmp("boiteAChampsContenus").getForm().getValues();
            var taxonomie =Ext.getCmp("boiteATaxoContenus").getForm().getValues();
            if (update) {
                var myRec =Ext.getCmp("ContenusGrid").getSelectionModel().getSelection()[0];
                myRec.beginEdit();
                myRec.set("text",champs.text);
                myRec.set("champs",champs);
                myRec.set("taxonomie",taxonomie);
                myRec.set("etat",etat);
                myRec.endEdit();

            } 
            else {
                var nContenu = Ext.create('model.contenusDataModel', {
                    text: champs.text,
                    champs: champs,
                    taxonomie:taxonomie,
                    etat: etat,
                    typeId: Ext.getCmp('TypesContenusGridView').getSelectionModel().getLastSelected().get("id")

                });

                Ext.getCmp('ContenusGrid').getStore().add(nContenu);
            }
            Ext.getCmp('ajouterContenu').close();
        }
    },

    init: function(application) {
        this.control({
            "#TypesContenusGrid": {
                select: this.typeSelect
            },
            "#boutonPublierNouveauContenu": {
                click: this.contentSaveAndPublish
            },
            "#boutonEnregistrerNouveauContenu": {
                click: this.contentSave
            },
            "#boutonSupprimerContenu": {
                click: this.contentDelete
            },
            "#boutonModifierContenu": {
                click: this.contentEdit
            },
            "#ContenusGrid": {
                selectionchange: this.contentsSelect,
                itemdblclick: this.doubleClickEdit
            },
            "#contentOnlineBtn": {
                click: this.putContentsOnline
            },
            "#contentOfflineBtn": {
                click: this.putContentsOffline
            },
            "#contentAcceptPublishBtn": {
                click: this.contentAcceptPublish
            }
        });
    }

});
