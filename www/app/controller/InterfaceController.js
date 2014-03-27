/*
 * File: app/controller/InterfaceController.js
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

Ext.define('Rubedo.controller.InterfaceController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.InterfaceController',

    views: [
        'menuPrincipalInterface'
    ],

    afficherMenuPrincipal: function(button, e, eOpts) {
        if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            if(Ext.getCmp('menuPrincipalInterface').isVisible()){
                Ext.getCmp('menuPrincipalInterface').hide();
            }
            else {Ext.getCmp('menuPrincipalInterface').show();}
        }
        else {
            var menuPrincipal = Ext.widget('menuPrincipalInterface', {title:MyPrefData.myName});


            menuPrincipal.showAt(0, Ext.getCmp('desktopCont').getHeight()-350);
            menuPrincipal.getEl().addListener('mouseover', function(){  Ext.getBody().removeAllListeners(); });
            menuPrincipal.getEl().addListener('mouseout', function(){  Ext.getBody().addListener('click', function(){ if (!Ext.isEmpty(Ext.getCmp('menuPrincipalInterface'))) {
                Ext.getCmp('menuPrincipalInterface').hide();
            }}); });
        }
    },

    maximize: function(tool, e, eOpts) {
        tool.up().up().toggleMaximize();
        var task = new Ext.util.DelayedTask(function(){
            tool.show();
        });
        task.delay(100);
    },

    compenserResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        Ext.getCmp('boiteAIconesBureau').setHeight(component.getHeight());
        Ext.getCmp('boiteAIconesBureau').setWidth(component.getWidth());
        if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            var hideAfter=!Ext.getCmp('menuPrincipalInterface').isVisible();
            Ext.getCmp('menuPrincipalInterface').showAt(0, component.getHeight()-350);
            if (hideAfter){
                Ext.getCmp('menuPrincipalInterface').hide();
            }
        }
    },

    componrtementWindow: function(component, eOpts) {
        if ((!component.isXType("messagebox"))&&(!component.isXType("uxNotification"))){
            var boutonCompagnon = Ext.widget('splitbutton', {text: component.title, iconCls: component.iconCls, arrowCls:"split", enableToggle: true,allowDepress: false});
            component.on('close', function(){boutonCompagnon.destroy();});
            component.onEsc=Ext.emptyFn;
            if (!MyPrefData.simpleMode){
                component.getHeader().on("dblclick", function(thing){
                    thing.up().toggleMaximize();

                });
            } else {
                if (!Ext.isEmpty(component.getHeader().getComponent("windowMinimize"))){
                    component.getHeader().getComponent("windowMinimize").hide();
                }
                if (!Ext.isEmpty(component.getHeader().getComponent("windowMaximize"))){
                    component.getHeader().getComponent("windowMaximize").hide();
                }
            }
            component.on('minimize', function(){component.hide(); boutonCompagnon.toggle(false);});
            component.getEl().on('focus', function(){boutonCompagnon.toggle(true);});
            component.on('resize', function(){this.focus();});
            component.getEl().on('blur', function(){boutonCompagnon.toggle(false);});
            boutonCompagnon.on('click', function(){
                if (component.isVisible()) {
                    if (Ext.WindowManager.getActive().id==component.id) {component.hide(); this.toggle(false);}
                    else {component.toFront(); this.toggle(true);}
                }
                else {component.show();}

            });
            boutonCompagnon.on('arrowclick', function(){component.close();});
            boutonCompagnon.on('render', function(){component.animateTarget=this.getEl();});
            Ext.getCmp('taskbarPrincipal').add(boutonCompagnon);
            component.animateTarget=boutonCompagnon.getEl();

        }
    },

    minimize: function(tool, e, eOpts) {
        tool.up().up().minimize();
    },

    comportementIcones: function(component, eOpts) {
        var me=this;
        component.on('move', function(cible, x, y){
            if ((x % 100)>50) {x = x-(x % 100)+100;} else {x = x-(x % 100);}
            if ((y % 100)>50) {y = y-(y % 100)+100;} else {y = y-(y % 100);}
            if (y>(window.innerHeight-150)) {x=x+100; y=0;}
            while (this.placeLibre(x,y, component.id)===false) {
                if (y<(window.innerHeight-150)) {
                    y=y+100;
                }
                else {
                    y=0;
                    x=x+100;
                }
            }
            component.suspendEvents(false);
            component.setPosition(x, y);
            component.resumeEvents();
            var myRec =Ext.getStore("IconesDataJson").findRecord("id", component.recId);
            if (!Ext.isEmpty(myRec)){
                if ((myRec.get("posX")!=x)||(myRec.get("posY")!=y)) {
                    myRec.beginEdit();
                    myRec.set("posX", x);
                    myRec.set("posY", y);
                    myRec.endEdit();
                }

            }}, this);

            component.getEl().on("contextmenu", function(e){
                var menu= Ext.getCmp('iconsContextMenu');
                if (Ext.isEmpty(menu)){
                    menu = Ext.widget('iconsContextMenu');
                    menu.on('blur', function(){this.destroy();});}
                    menu.getComponent("iconDeleteMenuItem").on("click", function(){
                        Ext.getStore("IconesDataJson").remove(Ext.getStore("IconesDataJson").findRecord("id", component.recId));
                        component.up().remove(component);
                        menu.destroy();
                    });
                    menu.getComponent("iconNameField").setValue(component.iText);
                    menu.getComponent("iconRenameMenuItem").on("click", function(){
                        if (menu.getComponent("iconNameField").isValid()) {
                            Ext.getStore("IconesDataJson").findRecord("id", component.recId).set("text",menu.getComponent("iconNameField").getValue());
                            menu.destroy();
                            me.refreshIcons();
                        }
                    });
                    menu.showAt(Ext.EventObject.getXY());
                    e.stopEvent();

                });
    },

    onMenuitemClick: function(item, e, eOpts) {
        var button=item;
        var fenetre = Ext.getCmp(button.itemId);
        if (Ext.isDefined(fenetre)){ fenetre.show(); fenetre.toFront(); }
        else {
            fenetre = Ext.widget(button.itemId);
            if (MyPrefData.simpleMode){
                fenetre.maximized=true;
                fenetre.draggable=false;
            }
            Ext.getCmp('desktopCont').add(fenetre);
            if (Ext.isDefined(window.innerHeight)) {
                if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
            }
            fenetre.show();

        }
        if (!MyPrefData.simpleMode){
            Ext.getCmp('menuPrincipalInterface').hide();
        }
    },

    ouvrirFenteresMenuDroite: function(button, e, eOpts) {
        var me=this;
        if (button.itemId=='deconnexionMenuPrincipal') {
            Ext.Ajax.request({
                url: 'logout',
                params:{
                },
                success: function(response){
                    window.onbeforeunload=Ext.emptyFn;
                    window.location.href="login";
                }
            });

        } else if(button.usesMenu){

        } else if (button.id=="favoritesAdaptiveMenu"){
            button.menu.removeAll();
            Ext.Array.forEach(Ext.getStore('IconesDataJson').getRange(), function(icon){
                var menuItem=Ext.widget("menuitem", {text:icon.get("text"), icon:"resources/icones/"+MyPrefData.iconsDir+"/16x16/"+icon.get("image")});
                menuItem.on("click",function(){me.fireIconActions(icon.get("actions"));});
                menuItem.recId=icon.get("id");
                menuItem.on("afterrender",function(){
                    menuItem.getEl().on("contextmenu", function(e){
                        var menu= Ext.getCmp('iconsContextMenu');
                        if (Ext.isEmpty(menu)){
                            menu = Ext.widget('iconsContextMenu');
                            menu.on('blur', function(){this.destroy();});}
                            menu.getComponent("iconDeleteMenuItem").on("click", function(){
                                Ext.getStore("IconesDataJson").remove(Ext.getStore("IconesDataJson").findRecord("id",menuItem.recId));
                                menu.destroy();
                            });
                            menu.getComponent("iconNameField").setValue(icon.get("text"));
                            menu.getComponent("iconRenameMenuItem").on("click", function(){
                                if (menu.getComponent("iconNameField").isValid()) {
                                    Ext.getStore("IconesDataJson").findRecord("id",menuItem.recId).set("text",menu.getComponent("iconNameField").getValue());
                                	menu.destroy();
                                }
                            });
                            menu.showAt(Ext.EventObject.getXY());
                            e.stopEvent();

                    });});
                button.menu.add(menuItem);
            });
        }
        else{

            var fenetre = Ext.getCmp(button.itemId);
            if (Ext.isDefined(fenetre)){ fenetre.show(); fenetre.toFront(); }
            else {
                fenetre = Ext.widget(button.itemId);
                if (MyPrefData.simpleMode){
                    fenetre.maximized=true;
                    fenetre.draggable=false;
                }
                Ext.getCmp('desktopCont').add(fenetre);
                if (Ext.isDefined(window.innerHeight)) {
                    if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                    if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
                }
                fenetre.show();



            }
            if (!MyPrefData.simpleMode){
                Ext.getCmp('menuPrincipalInterface').hide();
            }
        }
    },

    desktopMenu: function(component, eOpts) {
        component.getEl().on('contextmenu', function(e){
            var menu= Ext.getCmp('settingsContextMenu');
            if (Ext.isEmpty(menu)){
                menu = Ext.widget('settingsContextMenu');
                menu.on('blur', function(){this.destroy();});
            }
            menu.showAt(e.browserEvent.clientX,e.browserEvent.clientY);
            Ext.EventManager.preventDefault(e);
        });
    },

    hideAllIcons: function(item, e, eOpts) {
        Ext.Array.forEach(Ext.getCmp('boiteAIconesBureau').items.items, function(ico){ico.hide();});
    },

    showAllIcons: function(item, e, eOpts) {
        Ext.Array.forEach(Ext.getCmp('boiteAIconesBureau').items.items, function(ico){ico.show();});
    },

    reagarangeAllIcons: function(item, e, eOpts) {
        Ext.getStore("IconesDataJson").suspendAutoSync();
        Ext.Array.forEach(Ext.getCmp('boiteAIconesBureau').items.items, function(ico){ico.setPosition(0,0);});
        Ext.getStore("IconesDataJson").resumeAutoSync();
        Ext.getStore("IconesDataJson").sync();
    },

    displayDesktopCustomizeWindow: function(item, e, eOpts) {
        var fenetre=Ext.getCmp('DesktopCustomizeWindow');
        if (Ext.isEmpty(fenetre)){
            fenetre=Ext.widget('DesktopCustomizeWindow');
            Ext.getCmp('desktopCont').add(fenetre);
        }fenetre.show();
    },

    updateWallpaperPreview: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp('wallpaperPicker').getComponent(0).setSrc(record.data.file);
    },

    wallpaperChange: function(button, e, eOpts) {
        Ext.getCmp('desktopBackGround').setSrc(Ext.getCmp('wallpaperPicker').getComponent(0).src);
        Ext.getStore('PersonalPrefsStore').getRange()[0].set("wallpaper",Ext.getCmp('wallpaperPicker').getComponent(0).src);
    },

    onGridpanelExpand: function(p, eOpts) {
        Ext.getCmp('DesktopCustomizeMainArea').removeAll();
        Ext.getCmp('DesktopCustomizeMainArea').add(Ext.widget('themePicker'));
    },

    onGridpanelExpand1: function(p, eOpts) {
        Ext.getCmp('DesktopCustomizeMainArea').removeAll();
        Ext.getCmp('DesktopCustomizeMainArea').add(Ext.widget('wallpaperPicker'));
    },

    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp('themePicker').getComponent(0).setSrc(record.data.preview);
    },

    applyTheme: function(button, e, eOpts) {
        var theme = Ext.getCmp('themeGrid').getSelectionModel().getLastSelected().data;
        Ext.getCmp('desktopBackGround').setSrc(theme.wallpaper);
        Ext.util.CSS.swapStyleSheet('maintheme', theme.stylesheet);
        MyPrefData.iconsDir=theme.iconSet;
        MyPrefData.themeColor=theme.themeColor;
        var myPrefs=Ext.getStore('PersonalPrefsStore').getRange()[0];
        myPrefs.beginEdit();
        myPrefs.set("stylesheet",theme.stylesheet);
        myPrefs.set("iconSet",theme.iconSet);
        myPrefs.set("themeColor",theme.themeColor);
        myPrefs.set("wallpaper",theme.wallpaper);
        myPrefs.endEdit();
        this.refreshIcons();

    },

    onPanelExpand: function(p, eOpts) {
        Ext.getCmp('DesktopCustomizeMainArea').removeAll();
        Ext.getCmp('DesktopCustomizeMainArea').add(Ext.widget('accessibilityPicker'));
    },

    HCmode: function(button, e, eOpts) {
        var myPrefs=Ext.getStore('PersonalPrefsStore').getRange()[0];
        if (MyPrefData.HCMode===false) {
            Ext.util.CSS.swapStyleSheet('ext_theme', '/components/sencha/extjs/resources/css/ext-all-access.css');
            MyPrefData.HCMode=true;
            myPrefs.set("HCMode",true);
            button.setText(Rubedo.RubedoAutomatedElementsLoc.deactivateText);
        } else {Ext.util.CSS.swapStyleSheet('ext_theme', '/components/sencha/extjs/resources/css/ext-all-gray.css');
            MyPrefData.HCMode=false;
            myPrefs.set("HCMode",false);
            button.setText(Rubedo.RubedoAutomatedElementsLoc.activateText);
        }
    },

    setHCButtonStatus: function(component, eOpts) {
        if (MyPrefData.HCMode===true) {
            component.setText(Rubedo.RubedoAutomatedElementsLoc.deactivateText);
        }
    },

    createIconBtn: function(button, e, eOpts) {
        var myWindow = button.findParentByType("window");
        var myText = myWindow.title;
        var actions = [ ];
        if ((myWindow.id=="contributionContenus")&&(Ext.getCmp("ContenusGrid").getSelectionModel().getSelection().length==1)) {
            var myRecord = myWindow.getComponent(0).getSelectionModel().getLastSelected();
            actions.push({
                type:"editContent",
                target:Ext.getCmp("ContenusGrid").getSelectionModel().getSelection()[0].get("id")
            });
            var preDefined="page_full.png";
            myText=Ext.getCmp("ContenusGrid").getSelectionModel().getSelection()[0].get("text");

        } else if ((myWindow.id=="DAMInterface")&&(Ext.getCmp("DAMCenter").getSelectionModel().getSelection().length==1)) {
            var myRecord = Ext.getCmp("DAMCenter").getSelectionModel().getLastSelected();
            if (Ext.getCmp("images-view").isVisible()){
            myRecord = Ext.getCmp("images-view").getSelectionModel().getLastSelected();
        }
            actions.push({
                type:"editDAM",
                target:myRecord.get("id"),
                targetType:myRecord.get("typeId")
            });
            var preDefined="images.png";
            myText=myRecord.get("text");

        } else if (myWindow.id=="searchResultsWindow"){
            actions.push({
                type:"openWindow",
                target:myWindow.id
            });
            actions.push({
                type:"fireESWindow",
                activeFacettes:Ext.getStore("ESFacetteStore").activeFacettes
            });
            var preDefined="search.png";

        } else if (myWindow.id=="contributionPages"){
            actions.push({
                type:"openWindow",
                target:myWindow.id
            });
            myText=Ext.getCmp("pagesSitesCombo").getStore().findRecord("id",Ext.getCmp("pagesSitesCombo").getValue()).get("text");
            var targetNode =Ext.getCmp("mainPageTree").getSelectionModel().getLastSelected();
            var targetPath="/root";
            if(!Ext.isEmpty(targetNode)){
                targetPath=targetNode.getPath();
                myText=targetNode.get("text");
            }
            actions.push({
                type:"pageSelect",
                site:Ext.getCmp("pagesSitesCombo").getValue(),
                pagePath:targetPath
            });

        } else {
            var myRecord = myWindow.getComponent(0).getSelectionModel().getLastSelected();
            actions.push({
                type:"openWindow",
                target:myWindow.id
            });
            if (!Ext.isEmpty(myRecord)){
                myText=myRecord.get(myRecord.fields.items[0].name);
                actions.push({
                    type:"selectRecord",
                    target:myWindow.getComponent(0).id,
                    recordId:myRecord.get("id")
                });
            }
        }
        var x=0;
        var y=0;
        while (this.placeLibre(x,y, "newOne")===false) {
            if (y<(window.innerHeight-150)) {
                y=y+100;
            }
            else {
                y=0;
                x=x+100;
            }
        }
        var newIcon = Ext.create("Rubedo.model.iconDataModel",{
            text:myText,
            posX:x,
            posY:y,
            image: preDefined||myWindow.favoriteIcon||"favorite.png",
            actions:actions

        });
        var me=this;
        Ext.getStore("IconesDataJson").add(newIcon);
        Ext.getStore("IconesDataJson").on("datachanged", function(){
            me.refreshIcons();
            Ext.getStore("IconesDataJson").clearListeners();
        });

    },

    onButtonAfterRender: function(component, eOpts) {
        /*if (MyPrefData.simpleMode){
            if (component.up().queryBy(function(item){
                if((item.isXType("button"))&&(!item.isHidden())){
                    return(true);
                }
                else { return(false);}
            }).length==1){
                component.up().hide();
            } else {
                component.hide();
            }
        }*/
    },

    launchESWindow: function(button, e, eOpts) {
        if (!(Ext.isDefined(Ext.getCmp('ESWindow')))) {
            var fenetre = Ext.widget('ESWindow');
            Ext.getCmp('desktopCont').add(fenetre);
            if (Ext.isDefined(window.innerHeight)) {
                if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
            }
            fenetre.show();
        }else {Ext.getCmp('ESWindow').toFront();}
    },

    onDesktopHomeBtnClick: function(button, e, eOpts) {
        Ext.WindowManager.each(function(thing){
            if (thing.isWindow){
                thing.minimize();
            }
        });
    },

    mainToolsContextShow: function(component, eOpts) {
        var me=this;
        if (component.itemId!='deconnexionMenuPrincipal') {
            component.getEl().on("contextmenu",function(e){
                if (!component.usesMenu){
                    var menu= Ext.getCmp('MainToolsContextMenu');
                    if (!Ext.isEmpty(menu)){menu.destroy();}
                    menu = Ext.widget('MainToolsContextMenu');
                    menu.on('blur', function(){this.destroy();});
                    menu.getComponent(0).on("click", function(){
                        var actions = [ ];
                        actions.push({
                            type:"openWindow",
                            target:component.itemId
                        });
                        var myText = component.text;
                        var newIcon = Ext.create("Rubedo.model.iconDataModel",{
                            text:myText,
                            posX:0,
                            posY:0,
                            image: component.favoriteIcon||"favorite.png",
                            actions:actions

                        });
                        Ext.getStore("IconesDataJson").add(newIcon);
                        Ext.getStore("IconesDataJson").on("datachanged", function(){
                            me.refreshIcons();
                            Ext.getStore("IconesDataJson").clearListeners();
                        });

                    });

                menu.showAt(Ext.EventObject.getXY());}
                e.stopEvent();
            });
        }
        component.on("focus", function(){
            var menu= Ext.getCmp('MainToolsContextMenu');
            if (!Ext.isEmpty(menu)){menu.destroy();}
        });
    },

    onButtonMouseOver: function(button, e, eOpts) {
        Ext.Array.forEach(Ext.getCmp("salamanderContext").query("menu"), function(thing){ thing.hide();});
        if(button.usesMenu){
            Ext.getCmp(button.usedMenu).show();
            Ext.getCmp("salamanderLogo").hide();
        } else {
            Ext.getCmp("salamanderLogo").show();
        }
        var menu= Ext.getCmp('MainToolsContextMenu');
        if (!Ext.isEmpty(menu)){menu.destroy();}
    },

    onLaunch: function() {
        var me=this;
        try {
            Ext.util.CSS.removeStyleSheet("loading-bar-style");
            Ext.getElementById("loading-bar").parentNode.removeChild(Ext.getElementById("loading-bar"));
            window.onbeforeunload = function() { return Rubedo.RubedoAutomatedElementsLoc.windowBeforeUnloadMessage; };
        } catch (err) {
            console.log("dom element removal anomaly");
        }
        Ext.getBody().addListener('click', function(){ if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            Ext.getCmp('menuPrincipalInterface').hide();
        }});
        Ext.getCmp('boutonPincipalInterface').addListener('mouseover', function(){  Ext.getBody().removeAllListeners(); });
        Ext.getCmp('boutonPincipalInterface').addListener('mouseout', function(){  Ext.getBody().addListener('click', function(){ if (Ext.isDefined(Ext.getCmp('menuPrincipalInterface'))) {
            Ext.getCmp('menuPrincipalInterface').hide();
        }}); });
        Ext.getStore('PersonalPrefsStore').on("load",function(){
            var myPrefs=this.getRange()[0];
            /*if (Ext.isEmpty(myPrefs)) {
            myPrefs=Ext.create("Rubedo.model.personalPrefsDataModel",{
            stylesheet:"resources/css/red_theme.css",
            wallpaper:"resources/wallpapers/rubedo.jpg",
            iconSet:"red",
            themeColor:"#D7251D",
            lastEdited: [ ],
            HCMode:false
            });

            this.add(myPrefs);


            }*/


            Ext.getCmp('desktopBackGround').setSrc(myPrefs.get("wallpaper"));
            Ext.util.CSS.swapStyleSheet('maintheme', myPrefs.get("stylesheet"));
            MyPrefData.iconsDir=myPrefs.get("iconSet");
            MyPrefData.themeColor=myPrefs.get("themeColor");
            MyPrefData.HCMode=myPrefs.get("HCMode");
            MyPrefData.lastEdited=myPrefs.get("lastEdited")||[ ];
            if (myPrefs.get("HCMode")){
                Ext.util.CSS.swapStyleSheet('ext_theme', '/components/sencha/extjs/resources/css/ext-all-access.css');
            }
            var task2 =new Ext.util.DelayedTask(function(){
                me.refreshIcons();
            });
            task2.delay(1000);
        });

        Ext.getStore('PersonalPrefsStore').load();
        Ext.getStore("CurrentUserDataStore").on("load", function(){
            var currentUser = this.getRange()[0];
            MyPrefData.myName=currentUser.get("name");
            ACL.defaultWorkspace=currentUser.get("defaultWorkspace");

        });
        var task = new Ext.util.DelayedTask(function(){
            Ext.getStore("CurrentUserDataStore").load();
            // handle url params
            try{me.handleDirectives();}catch(err){
            console.log("error in handling url params");
        }
        });
        task.delay(300);




    },

    placeLibre: function(x, y, id) {
        var libre = true;
        var iconesP = Ext.getCmp('boiteAIconesBureau').items.items;
        Ext.Array.forEach(iconesP,function(icone){
            if ((icone.x==x)&&(icone.y==y)&&(icone.id!=id)) {libre = false;}
        });
        return libre;
    },

    init: function(application) {
                Ext.define('MyPrefData', {
                    singleton: true,

                    iconsDir: 'red',
                    HCMode:false,
                    myName:'Rubedo',
                    themeColor: '#D7251D',
                    simpleMode:false,
                    lastEdited:[ ]
                });
                Ext.getStore("AllLanguagesStore3").load();

        this.control({
            "#boutonPincipalInterface": {
                click: this.afficherMenuPrincipal
            },
            "[itemId='windowMaximize']": {
                click: this.maximize
            },
            "#desktopCont": {
                resize: this.compenserResize
            },
            "window": {
                render: this.componrtementWindow
            },
            "[itemId='windowMinimize']": {
                click: this.minimize
            },
            "iconeBureau": {
                render: this.comportementIcones
            },
            "#salamanderContext menuitem , #specialStudioMenu11 menuitem , #specialAdminMenu22 menuitem": {
                click: this.onMenuitemClick
            },
            "#menuPrincipalDroite button , #simpleModeMainBar button": {
                click: this.ouvrirFenteresMenuDroite
            },
            "#boiteAIconesBureau": {
                afterrender: this.desktopMenu
            },
            "#itemHideAllIcons": {
                click: this.hideAllIcons
            },
            "#itemShowAllIcons": {
                click: this.showAllIcons
            },
            "#itemRearangeAllIcons": {
                click: this.reagarangeAllIcons
            },
            "#itemCustomizeDesktop": {
                click: this.displayDesktopCustomizeWindow
            },
            "#wallpaperGrid": {
                itemclick: this.updateWallpaperPreview,
                expand: this.onGridpanelExpand1
            },
            "#wallpaperPickerButton": {
                click: this.wallpaperChange
            },
            "#themeGrid": {
                expand: this.onGridpanelExpand,
                itemclick: this.onGridpanelItemClick
            },
            "#themePickerButton": {
                click: this.applyTheme
            },
            "#accessibilityOptionsPanel": {
                expand: this.onPanelExpand
            },
            "#highContrastButton": {
                click: this.HCmode,
                render: this.setHCButtonStatus
            },
            "[itemId='boutonCreerRaccourci']": {
                click: this.createIconBtn,
                afterrender: this.onButtonAfterRender
            },
            "#esWindowButton": {
                click: this.launchESWindow
            },
            "#desktopHomeBtn": {
                click: this.onDesktopHomeBtnClick
            },
            "#menuPrincipalDroite button, #salamanderContext menuitem": {
                render: this.mainToolsContextShow
            },
            "#menuPrincipalDroite button": {
                mouseover: this.onButtonMouseOver
            }
        });
    },

    refreshIcons: function() {
        var me=this;
        var icones = Ext.getStore('IconesDataJson').getRange();
        Ext.getCmp("boiteAIconesBureau").removeAll();
        Ext.Array.forEach(icones, function(icone){
            var nIcone = Ext.widget('iconeBureau',{
                bodyStyle:"background-image: url(resources/icones/"+MyPrefData.iconsDir+"/64x64/"+icone.get("image")+")  !important; background: transparent; background-repeat: no-repeat; background-position:top center;",
                html:"<p style=\"margin-top:66px; text-align: center; color: #fff; font-size: 10px;\">"+icone.get("text")+"</p>"
            });
            nIcone.iText=icone.get("text");
            nIcone.recId=icone.get("id");
            nIcone.actions=icone.get("actions");
            nIcone.on("render", function(){
                nIcone.getEl().on("dblclick", function(){
                    me.fireIconActions(nIcone.actions);
                });});
                nIcone.setPosition(icone.data.posX, icone.data.posY);
                Ext.getCmp("boiteAIconesBureau").add(nIcone);
            });
    },

    fireIconActions: function(actions) {
        if (!Ext.isEmpty(actions)){
                Ext.Array.forEach(actions, function(action){
                    if (action.type=="openWindow") {
                        var fenetre = Ext.getCmp(action.target);
                        if (Ext.isDefined(fenetre)){fenetre.show();  fenetre.toFront(); }
                        else {
                            fenetre = Ext.widget(action.target);
                            Ext.getCmp('desktopCont').add(fenetre);
                            if (Ext.isDefined(window.innerHeight)) {
                                if (fenetre.height>(window.innerHeight-40)) {fenetre.setHeight((window.innerHeight-40));}
                                if (fenetre.width>(window.innerWidth)) {fenetre.setWidth((window.innerWidth));}
                            }
                            fenetre.show();
                        }
                    }else if (action.type=="selectRecord") {
                        var target=Ext.getCmp(action.target);
                        if (!Ext.isEmpty(target)) {

                            if (target.getStore().isLoading()) {
                                target.getStore().addListener("load", function(){target.getSelectionModel().select(target.getStore().findRecord("id",action.recordId));},this,{single:true});
                            } else {
                                target.getSelectionModel().select(target.getStore().findRecord("id",action.recordId));
                            }
                        }
                    } else if (action.type=="editContent") {
                        Rubedo.controller.ContributionContenusController.prototype.unitaryContentEdit(action.target);
                    } else if (action.type=="editDAM") {
                        Rubedo.controller.DAMController.prototype.prepareContext(action.target,action.targetType);
                    }  else if (action.type=="fireESWindow") {
                        Ext.getStore("ESFacetteStore").activeFacettes=action.activeFacettes;
                        Ext.getStore("ESFacetteStore").load();
                    }else if (action.type=="pageSelect") {
                        var task = new Ext.util.DelayedTask(function(){
                            Ext.getCmp("pagesSitesCombo").select(Ext.getCmp("pagesSitesCombo").getStore().findRecord("id",action.site));
                            Ext.getCmp("pagesSitesCombo").fireEvent("select",Ext.getCmp("pagesSitesCombo"),[Ext.getCmp("pagesSitesCombo").getStore().findRecord("id",action.site)]);
                            var task2 = new Ext.util.DelayedTask(function(){
                                Ext.getCmp("mainPageTree").selectPath(action.pagePath);
                            });
                            task2.delay(600);

                        });
                        task.delay(400);

                    }

                });

            }
    },

    handleDirectives: function() {
        var recievedDirectives = decodeURIComponent(window.location.search.slice(1))
        .split('&')
        .reduce(function _reduce (a, b) {
            b = b.split('=');
            a[b[0]] = b[1];
            return a;
        }, {});

            if (!Ext.isEmpty(recievedDirectives.content)){
                var task = new Ext.util.DelayedTask(function(){
                    Rubedo.controller.ContributionContenusController.prototype.unitaryContentEdit(recievedDirectives.content);
                });
                task.delay(600);

            }
    },

    setSimpleInterfaceMode: function() {
        Ext.getCmp("entete").getComponent(0).hide();
        Ext.getCmp("entete").getComponent(1).hide();
        Ext.getCmp("entete").getComponent(2).hide();
        Ext.getCmp("entete").getComponent(3).hide();
        Ext.getCmp("boiteAIconesBureau").hide();
        Ext.getCmp("desktopBackGround").hide();
    }

});
