(function() {
    var script = document._currentScript || document.currentScript;

    var DocsContentElementPrototype = Object.create(HTMLElement.prototype);

    DocsContentElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'docs-content-template');
        Racks.Shim.Styles(template, 'docs-content');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));
    };

    if(!window.DocsContentElement) {
        window.DocsContentElement = document.registerElement('docs-content', {
            prototype: DocsContentElementPrototype
        });
    }

})();
