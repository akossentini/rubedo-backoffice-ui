/*
 * File: app/view/importProductOptionsForm.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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

Ext.define('Rubedo.view.importProductOptionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.importProductOptionsForm',

    requires: [
        'Ext.form.field.ComboBox'
    ],

    localiserId: 'importProductOptionForm',
    id: 'importProductOptionsForm',
    width: 200,
    bodyPadding: 10,
    title: 'Product fields',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'combobox',
                    localiserId: 'baseSkuField',
                    anchor: '100%',
                    fieldLabel: 'Base SKU',
                    labelWidth: 60,
                    name: 'baseSkuFieldIndex',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'NotInportFieldsStore',
                    valueField: 'csvIndex'
                },
                {
                    xtype: 'combobox',
                    localiserId: 'basePriceField',
                    anchor: '100%',
                    fieldLabel: 'Base price',
                    labelWidth: 60,
                    name: 'basePriceFieldIndex',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'NotInportFieldsStore',
                    valueField: 'csvIndex'
                },
                {
                    xtype: 'combobox',
                    localiserId: 'PreparationDelayField',
                    anchor: '100%',
                    fieldLabel: 'Preparation delay',
                    labelWidth: 60,
                    name: 'preparationDelayFieldIndex',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'NotInportFieldsStore',
                    valueField: 'csvIndex'
                },
                {
                    xtype: 'combobox',
                    localiserId: 'skuField',
                    anchor: '100%',
                    fieldLabel: 'SKU',
                    labelWidth: 60,
                    name: 'skuFieldIndex',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'NotInportFieldsStore',
                    valueField: 'csvIndex'
                },
                {
                    xtype: 'combobox',
                    localiserId: 'priceField',
                    anchor: '100%',
                    fieldLabel: 'Price',
                    labelWidth: 60,
                    name: 'priceFieldIndex',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'NotInportFieldsStore',
                    valueField: 'csvIndex'
                },
                {
                    xtype: 'combobox',
                    localiserId: 'stockField',
                    anchor: '100%',
                    fieldLabel: 'Stock',
                    labelWidth: 60,
                    name: 'stockFieldIndex',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    store: 'NotInportFieldsStore',
                    valueField: 'csvIndex'
                }
            ]
        });

        me.callParent(arguments);
    }

});