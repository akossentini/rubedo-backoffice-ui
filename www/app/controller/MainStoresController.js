/*
 * File: app/controller/MainStoresController.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
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

Ext.define('Rubedo.controller.MainStoresController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.MainStoresController',

    onComponentRender: function(component, eOpts) {
        if ((component.managesStore)&&(component.store)) {
            component.getStore().load();

            component.on("beforedestroy", function(thing){thing.getStore().clearFilter(true); thing.getStore().removeAll(); });
        }
    },

    init: function(application) {
                var me = this;
                Ext.override(Ext.data.Store, {
                    removeAll: function () {
                        this.data.clear(); this.fireEvent("clear",this);
                    }
                });
                Ext.data.StoreManager.each(function(store){
                    me.registerStore(store);
                });

        this.control({
            "component": {
                render: this.onComponentRender
            }
        });
    },

    reloadActiveBrothers: function(collectionName, myId, forcedMode) {
        Ext.data.StoreManager.each(function(someStore){
            if ((someStore.isOptimised)&&((someStore.isUsed)||(forcedMode))&&(someStore.usedCollection==collectionName)&&(!someStore.isLoading())&&(someStore.storeId!=myId)) {
                someStore.load();
            }
        });
    },

    fireNotif: function(title, message) {
        Ext.create('Ext.ux.window.Notification', {
            title: title,
            position: 'tr',
            manager: 'instructions',
            cls: 'ux-notification-light',
            iconCls: 'ux-notification-icon-information',
            html: message,
            autoCloseDelay: 4000,
            styleHtmlContent:true,
            slideBackDuration: 500,
            slideInAnimation: 'bounceOut',
            slideBackAnimation: 'easeIn'
        }).show();
    },

    handleLastUpdated: function(record, collection) {
        console.log(record);
        console.log(collection);
    },

    registerStore: function(store) {
        var me=this;
        //notifs and last updated
        store.on("write", function(theStore,roperation){
            if(!(theStore.silentOps)){
                if (roperation.action=="update") {
                    me.fireNotif(Rubedo.RubedoAutomatedElementsLoc.notifTitle, Rubedo.RubedoAutomatedElementsLoc.notifUpdate);
                    /* try{me.handleLastUpdated(roperation.records[0],theStore.usedCollection);}
                    catch(err){console.log("Erreur d'enregistrement en dernier modifié");}*/
                }
                else if (roperation.action=="create") {
                    me.fireNotif(Rubedo.RubedoAutomatedElementsLoc.notifTitle, Rubedo.RubedoAutomatedElementsLoc.notifCreate);
                }
                else if (roperation.action=="destroy") {
                    me.fireNotif(Rubedo.RubedoAutomatedElementsLoc.notifTitle, Rubedo.RubedoAutomatedElementsLoc.notifDestroy);
                }}
            });
            //events for optimised stores
            if (store.isOptimised){
                store.on("load", function(theStore,records,successful){
                    if (successful) {
                        theStore.isUsed=true;
                    }
                });
                store.on("clear", function(theStore){
                    theStore.isUsed=false;
                });
                store.on("write", function(theStore,roperation){
                    me.reloadActiveBrothers(theStore.usedCollection, theStore.storeId, theStore.forcedSync);
                });






            }

            //error handling
            var proxy = store.getProxy();
            if (!Ext.isEmpty(proxy)) {
                proxy.on("exception", function( proxy, response, operation, options ){
                    var message = "";
                    if (response.status === 0) {message= Rubedo.RubedoAutomatedElementsLoc.serverConnectionError;}
                    else if ((response.status === 500)||(response.status === 200)){
                        var respondedMessage = Ext.JSON.decode(response.responseText);
                        if ((Ext.isEmpty(respondedMessage))||(Ext.isEmpty(respondedMessage.msg))){
                            message = Rubedo.RubedoAutomatedElementsLoc.internalServerError;
                        }
                        else {
                            message = respondedMessage.msg;
                        }

                    } else {
                        var respondedMessage = Ext.JSON.decode(response.responseText);
                        if ((Ext.isEmpty(respondedMessage))||(Ext.isEmpty(respondedMessage.msg))){
                            message = Rubedo.RubedoAutomatedElementsLoc.unknownError;
                        }
                        else {
                            message = respondedMessage.msg;
                        }
                    }
                    Ext.Msg.alert(Rubedo.RubedoAutomatedElementsLoc.errorTitle, message);
                    if (operation.action=="update") {
                        Ext.Array.forEach(operation.records, function (record){ record.reject();});
                    }
                    else if (operation.action=="create") {
                        store.remove(operation.records);
                    }
                    else if (operation.action=="destroy") {
                        Ext.Array.forEach(operation.records, function (record){ store.insert(record.index || 0, record);});
                        store.removed= [];
                    }
                    console.log(store);
                    console.log(response);

                });
            }
    }

});
