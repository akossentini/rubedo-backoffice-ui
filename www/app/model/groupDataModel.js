/*
 * File: app/model/groupDataModel.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
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

Ext.define('Rubedo.model.groupDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.groupDataModel',

    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'rights'
        },
        {
            name: 'members'
        },
        {
            name: 'id'
        },
        {
            name: 'version'
        },
        {
            name: 'createTime',
            type: 'date'
        },
        {
            name: 'updateTime',
            type: 'date'
        },
        {
            name: 'roles'
        },
        {
            name: 'readWorkspaces'
        },
        {
            name: 'writeWorkspaces'
        },
        {
            name: 'canDeleteElements'
        },
        {
            name: 'canWriteUnownedElements'
        },
        {
            convert: function(v, rec) {
                return(false);
            },
            name: 'leaf',
            persist: false,
            type: 'boolean'
        },
        {
            defaultValue: true,
            name: 'expandable',
            type: 'boolean'
        },
        {
            name: 'defaultWorkspace'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
        },
        {
            name: 'workspace'
        },
        {
            name: 'inheritWorkspace'
        }
    ]
});