/*
 * File: app/view/nouveauTypeContenu.js
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

Ext.define('Rubedo.view.nouveauTypeContenu', {
    extend: 'Ext.window.Window',
    alias: 'widget.nouveauTypeContenu',

    id: 'nouveauTypeContenuFenetre',
    maxHeight: 120,
    width: 300,
    resizable: false,
    iconCls: 'content-icon',
    title: 'Nouveau type de contenu',
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'champCreerTC',
                            fieldLabel: 'Nom ',
                            allowBlank: false
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            ACL: 'write.ui.dependantTypes',
                            id: 'champTCIsDep',
                            fieldLabel: 'Imbriqué ',
                            boxLabel: ''
                        },
                        {
                            xtype: 'button',
                            anchor: '100%',
                            id: 'boutonCreerTC',
                            text: 'Créer un nouveau type de contenu'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});