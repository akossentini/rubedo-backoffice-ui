/*
 * File: app/model/contenusDataModel.js
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

Ext.define('Rubedo.model.contenusDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.contenusDataModel',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'text'
        },
        {
            mapping: 'fields',
            name: 'champs',
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
            mapping: 'taxonomy',
            name: 'taxonomie'
        },
        {
            name: 'online',
            type: 'boolean'
        },
        {
            dateFormat: 'timestamp',
            name: 'lastUpdateTime',
            type: 'date'
        },
        {
            dateFormat: 'timestamp',
            name: 'createTime',
            type: 'date'
        },
        {
            name: 'createUser',
            persist: false
        },
        {
            name: 'startPublicationDate'
        },
        {
            name: 'endPublicationDate'
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
            name: 'maskId'
        },
        {
            name: 'blockId'
        },
        {
            name: 'locale'
        },
        {
            name: 'i18n'
        },
        {
            name: 'nativeLanguage'
        },
        {
            name: 'isProduct',
            type: 'boolean'
        },
        {
            name: 'productProperties'
        }
    ]
});