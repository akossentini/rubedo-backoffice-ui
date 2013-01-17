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
        if (Ext.isEmpty(target)) {
            target=Ext.getCmp("mainPageTree").getRootNode();
        }
        if (form.isValid()){
            var newPage=form.getValues();
            newPage.blocks=[ ];
            newPage.expandable=false;
            if (!target.hasChildNodes()){
                newPage.orderValue=100;
            } else {
                newPage.orderValue=target.lastChild.get("orderValue")+100;
            }
            newPage.iconCls="masque-icon";
            newPage.site=Ext.getCmp("pagesSitesCombo").getValue();
            var store=Ext.getCmp("mainPageTree").getStore();
            store.suspendAutoSync();
            target.appendChild(newPage);
            target.set("expandable",true);
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
                    myParent.set("expandable",false);
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
            var myMask =Ext.getStore("MasksComboStore").findRecord("id", record.get("maskId")); 
            me.renderPage(Ext.clone(myMask.get("rows")),1,Ext.getCmp("mainPageEdition"));
            me.renderBlocks(Ext.clone(myMask.get("blocks")), false);
            me.renderBlocks(Ext.clone(record.get("blocks")), true);
            me.resetInterface();
            Ext.getCmp("mainPageAttributeForm").enable();
            Ext.getCmp("mainPageAttributeForm").getForm().loadRecord(record);
            Ext.Ajax.request({
                url: 'xhr-get-page-url',
                params: {
                    "page-id": record.get("id")
                },
                success: function(response){
                    var targetedUrl = Ext.JSON.decode(response.responseText).url;
                    Ext.getCmp("pagesInternalPreview").add(Ext.widget("container",{
                        autoEl: {
                            tag: 'iframe',
                            src: targetedUrl+"?preview=1"
                        }
                    }));
                },
                failure:function(){
                    Ext.Msg.alert('Erreur', 'Erreur dans la récupération de l\'url de la page');
                }
            });

            Ext.getCmp("pagePreviewTextItem").setText('Ceci est un aperçu de cette page telle que disponible en ligne en '+Ext.Date.format(new Date(), 'F j, Y, G:i '));
            var metaBox = Ext.getCmp("contributionPages").getDockedComponent('barreMeta').getComponent('boiteBarreMeta');
            var values= record.getData();
            values.creation= Ext.Date.format(values.createTime, 'd-m-Y');
            values.derniereModification= Ext.Date.format(values.lastUpdateTime, 'd-m-Y');
            metaBox.update(values);
            metaBox.show();
            Ext.getCmp("addPageBtn").enable();
        } else {
            Ext.getCmp("addPageBtn").enable();
            Ext.getCmp("removePageBtn").disable();
            Ext.Array.forEach(Ext.getCmp("contributionPages").getComponent("contextBar").query("buttongroup"), function(btn){btn.disable();});
            Ext.getCmp("mainPageEdition").removeAll();
            me.resetInterface();
            Ext.getCmp("addPageBtn").enable();
        }
    },

    moveElementUp: function(button, e, options) {
        var target=Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
        if (!Ext.isEmpty(target)) {
            var pos = target.up().items.indexOf(target);
            if (pos > 0) {
                target.up().move(pos,pos-1);
                if (Ext.isEmpty(target.previousSibling())){
                    target.orderValue=target.nextSibling().orderValue-1;
                } else {
                    target.orderValue=(target.nextSibling().orderValue+target.previousSibling().orderValue)/2;
                }
            }
        }
    },

    moveElementDown: function(button, e, options) {
        var target=Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
        if (!Ext.isEmpty(target)) {
            if (!Ext.isEmpty(target.nextSibling())){
                var pos = target.up().items.indexOf(target);
                target.up().move(pos,pos+1);
                if (Ext.isEmpty(target.nextSibling())){
                    target.orderValue=target.previousSibling().orderValue+1;
                } else {
                    target.orderValue=(target.nextSibling().orderValue+target.previousSibling().orderValue)/2;
                }
            }

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
        var target = Ext.getCmp(Ext.getCmp('pageElementIdField').getValue());
        var orderValue = 1;
        if (!Ext.isEmpty(target.items.items)) {
            orderValue=target.items.items[target.items.items.length-1].orderValue+1;
        }
        nouvBloc.orderValue=orderValue;
        target.add(nouvBloc);
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
            var configSpec = Ext.widget('ConfigSpecBloc');


            configSpec.getComponent(0).add(Ext.widget('textfield',{
                itemId:"eTitleField",
                fieldLabel:"Titre ",
                onChange:function(){
                    if (this.isValid()){
                        abstractcomponent.setTitle(this.getValue());
                    }
                },
                labelWidth:60,
                allowBlank:false,
                anchor:"100%",
                margin:"10 0 10 0",
                value:abstractcomponent.title
            }));
            configSpec.getComponent(0).add(Ext.widget('checkbox',{
                itemId:"eTitleShowField",
                fieldLabel:"Afficher le titre ",
                onChange:function(){

                    abstractcomponent.displayTitle=this.getValue();

                },
                labelWidth:60,
                inputValue:true,
                anchor:"100%",
                margin:"10 0 10 0",
                checked:abstractcomponent.displayTitle
            }));


            /*
            configSpec.getComponent(0).add(Ext.widget('numberfield',{
            fieldLabel:"Hauteur fluide ",
            onChange:function(){
            if(this.isValid()) {
            abstractcomponent.flex=this.getValue();
            abstractcomponent.up().doLayout();
            }
            },
            labelWidth:60,
            allowDecimals:false,
            allowBlank:false,
            minValue:1,
            anchor:"100%",
            margin:"10 0 0 0",
            value:abstractcomponent.flex
            }));

            */

            configSpec.getComponent(0).add(Ext.widget('checkboxgroup',{
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






            configSpec.getComponent(1).add(Ext.widget('textfield',{
                itemId:"eClassHTMLField",
                fieldLabel:"Classe HTML ",
                onChange:function(){
                    if (this.isValid()){
                        abstractcomponent.classHTML=this.getValue();
                    }
                },
                labelWidth:60,
                allowBlank:true,
                anchor:"100%",
                margin:"10 0 0 0",
                value:abstractcomponent.classHTML
            }));



            configSpec.getComponent(1).add(Ext.widget('textfield',{
                itemId:"eidHTMLField",
                fieldLabel:"Id HTML ",
                onChange:function(){
                    if (this.isValid()){
                        abstractcomponent.idHTML=this.getValue();
                    }
                },
                labelWidth:60,
                allowBlank:true,
                anchor:"100%",
                margin:"10 0 0 0",
                value:abstractcomponent.idHTML
            }));

            configSpec.getComponent(1).add(Ext.widget('textfield',{
                itemId:"urlPrefixHTMLField",
                fieldLabel:"Préfixe URL ",
                onChange:function(){
                    if (this.isValid()){
                        abstractcomponent.urlPrefix=this.getValue();
                    }
                },
                labelWidth:60,
                regex :new RegExp(/^([a-z]|[1-9]|[-]){0,}$/),
                allowBlank:true,
                anchor:"100%",
                margin:"10 0 0 0",
                value:abstractcomponent.urlPrefix
            }));

            var categories = Ext.clone(abstractcomponent.champsConfig.simple);
            for (j=0; j<categories.length; j++){
                var nCateg = Ext.create('Ext.form.FieldSet', {title: categories[j].categorie, collapsible:true, layout: 'anchor'});

                var champsS = Ext.clone(categories[j].champs);
                for (i=0; i<champsS.length; i++) {
                    if (champsS[i].type =='Ext.ux.TreePicker') {
                        var filteredStore=  Ext.create("Ext.data.TreeStore",{autoLoad: false,
                            autoSync: false,
                            isOptimised:true,
                            usedCollection:"Pages",
                            model: 'Rubedo.model.pageDataModel',
                            proxy: {
                                type: 'ajax',
                                api: {
                                    create: 'pages/create',
                                    read: 'pages/read-child',
                                    update: 'pages/update',
                                    destroy: 'pages/delete'
                                },
                                reader: {
                                    type: 'json',
                                    getResponseData: function(response) {
                                        var data, error;

                                        try {
                                            data = Ext.decode(response.responseText);
                                            if (Ext.isDefined(data.data)){data.children=data.data;}// error fix
                                            return this.readRecords(data);
                                        } catch (ex) {
                                            error = new Ext.data.ResultSet({
                                                total  : 0,
                                                count  : 0,
                                                records: [],
                                                success: false,
                                                message: ex.message
                                            });

                                            this.fireEvent('exception', this, response, error);
                                            console.log(ex);

                                            Ext.Logger.warn('Unable to parse the JSON returned by the server');

                                            return error;
                                        }
                                    },
                                    messageProperty: 'message'
                                }
                            },
                            sorters: {
                                property: 'orderValue'
                            }
                        }); 

                        filteredStore.getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\""+Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected().get("site")+"\"}]";
                        filteredStore.load();
                        champsS[i].config.store= filteredStore;
                        champsS[i].config.displayField="text";



                    }  
                    var nChampS = Ext.create(champsS[i].type, champsS[i].config);
                    if (champsS[i].type =='Ext.form.field.Trigger'){
                        var Ouvrir = Ext.clone(champsS[i].ouvrir);
                        var targeting=Ext.clone(nChampS.id);
                        nChampS.onTriggerClick= function() {
                            var fenetre = Ext.widget(Ouvrir);
                            fenetre.show();
                            fenetre.mainFieldId=targeting;

                        } ;  
                    }
                    nChampS.labelSeparator= ' ';
                    nChampS.anchor= '100%';   
                    nChampS.labelWidth=60;
                    nChampS.setValue(abstractcomponent.configBloc[nChampS.name]);
                    if ((nChampS.isXType("combobox"))&&(!nChampS.isXType("treepicker"))){
                        nChampS.getStore().fieldId=Ext.clone(nChampS.id);
                        nChampS.getStore().fieldValue=Ext.clone(abstractcomponent.configBloc[nChampS.name]);
                        nChampS.getStore().addListener("load",function(storeThing){
                            Ext.getCmp(storeThing.fieldId).setValue(storeThing.fieldValue);
                        },this,{single:true});
                        }
                        if (nChampS.isXType("treepicker")){
                            nChampS.on('select', function(){abstractcomponent.configBloc[this.name]=this.getValue(); });

                        }
                        if (nChampS.isXType("comboboxselect")){
                            nChampS.on('afterrender', function(thing){thing.fireEvent("change");});

                        }
                        nChampS.on('change', function(){abstractcomponent.configBloc[this.name]=this.getValue();});
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

    savePage: function(button, e, options) {
        if (Ext.getCmp("mainPageAttributeForm").getForm().isValid()) {
            var editedPage=Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected();
            var newBlocks=this.saveBlocks(Ext.getCmp("mainPageEdition"));
            var store=Ext.getCmp("mainPageTree").getStore();
            store.suspendAutoSync();
            editedPage.beginEdit();
            editedPage.set("blocks",newBlocks);
            editedPage.set(Ext.getCmp("mainPageAttributeForm").getForm().getValues());
            editedPage.endEdit();
            store.resumeAutoSync();
            store.sync();
            store.addListener("update", function(a, record){Ext.getCmp("mainPageAttributeForm").getForm().loadRecord(record);},this,{single:true});
            Ext.getCmp("pagesInternalPreview").removeAll();
            Ext.Ajax.request({
                url: 'xhr-get-page-url',
                params: {
                    "page-id": editedPage.get("id")
                },
                success: function(response){
                    var targetedUrl = Ext.JSON.decode(response.responseText).url;
                    Ext.getCmp("pagesInternalPreview").add(Ext.widget("container",{
                        autoEl: {
                            tag: 'iframe',
                            src: targetedUrl+"?preview=1"
                        }
                    }));
                },
                failure:function(){
                    Ext.Msg.alert('Erreur', 'Erreur dans la récupération de l\'url de la page');
                }
            });
        } else {
            Ext.getCmp("mainPageAttributeForm").up().setActiveTab(2);
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
            if (abstractcomponent.id=="previewSitesCombo"){
                me.pagePreviewSelect(abstractcomponent, [records[0]]);
            } else {
                me.pageSiteSelect(abstractcomponent, [records[0]]);
            }
        },this,{single:true});
    },

    pagePreviewSelect: function(combo, records, options) {
        Ext.getStore("PagesPreviewStore").getProxy().extraParams.filter="[{\"property\":\"site\",\"value\":\""+records[0].get("id")+"\"}]";
        Ext.getStore("PagesPreviewStore").load();
        Ext.getCmp("contribPreviewMain").removeAll();
    },

    onPreviewPageTreeSelect: function(selModel, record, index, options) {
        Ext.getCmp("contribPreviewMain").removeAll();
        if(!record.isRoot()){
            Ext.Ajax.request({
                url: 'xhr-get-page-url',
                params: {
                    "page-id": record.get("id")
                },
                success: function(response){
                    var targetedUrl = Ext.JSON.decode(response.responseText).url;
                    Ext.getCmp("contribPreviewMain").add(Ext.widget("container",{
                        autoEl: {
                            tag: 'iframe',
                            src: "resources/responsiveShow/?url="+targetedUrl+"?preview=1"
                        }
                    }));
                },
                failure:function(){
                    Ext.Msg.alert('Erreur', 'Erreur dans la récupération de l\'url de la page');
                }
            });
        }
    },

    onPagePreviewRefreshBtnClick: function(button, e, options) {
        var record = Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected();
        if ((!Ext.isEmpty(record))&&(!record.isRoot())){
            Ext.getCmp("pagesInternalPreview").removeAll();
            Ext.Ajax.request({
                url: 'xhr-get-page-url',
                params: {
                    "page-id": record.get("id")
                },
                success: function(response){
                    var targetedUrl = Ext.JSON.decode(response.responseText).url;
                    Ext.getCmp("pagesInternalPreview").add(Ext.widget("container",{
                        autoEl: {
                            tag: 'iframe',
                            src: targetedUrl+"?preview=1"
                        }
                    }));
                },
                failure:function(){
                    Ext.Msg.alert('Erreur', 'Erreur dans la récupération de l\'url de la page');
                }
            });
        }
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
                displayTitle:row.displayTitle,
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
                    displayTitle:column.displayTitle,
                    idHTML:column.idHTML,
                    margin:4,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                });
                if ((its>0)&&(column.isTerminal===false)) {
                    rFlex=Ext.Array.max([rFlex,column.rows.length]);
                    me.renderPage(column.rows,its-1,newCol);    
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
        Ext.getCmp("addPageBtn").disable();
        Ext.getCmp("pageElementUp").disable();
        Ext.getCmp("pageElementDown").disable();
        Ext.getCmp('pageElementPropsPanel').removeAll();
        Ext.getCmp('pageElementPropsPanel').setTitle("Sélectionnez un élément");
        Ext.getCmp('pageElementPropsPanel').setIconCls();
        Ext.getCmp('pageElementIdField').setValue();
        Ext.getCmp("pagesInternalPreview").removeAll();
        Ext.getCmp("mainPageAttributeForm").getForm().setValues();
        Ext.getCmp("mainPageAttributeForm").disable();
        Ext.getCmp("pagePreviewTextItem").setText();
        Ext.getCmp("contributionPages").getDockedComponent('barreMeta').getComponent('boiteBarreMeta').hide();
    },

    renderBlocks: function(mBlocks, editable) {
        Ext.Array.forEach(mBlocks, function(block){
            if (block.parentCol.indexOf("page-")==-1) {
                block.parentCol="page-"+block.parentCol;
            }
            if (block.id.indexOf("page-")==-1) {
                block.id="page-"+block.id;
            }
            var targetCol=Ext.getCmp(block.parentCol);
            if ((!Ext.isEmpty(targetCol))&&(targetCol.mType=='col')){
                block.canEdit=editable;
                if (editable) {
                    var insertIndex=0;
                    Ext.Array.forEach(targetCol.items.items, function(brother){
                        if (brother.orderValue<block.orderValue){
                            insertIndex=insertIndex+1;
                        }
                    });
                    targetCol.insert(insertIndex, Ext.widget("unBloc",block));
                } else{
                    targetCol.add(Ext.widget("unBloc",block));
                }
            }
        });
    },

    saveBlocks: function(startComp) {
        var newBlocks = [ ];
        Ext.Array.forEach(startComp.query("unBloc"), function(nBloc){
            if (nBloc.canEdit){
                newBlocks.push({

                    bType:nBloc.bType,
                    id:nBloc.getId().replace("page-",""),
                    parentCol:nBloc.up().getId().replace("page-",""),
                    mType:"block",
                    champsConfig:nBloc.champsConfig,
                    configBloc:nBloc.configBloc,
                    orderValue:nBloc.orderValue,
                    title:nBloc.title,
                    responsive:nBloc.responsive,
                    classHTML:nBloc.classHTML,
                    displayTitle:nBloc.displayTitle,
                    idHTML:nBloc.idHTML,
                    urlPrefix:nBloc.urlPrefix,
                    flex:nBloc.flex,
                    canEdit:nBloc.canEdit

                });
            }

        });
        return(newBlocks);
    },

    init: function(application) {
        this.control({
            "#pagesSitesCombo": {
                select: this.pageSiteSelect
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
            "#pageSaveBtn": {
                click: this.savePage
            },
            "#contributionPages": {
                beforedestroy: this.onWindowBeforeDestroy
            },
            "#pagesSitesCombo, #previewSitesCombo": {
                beforerender: this.onPagesSitesComboBeforeRender
            },
            "#previewSitesCombo": {
                select: this.pagePreviewSelect
            },
            "#previewPageTree": {
                select: this.onPreviewPageTreeSelect
            },
            "#pagePreviewRefreshBtn": {
                click: this.onPagePreviewRefreshBtnClick
            }
        });
    }

});
