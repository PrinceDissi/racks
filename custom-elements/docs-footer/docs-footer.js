(function() {
    var script = document._currentScript || document.currentScript;

    var DocsFooterElementPrototype = Object.create(HTMLElement.prototype);

    DocsFooterElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'docs-footer-template');
        Racks.Shim.Styles(template, 'docs-footer');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));
    };

    if(!window.DocsFooterElement) {
        window.DocsFooterElement = document.registerElement('docs-footer', {
            prototype: DocsFooterElementPrototype
        });
    }

})();
