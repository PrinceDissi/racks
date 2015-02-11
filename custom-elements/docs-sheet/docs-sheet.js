(function() {
    var script = document._currentScript || document.currentScript;

    var DocsSheetElementPrototype = Object.create(HTMLElement.prototype);

    DocsSheetElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'docs-sheet-template');
        Racks.Shim.Styles(template, 'docs-sheet');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));
    };

    if(!window.DocsSheetElement) {
        window.DocsSheetElement = document.registerElement('docs-sheet', {
            prototype: DocsSheetElementPrototype
        });
    }

})();
