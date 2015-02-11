(function() {
    var currentScript = document._currentScript || document.currentScript;

    var DocsContentElementPrototype = Object.create(HTMLElement.prototype);

    DocsContentElementPrototype.attachedCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#docs-content-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'docs-content');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    if(!window.DocsContentElement) {
        window.DocsContentElement = document.registerElement('docs-content', {
            prototype: DocsContentElementPrototype
        });
    }

})();
