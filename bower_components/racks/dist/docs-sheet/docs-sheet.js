(function() {
    var currentScript = document._currentScript || document.currentScript;
    var DocsSheetElementPrototype = Object.create(HTMLElement.prototype);

    DocsSheetElementPrototype.attachedCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#docs-sheet-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'docs-sheet');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    if(!window.DocsSheetElement) {
        window.DocsSheetElement = document.registerElement('docs-sheet', {
            prototype: DocsSheetElementPrototype
        });
    }

})();
