(function() {
    var script = document._currentScript || document.currentScript;

    var DocsHeaderElementPrototype = Object.create(HTMLElement.prototype);

    DocsHeaderElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'docs-header-template');
        Racks.Shim.Styles(template, 'docs-header');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));
    };

    if(!window.DocsHeaderElement) {
        window.DocsHeaderElement = document.registerElement('docs-header', {
            prototype: DocsHeaderElementPrototype
        });
    }

})();
