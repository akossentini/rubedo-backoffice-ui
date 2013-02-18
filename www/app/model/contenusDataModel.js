/*
 * File: app/model/contenusDataModel.js
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

Ext.define('Rubedo.model.contenusDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.contenusDataModel',

    fields: [
        {
            name: 'text'
        },
        {
            name: 'champs',
            mapping: 'fields',
            type: 'auto'
        },
        {
            name: 'typeId'
        },
        {
            name: 'status'
        },
        {
            name: 'version',
            type: 'auto'
        },
        {
            name: 'id'
        },
        {
            name: 'taxonomie',
            mapping: 'taxonomy'
        },
        {
            name: 'online',
            type: 'boolean'
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
        },
        {
            name: 'startPublicationDate',
            type: 'date'
        },
        {
            name: 'endPublicationDate',
            type: 'date'
        },
        {
            name: 'target'
        },
        {
            name: 'writeWorkspace'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
        },
        {
            name: 'pageId'
        },
        {
            name: 'blockId'
        }
    ]
});