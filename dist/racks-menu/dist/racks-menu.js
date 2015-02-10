(function() {
    var currentScript = document._currentScript || document.currentScript;

    var RacksMenuElementPrototype = Object.create(HTMLElement.prototype);

    RacksMenuElementPrototype.attachedCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#racks-menu-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'racks-menu');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    if(!window.RacksMenuElement) {
        window.RacksMenuElement = document.registerElement('racks-menu', {
            prototype: RacksMenuElementPrototype
        });
    }

})();
