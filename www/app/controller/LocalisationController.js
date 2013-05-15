/*
 * File: app/controller/LocalisationController.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('Rubedo.controller.LocalisationController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.LocalisationController',

    models: [
        'LocalisationModel'
    ],
    stores: [
        'LocalisationStore'
    ],

    onButtonAfterRender1: function(component, eOpts) {
        try {
            component.on("click", function(){
                Ext.widget('callout', {
                    cls: 'gray',
                    width: 400,
                    html:Rubedo.RubedoAppHelp[component.RApplication],
                    calloutArrowLocation: 'top-right',
                    target: component,
                    relativePosition: 't-b',
                    relativeOffsets: [-184,0],
                    fadeInDuration: 200,
                    fadeOutDuration: 200,
                    dismissDelay: 60000
                }).show();

            });
        } catch (err){
            console.log("failed to show application help");
        }
    },

    onComponentBeforeRender: function(component, eOpts) {
        if (component.localiserId){
            var configs = Rubedo.RubedoInterfaceLoc[component.localiserId];
            if (!Ext.isEmpty(configs)) {
                Ext.apply(component, configs);
            }
            if ((component.isXType("button"))&&(component.scale=="large")){
                component.minWidth=48;
            }
        }
        if ((component.isXType("field"))||(component.isXType("checkboxgroup"))||(component.isXType("radiogroup"))){
            component.labelSeparator=" ";
            if (component.fieldLabel=="Localisable"){
                //temporary localiser hide
                component.hide();
            }
        }
    },

    onBasefieldAdded: function(component, container, pos, eOpts) {
        if (component.localiserId){
            var configs = Rubedo.RubedoInterfaceLoc[component.localiserId];
            if (!Ext.isEmpty(configs)) {
                Ext.apply(component, configs);
            }
        }
        if (!Ext.isEmpty(component.RTip)){
            component.anchor="90%";
            container.insert(pos,Ext.widget("RHelpBtn", {tooltip:component.RTip}));
        }
    },

    onFieldsetAfterRender: function(component, eOpts) {
        var task = new Ext.util.DelayedTask(function(){
            component.setTitle(component.title);
        });
        task.delay(100);
    },

    init: function(application) {
        var me=this;
        Ext.override(Ext.form.field.Date, {
            submitFormat:'U',
            altFormats:'U|m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j'
        });
        Ext.require("Ext.ux.callout.Callout");

        //get language param

        //apply correct locale file

        //define localisation singletons 
        Ext.define("Rubedo.RubedoAppHelp",{
            singleton:true,
            pages:"<p>Les différentes pages d'un site peuvent aisément être enrichies de blocs fonctionnels.L'application \"Pages\" permet :</p><ul><li> d'accéder à la vue arborescente des sites gérés sur la plateforme,</li><li> d'ajouter des pages sur la base des masques de pages existants,</li><li> de modifier ou de supprimer des pages,</li><li> d'ajouter des fonctionnalités aux pages par le biais de la bibliothèque de blocs fonctionnels,</li><li> de prévisualiser l'affichage d'une page en front-office,</li><li> de gérer les paramètres de référencement naturel,</li><li> de gérer les droits en lecture et écriture au travers des espaces de travail.</li></ul>",
            sites:"<p>Rubedo offre nativement la fonctionnalité d'usine à sites.L'application \"Sites\" permet  :</p><ul><li> de créer de nouveaux sites au travers d'un assistant de création </li><li>  sur la base de modèles existants ou en partant d'un modèle vierge </li><li>  de modifier le paramétrage des sites existants</li></ul>",
            masks:"<p>Les masques de pages représentent les différents gabarits de rendu disponibles en front-office.L'application \"Masques de pages\" permet  :</p><ul><li> de créer de nouveaux gabarits de mise en page en lignes et colonnes</li> <li>  de dupliquer des masques existants, éventuellement d'un site vers un autre</li> <li>  de gérer les blocs fonctionnels persistants, tels que les menus</li> <li>  de constituer une bibliothèques d'éléments (lignes, colonnes ou blocs) réutilisables entre les masques</li> <li>  de gérer les paramètres de \"Responsive Design\" : visibilité des lignes, colonnes et blocs sur téléphone, tablette, ou ordinateur</li> </ul>",
            contentTypes:"<p>Les types de contenus correspondent aux données structurées gérées par Rubedo : articles, news, ...etc.L'application \"Types de contenus\" permet  :</p><ul><li> de créer de nouveaux types de contenus à l'aide d'un éditeur avancé</li><li>  de paramétrer champs par champs les contrôles de saisie, les valeurs par défaut, le caractère obligatoire</li><li>  de modifier des types de contenus existants</li><li>  de gérer le caractère localisable (plusieurs langue), et recherchable d'un champ</li><li>  de gérer les aides à la saisie</li><li>  de déclarer les vocabulaires applicables à la classification du contenu</li><li>  de déclarer le workflow applicable au contenu</li><li>  de déclarer le ou les espaces de travail autorisés pour la création et la diffusion des contenus</li></ul>",
            damTypes:"<p>Les types de média correspondent aux fichiers gérés par Rubedo : images, vidéo, audio, animation ou documents bureautiques.L'application \"Types de médias\" permet  :</p><ul><li> de créer de nouveaux types de médias (image, document, vidéo, audio, animation)</li><li> d'y ajouter des métadonnées (auteur, copyright, sous-titrage, ...etc.) à l'aide d'un éditeur avancé</li><li> de paramétrer champs par champs les contrôles de saisie, les valeurs par défaut, le caractère obligatoire</li><li> de modifier des types de médias existants</li><li> de gérer le caractère localisable (plusieurs langue), et recherchable d'une métadonnée</li><li> de gérer les aides à la saisie</li><li> de déclarer les vocabulaires applicables à la classification d'un média</li><li> de déclarer le ou les espaces de travail autorisés pour la création et la diffusion des médias</li></ul>",
            queries:"<p>Les requêtes permettent de créer des listes automatiques ou manuelles de contenus, documents et médias.L'application \"Requêtes\" permet  :</p><ul><li> de créer et sauvegarder des requêtes simples ou avancées, sur les contenus ou les médias</li><li> de modifier des requêtes existantes</li><ul>",
            taxonomy:"<p>La taxonomie permet de créer une classification multi-dimensionnelle de l'ensemble des contenus (textes, médias et documents).L'application \"Taxonomie\" permet  :</p><ul><li> de créer de nouveaux vocabulaires arborescents et d'y ajouter des termes</li> <li> d'appliquer des droits pour les espaces de travail et une aide dédiée pour chaque taxonomie</li> <li> de définir ses caractéristiques : extensible, choix multiple, obligatoire</li></ul>",
            groups:"<p>Les groupes permettent de définir les utilisateurs, les espaces de travail et les rôles de gestion associés.L'application \"Groupes\" permet  :</p><ul><li> de créer des groupes d'utilisateurs</li><li>  d'ajouter des utilisateurs à ces groupes</li><li>  de paramétrer les droits associés à chaque groupe : Espaces de travail (en lecture, en contribution, par défaut) et rôles</li><li>  de gérer les groupes (suppression, modification, déplacement, hiérarchisation)</li></ul>",
            workspaces:"<p>Les espaces de travail permettent de réserver l'accès en lecture, écriture ou diffusion sur des types de contenus, de médias ou des rubriques de sites à des groupes d'utilisateurs spécifiques.L'application \"Espaces de travail\" permet  :</p><ul><li> de créer des espaces</li><li> de supprimer les espaces de travail</li></ul>",
            users:"<p>Les utilisateurs front-office et back-office sont regroupés au sein d'un annuaire interne. Les droits accordés à un utilisateur sont liés aux groupes auxquels il appartient.L'application \"Utilisateurs\" permet  :</p><ul><li> d'ajouter des utilisateurs</li> <li> de compléter les profils (email, service, fonction, photo, ...)</li> <li>  de gérer les accès et les droits (identifiant, mot de passe, groupes, validité du compte)</li> </ul> ",
            contents:"<p>Rubedo gère un référentiel transverse de contenus qui peuvent être publiés sur différents sites et espaces de travail.L'application \"Contenus\" permet  :</p><ul><li> de créer un contenu à partir d'un type de contenu paramétré</li> <li>  de gérer son état dans le workflow de publication attribué au type de contenu</li> <li>  de gérer la publication différée</li> <li>  de classer le contenu à l'aide des vocabulaires autorisés pour ce type de contenu</li> <li>  d'associer le contenu à un espace de contribution et des espaces de diffusion</li> <li>  de modifier les contenus</li> <li>  de dupliquer les contenus</li> <li>  d'ajouter un contenu en favori</li> </ul> ",
            dam:"<p>La médiathèque permet de gérer les médias ( images, vidéo, audio, animation ou documents) en fonction des types de médias paramétrés.L'application \"Médiathèque\" permet  :</p><ul><li> de créer un média à partir d'un type de média paramétré</li><li>  d'uploader un média et de renseigner les métadonnées associées</li><li>  de classer le média à l'aide des vocabulaires autorisés pour ce type de média</li><li>  d'associer le média à un espace de contribution et des espaces de diffusion</li><li>  de modifier les média</li><li>  d'ajouter un média en favori</li></ul>",
            forms:"<p>Rubedo permet de réaliser des enquêtes en ligne à l'aide de l'application questionnaire. Les fonctions de glisser/déposer facilitent la création des questions et des étapes. L'application Questionnaire permet :</p><ul><li> d'ajouter, supprimer et dupliquer un questionnaire</li><li> d'ajouter un questionnaire en favoris</li><li> de gérer les propriétés d'un questionnaire,  les conditions d'unicité et sa mise en ligne</li><li> de créer un questionnaire à l'aide des palettes d'outils de mise en forme (Wysiwyg, image, section, page, titre) et de paramétrage (type de questions)</li><li> de gérer les paramétres des questions et des réponses (label, bulle d'aide, obligatoire, conditionnel et options)</li><li> d'exploiter les résultats de chaque questionnaire en exportant au format csv</li></ul>"

        });
        Ext.define("Rubedo.RubedoInterfaceLoc",{
            singleton:true
        });
        Ext.define("Rubedo.RubedoAutomatedElementsLoc",{
            singleton:true,
            notifTitle:"Notififcation",
            notifCreate:"<p>Création réussie.</p>",
            notifUpdate:"<p>Mise à jour réussie.</p>",
            notifDestroy:"<p>Suppression réussie.</p>",
            errorTitle:"Erreur",
            serverConnectionError:"Connexion au serveur interrompue",
            internalServerError:"Erreur interne du serveur",
            unkownError:"Erreur inconnue",
            activateText:"Activer",
            pageHoldsDefaultError:"Cette page ne peut etre suprimée car elle u une de ses décendantes est utilisée comme page de détail du site",
            pageHoldsDefaultServerError:"Erreur dans la détermination du statut supprimable de la page",
            deactivateText:"Désactiver",
            windowBeforeUnloadMessage:"Vous allez quitter le Back Office et perdre toute modification non sauvegardée.",
            maskIsUsedText:"Le masque ne peut etre supprimé car il est utilisé par des pages.",
            selectAnElementText:"Sélectionnez un élément",
            columnText:"Colonne",
            lignText:"Ligne",
            titleText:"Titre",
            displayTitleText:"Afficher le titre",
            visibilityText:"Visibilité",
            telephoneText:"Téléphone",
            tabletText:"Tablette",
            computerText:"Ordinateur",
            HTMLClassText:"Classe HTML",
            HTMLIdText:"Id HTML",
            styleText:"Style",
            tagText:"Tag",
            displayAsTabsText:"Afficher en onglets",
            displayRowTagText:"Afficher la baliser row",
            displayRowFluidTagText:"Afficher la balise row-fluid",
            includeInAContainerText:"Inclure dans un container",
            includeInAContainerFluidText:"Inclure dans un container-fluid",
            containerIdText:"Id du container",
            containerClassText:"Classe du container",
            mainColumnText:"Colonne principale",
            mainColumnRTip:"Permet de définir l'emplacement d'affichage des contenus proposés sous forme de liste dans les pages utilisants ce masque.",
            showSpanAndOffsetText:"Afficher le span et l'offset",
            offsetText:"Offset",
            spanText:"Span",
            columnIdRecoveryError:"Erreur dans la récupération d\'un identifiant de colonne",
            displayInADivText:"Afficher dans une div",
            divIdText:"Id de la div",
            divClassText:"Classe de la div",
            blockText:"Bloc",
            URLPrefixText:"Préfixe URL",
            invalidMetaError:"Certains champs de métadonnées sont invalides.",
            invalidTaxoError:"Certains champs de taxonomie sont invalides.",
            invalidFieldsError:"Certains champs sont invalides.",
            insufficientContentRightsError:"Vos droits sont insuffisants pour afficher ou modifier ce contenu",
            newContentText:"Nouveau Contenu",
            maxOneLocFieldError:"Un type de contenus ne peut pas avoir plusieurs champs de type \"Localisation\".",
            contentTypeIsUsedError:"Ce type de contenu est utilsé par des contenus et ne peut donc pas etre supprimé.",
            warningTitle:"Attention",
            contentTypeIncompatModifError:"Le type de contenu est utilisé par des contenus et ces modifications ne sont pas compatibles.",
            contentTypeModifWarning:"Ce type de contenu est utilisé par des contenus. Le modifier pourrait avoir de répercussions. </br> Souhaitez-vous continuer ?",
            fieldReplicaText:"Replique du champ",
            successTitle:"Succés",
            contentsDeleteError:"Erreur dans la suppression des contenus",
            contentTypeHasBeenEmptiedText:"Le type de contenu a été vidé",
            fieldNameAlreadyUsedError:"Nom dèjà utilisé par un autre champ",
            passwordsDoNotMatchError:"Les mots de passe ne correspondent pas",
            passwordChangedText:"Mot de passe changé",
            rightsRecoveryError:"Erreur dans la récupération des droits",
            tokenRecoveryError:"Erreur dans la récupération du jeton de sécurité",
            siteModifWarning:"La modification de ce site impliquera la fermeture de la fenetre de gestion des pages. Cela entrainera la perte de toute modification non sauvegardée dans cette fenetre. </br> Souhaitez-vous poursuivre ?",
            pageURLRecoveryError:"Erreur dans la récupèration de l'url de la page",
            pagePreviewText:"Ceci est un aperçu de cette page telle que disponible en ligne en",
            associatedMaskText:"Masque associé",
            pagePropertiesInvalidError:"Les propriétés de la page sont invalides.",
            stageText:"Etape",
            onText:"sur",
            ascText:"Croissant",
            descText:"Decroissant",
            andText:"Et",
            thenText:"Puis",
            mediaTypeIsUsedError:"Ce type de média est utilisé par des médias et ne peut donc etre supprimé.",
            invalidRightsPropertiesError:"Configuration invalide des droits",
            newDamText:"Nouveau média",
            DAMEditText:"Edition du média",
            DAMDisplayText:"Affichage du média",
            searchText:"Recherche",
            identifierRecoveryError:"Erreur dans la récupération d'un identifiant",
            invalidFormPropertiesError:"Propriétés du formulaire invalides",
            fileAnalysisError:"Erreur dans l'analyse du fichier",
            identifiedFieldsText:"champs identifiés et",
            importableContentsText:"contenus importables",
            importedContentsText:"contenus importés",
            importError:"Erreur lors de l'import",
            eligibleContentTypesText:"Types de contenus eligibles",
            eachContentMustVerifyRulesText:"Chaque contenu doit verifier les règles suivantes",
            eachContentMustVerifyAtLeastOneRuleText:"Chaque contenu doit verifier au moins une des règles suivantes",
            taxonomyText:"Taxonomie",
            rulesAndSortsOnFieldsText:"Règles et tris sur les champs des contenus",
            ascSortText:"tri croissant",
            descSortText:"tri decroissant",
            relationBetweenRulesText:"Relation entre les règles",
            creationText:"Création",
            lastUpdateText:"Dernière modification",
            noVocabForTheseCtText:"Pas de vocabulaire disponible pour cet ensemble de types de contenus",
            ruleText:"Règle",
            tRuleAllText:"Contient tous les termes",
            tRuleAllRecText:"Contient tous les termes ou au moins un descendant par terme",
            tRuleSomeText:"Contient au moins un des termes",
            tRuleSomeREcText:"Contient au moins un des termes ou au moins un des descendants d’un des termes",
            tRuleNotText:"Ne contient aucun des termes suivants",
            tRuleNotRecText:"Ne contient ni les termes suivants ni leurs descendants",
            CTMustHaveTitleError:"Le type de contenu doit obligatoirement avoir un champ de type \"Titre\"",
            CTMustHaveOnlyOneTitleError:"Le type de contenu ne doit avoir qu'un seul champ de type \"Titre\"",
            CTMustHaveOnlyOneSummaryError:"Le type de contenu ne doit avoir qu'un seul champ de type \"Résumé\"",
            CRMustHaveOnlyOneLocFieldError:"Le type de contenu ne doit avoir qu'un seul champ de type \"Localisation\"",
            notMentionedText:"non renseigné",
            showOnlyIfText:"Affiché si et seulement si",
            orText:"Ou",
            rootText:"Racine",
            esGeoQueryText:"Assistant de requête Elastic Search geolocalisée",
            esQueryText:"Assistant de requête Elastic Search",
            esDAMQueryText:"Assistant de requête DAM Elastic Search",
            keywordsText:"Mots-clés",
            defaultKeywordsText:"Mots-clés par défaut",
            defaultSinglePageText:"Page de détail par défaut",
            homePageText:"Page d'accueil",
            rolesText:"Rôles"
        });
        // attach event and load localisation store
        Ext.getStore("LocalisationStore").on("load",function(){
            me.updateLocalisationSingletons();
        });

        this.control({
            "#RHelpBtn": {
                afterrender: this.onButtonAfterRender1
            },
            "component": {
                beforerender: this.onComponentBeforeRender
            },
            "field, checkboxgroup, radiogroup": {
                added: this.onBasefieldAdded
            },
            "fieldset": {
                afterrender: this.onFieldsetAfterRender
            }
        });
    },

    produceInterfaceLocalisationJSON: function() {
        var result= { };
        var count=0;
        Ext.Object.each(Rubedo.view, function(a){
            var test=Ext.create("Rubedo.view."+a,{id:undefined});
            if (!Ext.isEmpty(test.localiserId)){
                count=count+1;
                if (test.isXType("field")){
                    result[test.localiserId]={
                        fieldLabel:test.fieldLabel,
                        RTip:test.RTip
                    };
                } else if (test.isXType("button")){
                    result[test.localiserId]={
                        text:test.text,
                        tooltip:test.tooltip
                    };
                } else if (test.isXType("fieldset")){
                    result[test.localiserId]={
                        title:test.title
                    };
                } else if (test.isXType("panel")){
                    result[test.localiserId]={
                        title:test.title
                    };
                } else if (test.isXType("window")){
                    result[test.localiserId]={
                        title:test.title
                    };
                }else if (test.isXType("gridcolumn")){
                    result[test.localiserId]={
                        text:test.text
                    };
                } else {
                    console.log("unhandled localised component for id : "+test.localiserId); 
                    count=count-1;
                }
            }
            try{
                Ext.Array.forEach(test.query("component"), function(component){
                    if (!Ext.isEmpty(component.localiserId)){
                        count=count+1;
                        if (component.isXType("field")){
                            result[component.localiserId]={
                                fieldLabel:component.fieldLabel,
                                RTip:component.RTip
                            };
                        } else if (component.isXType("button")){
                            result[component.localiserId]={
                                text:component.text
                            };
                        } else if (component.isXType("fieldset")){
                            result[component.localiserId]={
                                title:component.title
                            };
                        } else if (component.isXType("panel")){
                            result[component.localiserId]={
                                title:component.title
                            };
                        } else if (component.isXType("window")){
                            result[component.localiserId]={
                                title:component.title
                            };
                        }else if (component.isXType("gridcolumn")){
                            result[component.localiserId]={
                                text:component.text
                            };
                        } else {
                            console.log("unhandled localised component for id : "+component.localiserId); 
                            count=count-1;
                        }
                    }
                });

            }catch(err){
                //console.log(err);
            }
            test.destroy();
        });
        console.log(count+" localised interface components");
        return(result);
    },

    updateLocalisationSingletons: function() {
        //todo : move this to server side

        var userLanguage=Ext.getStore("CurrentUserDataStore").getRange()[0].get("language");
        Ext.Array.forEach(Ext.getStore("LocalisationStore").getRange(),function(localiser){
            var toUpdate =Rubedo[localiser.get("name")];
            if (!Ext.isEmpty(toUpdate)){
                Ext.apply(toUpdate, localiser.get("items"));
            }
        });
        if ((!Ext.isEmpty(userLanguage))&&(userLanguage!="fre")){
            Ext.Array.forEach(Ext.getStore("LocalisationStore").getRange(),function(localiser){
                var toUpdate =Rubedo[localiser.get("name")];
                if (!Ext.isEmpty(toUpdate)){
                    if(!Ext.isEmpty(localiser.get("i18n")[userLanguage])){
                        Ext.apply(toUpdate, localiser.get("i18n")[userLanguage]);
                    }
                }
            });
        }
    },

    createLocalisationDefaults: function() {
        var me = this;
        var defaultHelp={
            pages:"<p>Les différentes pages d'un site peuvent aisément être enrichies de blocs fonctionnels.L'application \"Pages\" permet :</p><ul><li> d'accéder à la vue arborescente des sites gérés sur la plateforme,</li><li> d'ajouter des pages sur la base des masques de pages existants,</li><li> de modifier ou de supprimer des pages,</li><li> d'ajouter des fonctionnalités aux pages par le biais de la bibliothèque de blocs fonctionnels,</li><li> de prévisualiser l'affichage d'une page en front-office,</li><li> de gérer les paramètres de référencement naturel,</li><li> de gérer les droits en lecture et écriture au travers des espaces de travail.</li></ul>",
            sites:"<p>Rubedo offre nativement la fonctionnalité d'usine à sites.L'application \"Sites\" permet  :</p><ul><li> de créer de nouveaux sites au travers d'un assistant de création </li><li>  sur la base de modèles existants ou en partant d'un modèle vierge </li><li>  de modifier le paramétrage des sites existants</li></ul>",
            masks:"<p>Les masques de pages représentent les différents gabarits de rendu disponibles en front-office.L'application \"Masques de pages\" permet  :</p><ul><li> de créer de nouveaux gabarits de mise en page en lignes et colonnes</li> <li>  de dupliquer des masques existants, éventuellement d'un site vers un autre</li> <li>  de gérer les blocs fonctionnels persistants, tels que les menus</li> <li>  de constituer une bibliothèques d'éléments (lignes, colonnes ou blocs) réutilisables entre les masques</li> <li>  de gérer les paramètres de \"Responsive Design\" : visibilité des lignes, colonnes et blocs sur téléphone, tablette, ou ordinateur</li> </ul>",
            contentTypes:"<p>Les types de contenus correspondent aux données structurées gérées par Rubedo : articles, news, ...etc.L'application \"Types de contenus\" permet  :</p><ul><li> de créer de nouveaux types de contenus à l'aide d'un éditeur avancé</li><li>  de paramétrer champs par champs les contrôles de saisie, les valeurs par défaut, le caractère obligatoire</li><li>  de modifier des types de contenus existants</li><li>  de gérer le caractère localisable (plusieurs langue), et recherchable d'un champ</li><li>  de gérer les aides à la saisie</li><li>  de déclarer les vocabulaires applicables à la classification du contenu</li><li>  de déclarer le workflow applicable au contenu</li><li>  de déclarer le ou les espaces de travail autorisés pour la création et la diffusion des contenus</li></ul>",
            damTypes:"<p>Les types de média correspondent aux fichiers gérés par Rubedo : images, vidéo, audio, animation ou documents bureautiques.L'application \"Types de médias\" permet  :</p><ul><li> de créer de nouveaux types de médias (image, document, vidéo, audio, animation)</li><li> d'y ajouter des métadonnées (auteur, copyright, sous-titrage, ...etc.) à l'aide d'un éditeur avancé</li><li> de paramétrer champs par champs les contrôles de saisie, les valeurs par défaut, le caractère obligatoire</li><li> de modifier des types de médias existants</li><li> de gérer le caractère localisable (plusieurs langue), et recherchable d'une métadonnée</li><li> de gérer les aides à la saisie</li><li> de déclarer les vocabulaires applicables à la classification d'un média</li><li> de déclarer le ou les espaces de travail autorisés pour la création et la diffusion des médias</li></ul>",
            queries:"<p>Les requêtes permettent de créer des listes automatiques ou manuelles de contenus, documents et médias.L'application \"Requêtes\" permet  :</p><ul><li> de créer et sauvegarder des requêtes simples ou avancées, sur les contenus ou les médias</li><li> de modifier des requêtes existantes</li><ul>",
            taxonomy:"<p>La taxonomie permet de créer une classification multi-dimensionnelle de l'ensemble des contenus (textes, médias et documents).L'application \"Taxonomie\" permet  :</p><ul><li> de créer de nouveaux vocabulaires arborescents et d'y ajouter des termes</li> <li> d'appliquer des droits pour les espaces de travail et une aide dédiée pour chaque taxonomie</li> <li> de définir ses caractéristiques : extensible, choix multiple, obligatoire</li></ul>",
            groups:"<p>Les groupes permettent de définir les utilisateurs, les espaces de travail et les rôles de gestion associés.L'application \"Groupes\" permet  :</p><ul><li> de créer des groupes d'utilisateurs</li><li>  d'ajouter des utilisateurs à ces groupes</li><li>  de paramétrer les droits associés à chaque groupe : Espaces de travail (en lecture, en contribution, par défaut) et rôles</li><li>  de gérer les groupes (suppression, modification, déplacement, hiérarchisation)</li></ul>",
            workspaces:"<p>Les espaces de travail permettent de réserver l'accès en lecture, écriture ou diffusion sur des types de contenus, de médias ou des rubriques de sites à des groupes d'utilisateurs spécifiques.L'application \"Espaces de travail\" permet  :</p><ul><li> de créer des espaces</li><li> de supprimer les espaces de travail</li></ul>",
            users:"<p>Les utilisateurs front-office et back-office sont regroupés au sein d'un annuaire interne. Les droits accordés à un utilisateur sont liés aux groupes auxquels il appartient.L'application \"Utilisateurs\" permet  :</p><ul><li> d'ajouter des utilisateurs</li> <li> de compléter les profils (email, service, fonction, photo, ...)</li> <li>  de gérer les accès et les droits (identifiant, mot de passe, groupes, validité du compte)</li> </ul> ",
            contents:"<p>Rubedo gère un référentiel transverse de contenus qui peuvent être publiés sur différents sites et espaces de travail.L'application \"Contenus\" permet  :</p><ul><li> de créer un contenu à partir d'un type de contenu paramétré</li> <li>  de gérer son état dans le workflow de publication attribué au type de contenu</li> <li>  de gérer la publication différée</li> <li>  de classer le contenu à l'aide des vocabulaires autorisés pour ce type de contenu</li> <li>  d'associer le contenu à un espace de contribution et des espaces de diffusion</li> <li>  de modifier les contenus</li> <li>  de dupliquer les contenus</li> <li>  d'ajouter un contenu en favori</li> </ul> ",
            dam:"<p>La médiathèque permet de gérer les médias ( images, vidéo, audio, animation ou documents) en fonction des types de médias paramétrés.L'application \"Médiathèque\" permet  :</p><ul><li> de créer un média à partir d'un type de média paramétré</li><li>  d'uploader un média et de renseigner les métadonnées associées</li><li>  de classer le média à l'aide des vocabulaires autorisés pour ce type de média</li><li>  d'associer le média à un espace de contribution et des espaces de diffusion</li><li>  de modifier les média</li><li>  d'ajouter un média en favori</li></ul>",
            forms:"<p>Rubedo permet de réaliser des enquêtes en ligne à l'aide de l'application questionnaire. Les fonctions de glisser/déposer facilitent la création des questions et des étapes. L'application Questionnaire permet :</p><ul><li> d'ajouter, supprimer et dupliquer un questionnaire</li><li> d'ajouter un questionnaire en favoris</li><li> de gérer les propriétés d'un questionnaire,  les conditions d'unicité et sa mise en ligne</li><li> de créer un questionnaire à l'aide des palettes d'outils de mise en forme (Wysiwyg, image, section, page, titre) et de paramétrage (type de questions)</li><li> de gérer les paramétres des questions et des réponses (label, bulle d'aide, obligatoire, conditionnel et options)</li><li> d'exploiter les résultats de chaque questionnaire en exportant au format csv</li></ul>"
        };
        var defaultInterfaceLoc=me.produceInterfaceLocalisationJSON();
        var store=Ext.getStore("LocalisationStore");
        var helpRec=store.findRecord("name","RubedoAppHelp");
        store.suspendAutoSync();
        if (Ext.isEmpty(helpRec)){
            store.add({name:"RubedoAppHelp",items:defaultHelp,i18n:{}})
        } else {
            helpRec.set("items",defaultHelp);
        }

        var intLocRec=store.findRecord("name","RubedoInterfaceLoc");
        if (Ext.isEmpty(intLocRec)){
            store.add({name:"RubedoInterfaceLoc",items:defaultInterfaceLoc,i18n:{}})
        } else {
            intLocRec.set("items",defaultInterfaceLoc);
        }
        store.resumeAutoSync();
        store.sync();
        console.log("Done saving localisation. Please reload the page.");
    }

});
