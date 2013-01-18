/*
 * File: app/model/DAMModel.js
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

Ext.define('Rubedo.model.DAMModel', {
    extend: 'Ext.data.Model',
    alias: 'model.DAMModel',

    fields: [
        {
            name: 'title'
        },
        {
            name: 'originalFile'
        },
        {
            name: 'fields'
        },
        {
            name: 'typeId'
        },
        {
            name: 'version',
            type: 'auto'
        },
        {
            name: 'id'
        },
        {
            name: 'taxonomy'
        },
        {
            name: 'lastUpdateTime',
            dateFormat: 'timestamp',
            type: 'date'
        },
        {
            name: 'createTime',
            dateFormat: 'timestamp',
            type: 'date'
        },
        {
            name: 'createUser',
            persist: false
        }
    ]
});