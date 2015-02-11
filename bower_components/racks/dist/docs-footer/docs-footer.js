(function() {
    var currentScript = document._currentScript || document.currentScript;

    var DocsFooterElementPrototype = Object.create(HTMLElement.prototype);

    DocsFooterElementPrototype.attachedCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#docs-footer-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'docs-footer');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    if(!window.DocsFooterElement) {
        window.DocsFooterElement = document.registerElement('docs-footer', {
            prototype: DocsFooterElementPrototype
        });
    }

})();
