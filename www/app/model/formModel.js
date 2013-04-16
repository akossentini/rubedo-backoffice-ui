/*
 * File: app/model/formModel.js
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

Ext.define('Rubedo.model.formModel', {
    extend: 'Ext.data.Model',
    alias: 'model.formModel',

    fields: [
        {
            name: 'title'
        },
        {
            name: 'version'
        },
        {
            name: 'id'
        },
        {
            defaultValue: [
                
            ],
            name: 'formPages'
        },
        {
            name: 'workspaces'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
        },
        {
            name: 'description'
        },
        {
            name: 'uniqueAnswer'
        },
        {
            defaultValue: 'Vous avez déjà complété cette enquête. Merci.',
            name: 'uniqueAnswerText'
        },
        {
            defaultValue: 'Nous vous remercions d’avoir répondu à cette enquête.',
            name: 'endMessage'
        },
        {
            name: 'openingDate'
        },
        {
            name: 'closingDate'
        },
        {
            dateFormat: 'timestamp',
            name: 'lastUpdateTime',
            type: 'date'
        },
        {
            mapping: 'createUser.fullName',
            name: 'createUser',
            persist: false
        }
    ]
});