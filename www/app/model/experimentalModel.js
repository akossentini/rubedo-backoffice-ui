/*
 * File: app/model/experimentalModel.js
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

Ext.define('Rubedo.model.experimentalModel', {
    extend: 'Ext.data.Model',
    alias: 'model.experimentalModel',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            convert: function(v, rec) {
                return(v);
            },
            name: 'field1',
            type: 'float'
        },
        {
            name: 'field2'
        },
        {
            name: 'field3'
        },
        {
            name: 'field4'
        }
    ]
});