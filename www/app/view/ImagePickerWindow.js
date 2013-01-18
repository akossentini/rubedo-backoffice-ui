/*
 * File: app/view/ImagePickerWindow.js
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

Ext.define('Rubedo.view.ImagePickerWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ImagePickerWindow',

    requires: [
        'Rubedo.view.MyTool17'
    ],

    height: 406,
    id: 'ImagePickerWindow',
    width: 600,
    layout: {
        type: 'fit'
    },
    title: 'Choix DAM',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onImagePickerWindowRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onImagePickerWindowBeforeClose,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'DAMPickerStore',
                    items: [
                        {
                            xtype: 'button',
                            disabled: true,
                            id: 'imagePickerAcceptBtn',
                            iconCls: 'ouiSpetit',
                            text: 'Choisir',
                            listeners: {
                                click: {
                                    fn: me.onImagePickerAcceptBtnClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                this.up().up().close();
                            },
                            iconCls: 'close',
                            text: 'Annuler'
                        }
                    ]
                }
            ],
            tools: [
                {
                    xtype: 'mytool17'
                }
            ]
        });

        me.callParent(arguments);
    },

    onImagePickerWindowRender: function(abstractcomponent, options) {
        //Ext.getStore("DAMPickerStore").load();
        var allowedTypes=Ext.getCmp(abstractcomponent.targetField).allowedDAMTypes;
        console.log(allowedTypes);
        if (Ext.isEmpty(allowedTypes)){
            delete Ext.getStore("DAMPickerStore").getProxy().extraParams.filter;
            Ext.getStore("DAMPickerStore").load();    
        }else if (allowedTypes.length==1){
            Ext.getStore("DAMPickerStore").getProxy().extraParams.filter="[{\"property\":\"typeId\",\"value\":\""+allowedTypes[0]+"\"}]";
            Ext.getStore("DAMPickerStore").load();
        } else {
            Ext.getStore("DAMPickerStore").getProxy().extraParams.filter="[{\"property\":\"typeId\",\"operator\":\"in\",\"value\":"+Ext.JSON.encode(allowedTypes)+"}]";
            Ext.getStore("DAMPickerStore").load();
        }
        var DAMPicker = Ext.widget("DAMMainView", {id:"DAMPickerView", store:Ext.getStore("DAMPickerStore"), multiSelect:false, plugins:[ ], features: [Ext.create('Ext.ux.grid.feature.Tileview', {
            viewMode: 'tileIcons',
            getAdditionalData: function(data, index, record, orig)
            {



                generateThumbnail = function()
                {
                    return "dam/get-thumbnail?id="+record.get("id");
                };

                if(this.viewMode)
                {
                    return {
                        thumbnails: generateThumbnail(),
                        author:record.get("createUser").fullName,
                        date: Ext.Date.format(record.get("createTime"), 'd-m-Y'),
                        filename:record.get("title")
                    };
                }
                return {};
            },
            viewTpls:
            {
                mediumIcons: [
                '<td class="{cls} ux-explorerview-medium-icon-row">',
                '<table class="x-grid-row-table">',
                '<tbody>',
                '<tr>',
                '<td class="x-grid-col x-grid-cell ux-explorerview-icon" style="background: transparent;">',
                '<img src=\"{thumbnails}\" height=\"100\" width=\"100\">',			
                '</td>',
                '</tr>',
                '<tr>',
                '<td class="x-grid-col x-grid-cell">',
                '<div class="x-grid-cell-inner" unselectable="on">{filename}</div>',
                '</td>',
                '</tr>',
                '</tbody>',
                '</table>',
                '</td>'].join(''),

                tileIcons: [
                '<td class="{cls} ux-explorerview-detailed-icon-row">',
                '<table class="x-grid-row-table">',
                '<tbody>',
                '<tr>',
                '<td class="x-grid-col x-grid-cell ux-explorerview-icon" style="background: transparent;">',
                '<img src=\"{thumbnails}\" height=\"50\" width=\"50\">',			
                '</td>',

                '<td class="x-grid-col x-grid-cell">',
                '<div class="x-grid-cell-inner" unselectable="on">{filename}<br><span>{author}<br>{date}</span></div>',
                '</td>',
                '</tr>',
                '</tbody>',
                '</table>',
                '</td>'].join('')

            }
        }),
        {
            ftype: 'grouping',
            groupHeaderTpl: 'Cuisine: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            disabled: false
        }],
        tbar: [{},'->', {
        xtype: 'switchbuttonsegment',
        activeItem: 1,
        scope: this,
        items: [{
            tooltip: 'Details',
            viewMode: 'default',
            iconCls: 'icon-default'
        }, {
            tooltip: 'Tiles',
            viewMode: 'tileIcons',
            iconCls: 'icon-tile'
        }, {
            tooltip: 'Icons',
            viewMode: 'mediumIcons',
            iconCls: 'icon-medium'
        }],
        listeners: {
            change: function(btn, item)
            {
                btn.up().up().up().features[0].setView(btn.viewMode);		
            },
            scope: this
        }
    }
            ]});
            DAMPicker.on("selectionchange", function(g, s){
    if (Ext.isEmpty(s)){
        Ext.getCmp("imagePickerAcceptBtn").disable();
    } else {
        Ext.getCmp("imagePickerAcceptBtn").enable();
    }
            });
            abstractcomponent.add(DAMPicker);
    },

    onImagePickerWindowBeforeClose: function(panel, options) {
        Ext.getStore("DAMPickerStore").removeAll();
    },

    onImagePickerAcceptBtnClick: function(button, e, options) {
        var target = button.up().up().getComponent(0).getSelectionModel().getLastSelected();
        Ext.getCmp(button.up().up().targetField).setValue(target.get("id"));
        button.up().up().close();
    }

});