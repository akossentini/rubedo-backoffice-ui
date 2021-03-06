/*
 * File: app/view/AdvancedColorField.js
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

Ext.define('Rubedo.view.AdvancedColorField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.AdvancedColorField',

    fieldLabel: 'Test field',
    allowBlank: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            regex: /^#([0-9a-f]{3}){2}$/i,
            listeners: {
                afterrender: {
                    fn: me.onTextfieldAfterRender,
                    scope: me
                },
                change: {
                    fn: me.onTextfieldChange,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTextfieldAfterRender: function(component, eOpts) {
        if (!component.noPickerDisplay){
            component.inputEl.on("click",function(e){
                ColorPickerControlSingleton.currentTarget=component.getId();
                colorPicker(e,component.getId());
            });
        }
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        var hex="#FFFFFF";
        var textColor="#000000";
        if ((!Ext.isEmpty(newValue))&&(field.isValid())){
            hex=newValue;
        }
        if(this.getLuminance(hex)<70){
            textColor="#FFFFFF";
        }
        field.setFieldStyle({
            'background-color': hex,
            'background-image': 'none',
            'color':textColor
        });

    },

    getLuminance: function(hexCode) {
        hexCode = hexCode.replace('#', '');
        var c_r = parseInt(hexCode.substr(0, 2),16);
        var c_g = parseInt(hexCode.substr(2, 2),16);
        var c_b = parseInt(hexCode.substr(4, 2),16);
        return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    }

});