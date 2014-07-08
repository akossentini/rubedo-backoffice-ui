/*
 * File: app/view/ordersInterface.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
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

Ext.define('Rubedo.view.ordersInterface', {
    extend: 'Ext.window.Window',
    alias: 'widget.ordersInterface',

    requires: [
        'Rubedo.view.MyTool16',
        'Rubedo.view.MyTool17',
        'Rubedo.view.ImagePickerField',
        'Ext.panel.Tool',
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.field.Display'
    ],

    height: 566,
    id: 'ordersInterface',
    width: 1201,
    constrainHeader: true,
    iconCls: 'content-icon',
    title: 'Orders',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'mytool16'
                },
                {
                    xtype: 'mytool17'
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'ordersMainGrid',
                    title: '',
                    forceFit: true,
                    store: 'Orders',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'orderNumber',
                            text: 'Order Number'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'userName',
                            text: 'Client name'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return (value+" €");
                            },
                            dataIndex: 'finalPrice',
                            text: 'Full Price'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                try {
                                    return value.totalItems;
                                } catch(err){
                                    return "";
                                }
                            },
                            hidden: true,
                            sortable: false,
                            dataIndex: 'detailedCart',
                            text: 'Items'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'createTime',
                            text: 'Date'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'paymentMeans',
                            text: 'Payment means'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                try {
                                    return value.name;
                                } catch(err){
                                    return "";
                                }
                            },
                            sortable: false,
                            dataIndex: 'shipper',
                            text: 'Shipper'
                        },
                        {
                            xtype: 'booleancolumn',
                            hidden: true,
                            dataIndex: 'hasStockDecrementIssues',
                            text: 'Stock issues',
                            falseText: 'No',
                            trueText: 'Yes'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'status',
                            text: 'Status'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'Orders'
                        }
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onOrdersMainGridSelectionChange,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    disabled: true,
                    id: 'orderDetailHolder',
                    autoScroll: true,
                    title: '',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            id: 'orderSettingsForm',
                            bodyPadding: 10,
                            title: 'Settings',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Attachments',
                                    items: [
                                        {
                                            xtype: 'ImagePickerField',
                                            allowedFileType: 'Document',
                                            smallMode: true,
                                            fieldLabel: 'Bill',
                                            labelWidth: 120,
                                            name: 'billDocument'
                                        }
                                    ]
                                },
                                me.processStatus({
                                    xtype: 'combobox',
                                    anchor: '60%',
                                    style: 'float:left;',
                                    fieldLabel: 'Order status *',
                                    name: 'status',
                                    allowBlank: false,
                                    allowOnlyWhitespace: false,
                                    editable: false,
                                    forceSelection: true
                                }),
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var form=button.up().getForm();
                                        if (form.isValid()){
                                            Ext.getCmp("ordersMainGrid").getSelectionModel().getLastSelected().set(form.getValues());
                                        }
                                    },
                                    anchor: '40%',
                                    style: 'float:right;',
                                    text: 'Apply changes'
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: 'orderDetailForm',
                            bodyPadding: 10,
                            title: 'Pricing and cilent data',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 0.6,
                                    title: 'Pricing',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Shipping price (TF)',
                                            labelWidth: 120,
                                            name: 'shippingPrice',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Shipping taxes',
                                            labelWidth: 120,
                                            name: 'shippingTax',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Shipping price',
                                            labelWidth: 120,
                                            name: 'shippingTaxedPrice',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Total price (TF)',
                                            labelWidth: 120,
                                            name: 'finalTFPrice',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Tax total',
                                            labelWidth: 120,
                                            name: 'finalTaxes',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Total price',
                                            labelWidth: 120,
                                            name: 'finalPrice',
                                            value: 'Display Field'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: 'Client',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Name',
                                            name: 'userName',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Billing address',
                                            name: 'textBillingAddress',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Shipping address',
                                            name: 'textShippingAddress',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Payment means',
                                            name: 'paymentMeans',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Shipper',
                                            name: 'textShipper',
                                            value: 'Display Field'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            anchor: '100%',
                                            fieldLabel: 'Shipping comments',
                                            name: 'shippingComments'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            height: 400,
                            id: 'baughtProductsGrid',
                            title: 'Products',
                            forceFit: true,
                            store: 'BoughtProducts',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'title',
                                    text: 'Title'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'subtitle',
                                    text: 'Subtitle'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'unitPrice',
                                    text: 'Unit price'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'unitTaxedPrice',
                                    text: 'Unit taxed price'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'amount',
                                    text: 'Amount'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'price',
                                    text: 'Price'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'taxedPrice',
                                    text: 'Taxed Price'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onOrdersInterfaceRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onOrdersInterfaceBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    processStatus: function(config) {
        config.store=RubedoExtendableSettings.orderStatusList;
        return config;
    },

    onOrdersMainGridSelectionChange: function(model, selected, eOpts) {
        if (Ext.isEmpty(selected)){
            Ext.getCmp("orderDetailHolder").disable();
            Ext.getCmp("orderDetailHolder").getComponent(1).getForm().reset();
            Ext.getCmp("orderDetailHolder").getComponent(0).getForm().reset();
            Ext.getCmp("orderDetailHolder").getComponent(2).getStore().removeAll();
        } else {
            Ext.getCmp("orderDetailHolder").enable();
            var values=Ext.clone(selected[0].getData());
            values.textBillingAddress="";
            Ext.Object.each(values.billingAddress,function(key,value,myself){
                values.textBillingAddress=values.textBillingAddress+value+" ";
            });
            values.textShippingAddress="";
            Ext.Object.each(values.shippingAddress,function(key,value,myself){
                values.textShippingAddress=values.textShippingAddress+value+" ";
            });
            values.textShipper=values.shipper.name;
            Ext.getCmp("orderDetailHolder").getComponent(1).getForm().setValues(values);
            Ext.getCmp("orderDetailHolder").getComponent(0).getForm().setValues(values);
            Ext.getCmp("orderDetailHolder").getComponent(2).getStore().loadData(values.detailedCart.cart);
        }
    },

    onOrdersInterfaceRender: function(component, eOpts) {
        Ext.getStore("Orders").clearFilter(true);
        Ext.getStore("Orders").loadPage(1);
    },

    onOrdersInterfaceBeforeClose: function(panel, eOpts) {
        Ext.getStore("Orders").removeAll();
    }

});