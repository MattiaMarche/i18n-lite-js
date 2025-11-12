/**
 * @description Class usable for internationalization (i18n).
 * Allows to translate text based on user's language preference.
 * @param {Object} translations Object containing translation key-value pairs for each supported language.
 * @param {Array} languages Array of supported languages. Default: [ 'en', 'es', 'fr', 'it' ].
 * @param {string} defaultLanguage The default language to fall back to if the user's language is not supported. Default: 'en'.
 * @param {string} currentLanguage (Optional) Current language to use for translations. If null, it will be detected from the 'lang' query parameter (if present), or from the browser settings. Default: null.
 * @param {string} classPrefix (Optional) Prefix used for CSS classes related to i18n, set before any class that will trigger elements hiding for foreign languages. If null no class and UI handling will be performed. Default: null.
 */
window._I18n = function (
    translations = {},
    languages = [ 'en', 'es', 'fr', 'it' ],
    defaultLanguage = 'en',
    currentLanguage = null,
    classPrefix = null
) {
    /**
     * VARIABLES
     */
    /**
     * @description {string} classPrefix Prefix used for CSS classes related to i18n, set before any class that will trigger elements hiding for foreign languages. If null no class and UI handling will be performed.
     */
    this.classPrefix = classPrefix;
    /**
     * @description {string} defaultLanguage The default language to fall back to if the user's language is not supported.
     */
    this.defaultLanguage = defaultLanguage;
    /**
     * @description {string} language The current language being used for translations.
     */
    this.language = defaultLanguage;
    /**
     * @description {Array} languages Array of supported languages.
     */
    this.languages = languages;
    /**
     * @description {Object} translations Object containing translation key-value pairs for each supported language.
     */
    this.translations = translations;


    /**
     * METHODS
     */

    /**
     * @description Shorthand method for translating a key using the current language.
     * @param {string} key Key representing the string to translate.
     * @param {string} lang (Optional) Target language for translation. Default: this.language.
     * @return {string} Translated string or the key if translation is not found.
     */
    this._ = function ( key, lang = this.language ) {
        return this.translate( key, lang );
    };

    /**
     * @description Shorthand method for translating a key using the current language.
     * @param {string} key Key representing the string to translate.
     * @param {string} lang (Optional) Target language for translation. Default: this.language.
     * @return {string} Translated string or the key if translation is not found.
     */
    this._t = function ( key, lang = this.language ) {
        return this.translate( key, lang );
    };

    /**
     * @description Shorthand method for translating a key using the current language.
     * @param {string} key Key representing the string to translate.
     * @param {string} lang (Optional) Target language for translation. Default: this.language.
     * @return {string} Translated string or the key if translation is not found.
     */
    this.t = function ( key, lang = this.language ) {
        return this.translate( key, lang );
    };

    /**
     * @description Detects the user's preferred language.
     * It first checks for a 'lang' query parameter in the URL.
     * If not found, it falls back to the browser's language settings.
     * If the detected language is not supported, it defaults to the specified default language.
     * @return {string} Detected language code (e.g., 'en', 'it').
     */
    this.detectLanguage = function() {
        var urlParams = new URLSearchParams( window.location.search );
        var lang = this.defaultLanguage;
        if ( urlParams && urlParams.has( 'lang' ) ) {
            lang = urlParams.get( 'lang' ).toLowerCase();
        } else {
            lang = navigator.language || navigator.userLanguage;
        }
        if ( lang.indexOf( '-' ) !== -1 ) {
            lang = lang.split( '-' )[0].toLowerCase();
        } else {
            lang = lang.toLowerCase();
        }
        if ( this.languages.indexOf( lang ) === -1 ) {
            lang = this.defaultLanguage;
        }
        return lang;
    };

    /**
     * @description Gets the current language being used for translations.
     * @return {string} Current language code (e.g., 'en', 'it').
     */
    this.getLanguage = function() {
        return this.language;
    };

    /**
     * @description Translates a given key into the specified language.
     * If the key does not exist in the specified language, it falls back to the default language.
     * If the key does not exist in the default language, it returns the key itself.
     * @param {string} key Key representing the string to translate.
     * @param {string} lang (Optional) Target language for translation. Default: this.language.
     * @return {string} Translated string or the key if translation is not found.
     */
    this.translate = function ( key, lang = this.language ) {
        if ( this.translations[ lang ].hasOwnProperty( key ) && this.translations[ lang ][ key ] !== null ) {
            return this.translations[ lang ][ key ];
        }
        return this.translations[ this.defaultLanguage ][ key ] || key;
    };

    /**
     * @description Updates the UI by removing elements that do not match the current language.
     * It iterates through all supported languages and removes elements with class names
     * corresponding to languages other than the current one.
     * This method is called once the DOM is fully loaded.
     * @return {void}
     */
    this.updateUI = function () {
        if ( this.classPrefix === null ) {
            return;
        }
        for ( var i = 0; i < this.languages.length; i++ ) {
            if ( this.language === this.languages[i] ) {
                continue;
            }
            document.querySelectorAll( '.' + this.classPrefix + this.languages[i] ).forEach( function ( element ) {
                element.parentNode && element.parentNode.removeChild( element );
            });
        }
    };


    /**
     * CONSTRUCTOR AND HOOKS
     */

    /**
     * @description Initializes the i18n system by detecting the user's language
     * and updating the UI accordingly.
     * If the user's language is not supported, it falls back to the default language.
     * Also sets up an event listener to update the UI once the DOM is fully loaded.
     * @return {void}
     */
    this.initialize = function () {
        var urlParams = new URLSearchParams( window.location.search );
        if ( urlParams && urlParams.has( 'lang' ) ) {
            this.language = urlParams.get( 'lang' ).toLowerCase();
        } else {
            this.language = navigator.language || navigator.userLanguage;
        }
        if ( this.language.indexOf( '-' ) !== -1 ) {
            this.language = this.language.split( '-' )[0].toLowerCase();
        } else {
            this.language = this.language.toLowerCase();
        }
        if ( this.languages.indexOf( this.language ) === -1 ) {
            this.language = this.defaultLanguage;
        }
        if ( currentLanguage !== null && this.languages.indexOf( currentLanguage ) !== -1 ) {
            this.language = currentLanguage;
        } else {
            this.language = this.detectLanguage();
        }
        this.updateUI();
        window.addEventListener( 'DOMContentLoaded', this.updateUI.bind( this ) );
    };

    // Constructor call
    this.initialize();
};
