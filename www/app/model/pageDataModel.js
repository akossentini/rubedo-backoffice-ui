/*
 * File: app/model/pageDataModel.js
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

Ext.define('Rubedo.model.pageDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.pageDataModel',

    fields: [
        {
            name: 'text',
            type: 'string'
        },
        {
            name: 'maskId',
            type: 'string'
        },
        {
            name: 'site'
        },
        {
            name: 'version',
            type: 'int'
        },
        {
            name: 'id'
        },
        {
            name: 'blocks'
        },
        {
            name: 'title'
        },
        {
            name: 'description'
        },
        {
            name: 'keywords'
        },
        {
            name: 'pageURL'
        },
        {
            name: 'orderValue',
            sortType: 'asFloat',
            type: 'float'
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
            mapping: 'createUser.fullName',
            persist: false
        },
        {
            name: 'excludeFromMenu',
            type: 'boolean'
        },
        {
            convert: function(v, rec) {
                return(false);
            },
            name: 'leaf',
            type: 'boolean'
        },
        {
            name: 'expandable',
            defaultValue: true,
            type: 'boolean'
        },
        {
            name: 'workspace'
        },
        {
            name: 'inheritWorkspace'
        },
        {
            name: 'readOnly',
            type: 'boolean'
        }
    ]
});