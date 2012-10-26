/*
 * File: app/controller/ServerErrorController.js
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

Ext.define('Rubedo.controller.ServerErrorController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.ServerErrorController',

    init: function(application) {
        var me = this;
        Ext.data.StoreManager.each(function(store){
            var proxy = store.getProxy();
            if (!Ext.isEmpty(proxy)) {
                proxy.on("exception", function( proxy, response, operation, options ){
                    var message = "";
                    if (response.status === 0) {message= "Connexion au serveur interrompue";}
                    else if (response.status === 500) {message= "Erreur interne du serveur";}
                    Ext.Msg.alert("Erreur", message);
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
        });
    }

});
