(function() {
    var currentScript = document._currentScript || document.currentScript;

    var DocsHeaderElementPrototype = Object.create(HTMLElement.prototype);

    DocsHeaderElementPrototype.attachedCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#docs-header-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'docs-header');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    if(!window.DocsHeaderElement) {
        window.DocsHeaderElement = document.registerElement('docs-header', {
            prototype: DocsHeaderElementPrototype
        });
    }

})();
