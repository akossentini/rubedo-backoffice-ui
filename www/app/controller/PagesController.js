/*
 * File: app/controller/PagesController.js
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

Ext.define('Rubedo.controller.PagesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.PagesController',

    pageSiteSelect: function(combo, records, options) {
        Ext.getStore("PagesDataStore").getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\""+records[0].get("id")+"\"}]";
        Ext.getStore("PagesDataStore").load();
        Ext.getStore("MasksComboStore").getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\""+records[0].get("id")+"\"}]";
        Ext.getStore("MasksComboStore").load();
        var filArianne = combo.up().up().up().getDockedComponent('filArianne');
        var typeFil = filArianne.getComponent('type');
        if (Ext.isDefined(typeFil)) {typeFil.setText(records[0].get("text"));}
        else { typeFil= Ext.widget('button',{iconCls: "masque-icon", text:records[0].get("text"), itemId:'type'});
        typeFil.on("click", function(){Ext.getCmp("mainPageTree").getSelectionModel().select(Ext.getCmp("mainPageTree").getRootNode());});
        filArianne.add(typeFil);
    }
    Ext.getCmp("addPageBtn").enable();
    Ext.getCmp("removePageBtn").disable();
    Ext.Array.forEach(Ext.getCmp("contributionPages").getComponent("contextBar").query("buttongroup"), function(btn){btn.disable();});
    Ext.getCmp("mainPageEdition").removeAll();
    this.resetInterface();
    },

    openPageAddWindow: function(button, e, options) {
        Ext.widget("newPageWindow").show();
    },

    createNewPage: function(button, e, options) {
        var form=button.up().getForm();
        var target=Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected();
        if (form.isValid()){
            var newRows=button.previousSibling().getStore().findRecord("id",button.previousSibling().getValue()).get("rows");
            var newPage=form.getValues();
            newPage.rows=newRows;
            newPage.leaf=true;
            newPage.iconCls="masque-icon";
            newPage.site=Ext.getCmp("pagesSitesCombo").getValue();
            var store=Ext.getCmp("mainPageTree").getStore();
            store.suspendAutoSync();
            target.appendChild(newPage);
            target.set("leaf",false);
            target.expand();
            store.resumeAutoSync();
            store.sync();
            button.up().up().close();
        }
    },

    deletePage: function(button, e, options) {
        var me=this;
        var target=Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected();
        if (Ext.isDefined(target)) {
            var delCon = Ext.widget('delConfirmZ');
            delCon.show();
            var store=Ext.getCmp("mainPageTree").getStore();
            Ext.getCmp('delConfirmZOui').on('click', function() { 
                store.suspendAutoSync();
                var myParent=target.parentNode;
                if ((myParent.childNodes.length==1)&&(!myParent.isRoot())){
                    myParent.set("leaf",true);
                }
                target.remove();
                store.resumeAutoSync();
                store.sync();
                Ext.getCmp("addPageBtn").enable();
                Ext.getCmp("removePageBtn").disable();
                Ext.Array.forEach(Ext.getCmp("contributionPages").getComponent("contextBar").query("buttongroup"), function(btn){btn.disable();});
                Ext.getCmp("mainPageEdition").removeAll();
                Ext.getCmp('delConfirmZ').close();
                me.resetInterface();
            });  

        }
    },

    pageSelect: function(selModel, record, index, options) {
        var me=this;
        if (!record.isRoot()){
            Ext.getCmp("removePageBtn").enable();
            Ext.Array.forEach(Ext.getCmp("contributionPages").getComponent("contextBar").query("buttongroup"), function(btn){btn.enable();});
            Ext.getCmp("mainPageEdition").removeAll();
            me.renderPage(record.get("rows"),1,Ext.getCmp("mainPageEdition"));
            me.resetInterface();
            Ext.getCmp("mainPageAttributeForm").enable();
            Ext.getCmp("mainPageAttributeForm").getForm().setValues(record.getData());
            Ext.getCmp("pagesInternalPreview").add(Ext.widget("container",{
                autoEl: {
                    tag: 'iframe',
                    src: "http://"+window.location.host+"/index/"+record.get("text")
                }
            }));
            Ext.getCmp("pagePreviewTextItem").setText('Ceci est un apercçu de cette page telle que disponnible en ligne en '+Ext.Date.format(new Date(), 'F j, Y, G:i '));
        }
    },

    moveElementUp: function(button, e, options) {
        var target=Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
        if (!Ext.isEmpty(target)) {
            var pos = target.up().items.indexOf(target);
            if (pos > 0) {
                target.up().move(pos,pos-1);
            }
        }
    },

    moveElementDown: function(button, e, options) {
        var target=Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
        if (!Ext.isEmpty(target)) {
            var pos = target.up().items.indexOf(target);
            target.up().move(pos,pos+1);
        }
    },

    deleteElement: function(button, e, options) {
        var target=Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
        target.destroy();
        this.resetInterface();
    },

    columnSelector: function(abstractcomponent, options) {
        if ((abstractcomponent.mType=="col")&&((Ext.isEmpty(abstractcomponent.items.items))||(abstractcomponent.items.items[0].isXType("unBloc")))){
            abstractcomponent.addBodyCls('contrastBorder');
            abstractcomponent.addBodyCls('contrastRow');
            abstractcomponent.getEl().on("mouseover", function(e){
                abstractcomponent.setBorder(4);
                e.stopEvent();
            });
            abstractcomponent.getEl().on("mouseout", function(e){
                abstractcomponent.setBorder(2);
                e.stopEvent();
            });
            abstractcomponent.getEl().on("click", function(e){
                var prevSelected = Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
                if (!Ext.isEmpty(prevSelected)) {
                    if (prevSelected.isXType("unBloc")) {prevSelected.setIconCls();} else {
                prevSelected.removeBodyCls('selectedelement');}
            }
            abstractcomponent.addBodyCls('selectedelement');
            this.frame(MyPrefData.themeColor);
            Ext.getCmp('pageElementIdField').setValue(abstractcomponent.id);
            Ext.getCmp("newPageBloc").enable();
            Ext.getCmp("deletePageElement").disable();
            Ext.getCmp("pageElementUp").disable();
            Ext.getCmp("pageElementDown").disable();
            var propEdit=Ext.getCmp('pageElementPropsPanel');
            propEdit.removeAll();
            propEdit.setTitle(abstractcomponent.id.replace("panel", abstractcomponent.mType));
            propEdit.setIconCls('editZone');
            e.stopEvent();
        });
    }
    },

    showBlocAddWindow: function(button, e, options) {
        Ext.widget("ajoutBlocFenetre").show();
        Ext.getCmp("boutonAjouterBloc").hide();
        Ext.getCmp("addPageBlocBtn").show();
        Ext.getCmp("BlocsSelectGrid").pageMode=true;
    },

    insertBloc: function(button, e, options) {
        var donnees = Ext.getCmp('BlocsSelectGrid').getSelectionModel().getLastSelected().data;
        var nouvBloc = Ext.widget('unBloc', Ext.clone(donnees.configBasique));
        nouvBloc.responsive={
            "phone":true,
            "tablet":true,
            "desktop":true
        };
        nouvBloc.canEdit=true;
        Ext.getCmp(Ext.getCmp('pageElementIdField').getValue()).add(nouvBloc);
        Ext.getCmp("ajoutBlocFenetre").close();
        nouvBloc.getEl().dom.click();
    },

    blocSelection: function(abstractcomponent, options) {
        if (abstractcomponent.canEdit){
            abstractcomponent.getEl().on("mouseover", function(e){
                var prevSelected = Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
                if ((Ext.isEmpty(prevSelected))||(prevSelected.id!==abstractcomponent.id)) {
                    abstractcomponent.setIconCls('selectBloc');
                }
                e.stopEvent();
            });
            abstractcomponent.getEl().on("mouseout", function(e){
                var prevSelected = Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
                if ((Ext.isEmpty(prevSelected))||(prevSelected.id!==abstractcomponent.id)) {
                abstractcomponent.setIconCls();}
                e.stopEvent();
            });
            abstractcomponent.getEl().on("click", function(e){
                var prevSelected = Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
                if (!Ext.isEmpty(prevSelected)) {
                    if (prevSelected.isXType("unBloc")) {prevSelected.setIconCls();} else {
                prevSelected.removeBodyCls('selectedelement');}
            }
            abstractcomponent.setIconCls('editBloc');
            Ext.getCmp("newPageBloc").disable();
            Ext.getCmp("deletePageElement").enable();
            Ext.getCmp("pageElementUp").enable();
            Ext.getCmp("pageElementDown").enable();
            this.frame(MyPrefData.themeColor);
            Ext.getCmp('pageElementIdField').setValue(abstractcomponent.id);
            var propEdit=Ext.getCmp('pageElementPropsPanel');
            propEdit.setTitle(abstractcomponent.id.replace("unBloc", "Bloc"));
            propEdit.setIconCls('editBloc');
            propEdit.removeAll();


            propEdit.add(Ext.widget('textfield',{
                itemId:"eTitleField",
                fieldLabel:"Titre ",
                labelWidth:40,
                allowBlank:false,
                anchor:"60%",
                margin:"10 0 10 0",
                style:"{float:left;}",
                value:abstractcomponent.title
            }));
            propEdit.add(Ext.widget('button',{
                text:"Appliquer",
                anchor:"38%",
                margin:"10 0 10 0",
                style:"{float:right;}",
                handler:function(){
                    if (propEdit.getComponent("eTitleField").isValid()){
                        abstractcomponent.setTitle(propEdit.getComponent("eTitleField").getValue());
                    }}
                }));

                propEdit.add(Ext.widget('textfield',{
                    itemId:"eClassHTMLField",
                    fieldLabel:"Classe HTML ",
                    labelWidth:40,
                    allowBlank:true,
                    anchor:"60%",
                    margin:"10 0 10 0",
                    style:"{float:left;}",
                    value:abstractcomponent.classHTML
                }));
                propEdit.add(Ext.widget('button',{
                    text:"Appliquer",
                    anchor:"38%",
                    margin:"10 0 10 0",
                    style:"{float:right;}",
                    handler:function(){
                        if (propEdit.getComponent("eClassHTMLField").isValid()){
                            abstractcomponent.classHTML=propEdit.getComponent("eClassHTMLField").getValue();
                        }}
                    }));
                    propEdit.add(Ext.widget('textfield',{
                        itemId:"eidHTMLField",
                        fieldLabel:"Id HTML ",
                        labelWidth:40,
                        allowBlank:true,
                        anchor:"60%",
                        margin:"10 0 10 0",
                        style:"{float:left;}",
                        value:abstractcomponent.idHTML
                    }));
                    propEdit.add(Ext.widget('button',{
                        text:"Appliquer",
                        anchor:"38%",
                        margin:"10 0 10 0",
                        style:"{float:right;}",
                        handler:function(){
                            if (propEdit.getComponent("eidHTMLField").isValid()){
                                abstractcomponent.idHTML=propEdit.getComponent("eidHTMLField").getValue();
                            }}
                        }));

                        propEdit.add(Ext.widget('numberfield',{
                            itemId:"rowHeightFixed",
                            fieldLabel:"Hauteur fluide ",
                            labelWidth:90,
                            allowDecimals:false,
                            allowBlank:false,
                            minValue:1,
                            anchor:"60%",
                            margin:"10 0 0 0",
                            style:"{float:left;}",
                            value:abstractcomponent.flex
                        }));
                        propEdit.add(Ext.widget('button',{
                            text:"Appliquer",
                            anchor:"38%",
                            margin:"10 0 0 0",
                            style:"{float:right;}",
                            handler:function(){
                                if (propEdit.getComponent("rowHeightFixed").isValid()){
                                    abstractcomponent.flex=propEdit.getComponent("rowHeightFixed").getValue();
                                    abstractcomponent.up().doLayout();
                                }}
                            }));


                            propEdit.add(Ext.widget('checkboxgroup',{
                                fieldLabel:"Visibilité ",
                                anchor:"100%",
                                labelWidth:60,
                                margin:"0 0 10 0",
                                vertical:true,
                                columns:1,
                                items: [
                                { boxLabel: 'Téléphone', checked:abstractcomponent.responsive.phone, handler:function(){abstractcomponent.responsive.phone=this.getValue();} },
                                { boxLabel: 'Tablette',checked:abstractcomponent.responsive.tablet, handler:function(){abstractcomponent.responsive.tablet=this.getValue();}},
                                { boxLabel: 'Ordinateur',checked:abstractcomponent.responsive.desktop, handler:function(){abstractcomponent.responsive.desktop=this.getValue();}}
                                ]

                            }));  


                            var configSpec = Ext.widget('ConfigSpecBloc');
                            var categories = Ext.clone(abstractcomponent.champsConfig.simple);
                            for (j=0; j<categories.length; j++){
                                var nCateg = Ext.create('Ext.form.FieldSet', {title: categories[j].categorie, collapsible:true, layout: 'anchor'});

                                var champsS = Ext.clone(categories[j].champs);
                                for (i=0; i<champsS.length; i++) {
                                    if (champsS[i].type =='Ext.form.field.ComboBox') {
                                        var monStore=  Ext.create('Ext.data.Store', champsS[i].store);
                                        champsS[i].config.store= monStore;
                                    }
                                    var nChampS = Ext.create(champsS[i].type, champsS[i].config);
                                    if (champsS[i].type =='Ext.form.field.Trigger'){
                                        var Ouvrir = Ext.clone(champsS[i].ouvrir);
                                        nChampS.onTriggerClick= function() {
                                            var fenetre = Ext.widget(Ouvrir);
                                            fenetre.show();
                                        } ;  
                                    }
                                    nChampS.labelSeparator= ' ';
                                    nChampS.anchor= '100%';
                                    nChampS.setValue(abstractcomponent.configBloc[nChampS.name]);
                                    if (nChampS.isXType("combobox")){
                                        nChampS.getStore().fieldId=Ext.clone(nChampS.id);
                                        nChampS.getStore().fieldValue=Ext.clone(abstractcomponent.configBloc[nChampS.name]);
                                        nChampS.getStore().addListener("load",function(storeThing){
                                            Ext.getCmp(storeThing.fieldId).setValue(storeThing.fieldValue);
                                        },this,{single:true});
                                        }
                                        nChampS.on('change', function(){abstractcomponent.configBloc[this.name]=this.getValue(); });
                                        nCateg.add(nChampS);
                                    }
                                    configSpec.items.items[0].add(nCateg);

                                }
                                propEdit.add(configSpec);


                                if (!ACL.interfaceRights['write.ui.masks']){
                                    Ext.Array.forEach(Ext.getCmp("elementEditControl").query("field"), function(truc){truc.setReadOnly(true);});
                                    Ext.Array.forEach(Ext.getCmp("elementEditControl").query("button"), function(truc){truc.disable();});
                                }
                                e.stopEvent();

                            });}
    },

    pagePreview: function(button, e, options) {
        var target=Ext.getCmp('mainPageTree').getSelectionModel().getLastSelected().get("text");
        Ext.widget("FOShowWindow",{targetURL:"http://"+window.location.host+"/index/"+target}).show();
    },

    savePage: function(button, e, options) {
        if (Ext.getCmp("mainPageAttributeForm").getForm().isValid()) {
            var editedPage=Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected();
            var newRows=Rubedo.controller.MasqueController.prototype.saveRows(Ext.getCmp("mainPageEdition"));
            editedPage.beginEdit();
            editedPage.set("rows",newRows);
            editedPage.set(Ext.getCmp("mainPageAttributeForm").getForm().getValues());
            editedPage.endEdit();
            Ext.getCmp("pagesInternalPreview").removeAll();
            Ext.getCmp("pagesInternalPreview").add(Ext.widget("container",{
                autoEl: {
                    tag: 'iframe',
                    src: "http://"+window.location.host+"/index/"+editedPage.get("text")
                }
            }));
        } else {
            Ext.getCmp("mainPageAttributeForm").up().setActiveTab(1);
            Ext.Msg.alert("Erreur", "Les propriérés de la page sont invalides.");
        }
    },

    onWindowBeforeDestroy: function(abstractcomponent, options) {
        if (abstractcomponent.isXType("window")){
            Ext.getStore("MasksComboStore").removeAll();
            Ext.getStore("PagesDataStore").getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\"emptyDecoy\"}]";
            Ext.getStore("PagesDataStore").load();
        }
    },

    onPagesSitesComboBeforeRender: function(abstractcomponent, options) {
        var me=this;
        abstractcomponent.getStore().addListener("load",function(store,records){
            abstractcomponent.select(records[0]);
            me.pageSiteSelect(abstractcomponent, [records[0]]);
        },this,{single:true});
    },

    renderPage: function(mRows, its, cible) {
        var me=this;
        Ext.Array.forEach(mRows, function(row){
            if (row.id.indexOf("page-")==-1) {
                row.id="page-"+row.id;
            }
            var newRow = Ext.widget('panel', {
                header:false,
                mType:"row",
                eTitle:row.eTitle,
                id:row.id,
                responsive:row.responsive,
                classHTML:row.classHTML,
                idHTML:row.idHTML,
                margin:4,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                }
            });
            var rFlex=1;
            var eolWidth=12;
            Ext.Array.forEach(row.columns, function(column){
                if (column.offset>0) {
                    newRow.add(Ext.widget('container', {
                        flex:column.offset,
                        style:"{background-image:url(resources/images/stripes.png);}"
                    }));
                    eolWidth=eolWidth-column.offset;
                }
                var isFinalCol=false;
                if (its<=0){isFinalCol=true;}
                if (column.id.indexOf("page-")==-1) {
                    column.id="page-"+column.id;
                }
                var newCol=Ext.widget('panel', {
                    header:false,
                    flex:column.span,
                    final:isFinalCol,
                    mType:'col',
                    id:column.id,
                    eTitle:column.eTitle,
                    responsive:column.responsive,
                    classHTML:column.classHTML,
                    idHTML:column.idHTML,
                    margin:4,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                });
                if ((its>0)&&(column.isTerminal===false)) {
                    rFlex=Ext.Array.max([rFlex,column.rows.length]);
                    me.masqueRestit(column.rows,its-1,newCol);    
                }
                else {
                    if (Ext.isEmpty(column.blocks)){} else {
                    Ext.Array.forEach(column.blocks, function(bl){
                        if (bl.id.indexOf("page-")==-1) {
                            bl.id="page-"+bl.id;
                        }

                        newCol.add(Ext.widget("unBloc",bl));
                    });
                }
            }
            eolWidth=eolWidth-column.span;
            newRow.add(newCol);

        });
        newRow.add(Ext.widget("container",{
            flex:eolWidth,
            itemId:"eol"
        }));
        if (Ext.isEmpty(row.height)) {
            newRow.flex=rFlex;
        } else {
            newRow.height=row.height;
        }
        cible.add(newRow);  


    });
    },

    resetInterface: function() {
        Ext.getCmp("newPageBloc").disable();
        Ext.getCmp("deletePageElement").disable();
        Ext.getCmp("pageElementUp").disable();
        Ext.getCmp("pageElementDown").disable();
        Ext.getCmp('pageElementPropsPanel').removeAll();
        Ext.getCmp('pageElementPropsPanel').setTitle("Sélectionnez un élément");
        Ext.getCmp('pageElementPropsPanel').setIconCls();
        Ext.getCmp('pageElementIdField').setValue();
        Ext.getCmp("pagesInternalPreview").removeAll();
        Ext.getCmp("mainPageAttributeForm").getForm().setValues();
        Ext.getCmp("mainPageAttributeForm").disable();
    },

    init: function(application) {
        this.control({
            "#pagesSitesCombo": {
                select: this.pageSiteSelect,
                beforerender: this.onPagesSitesComboBeforeRender
            },
            "#addPageBtn": {
                click: this.openPageAddWindow
            },
            "#newPageSubmitBtn": {
                click: this.createNewPage
            },
            "#removePageBtn": {
                click: this.deletePage
            },
            "#mainPageTree": {
                select: this.pageSelect
            },
            "#pageElementUp": {
                click: this.moveElementUp
            },
            "#pageElementDown": {
                click: this.moveElementDown
            },
            "#deletePageElement": {
                click: this.deleteElement
            },
            "#mainPageEdition panel": {
                render: this.columnSelector
            },
            "#newPageBloc": {
                click: this.showBlocAddWindow
            },
            "#addPageBlocBtn": {
                click: this.insertBloc
            },
            "#mainPageEdition unBloc": {
                render: this.blocSelection
            },
            "#pagePreviewBtn": {
                click: this.pagePreview
            },
            "#pageSaveBtn": {
                click: this.savePage
            },
            "#contributionPages": {
                beforedestroy: this.onWindowBeforeDestroy
            }
        });
    }

});
