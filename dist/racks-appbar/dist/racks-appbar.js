(function() {
    var currentScript = document._currentScript || document.currentScript;

    var RacksAppbarElementPrototype = Object.create(HTMLElement.prototype);

    RacksAppbarElementPrototype.attachedCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#racks-appbar-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'racks-appbar');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    RacksAppbarElementPrototype.openDrawer = function() {
        this.setAttribute('open', '');
    };

    RacksAppbarElementPrototype.closeDrawer = function() {
        this.removeAttribute('open');
    };

    RacksAppbarElementPrototype.toggleDrawer = function() {
        if(this.hasAttribute('open')) {
            this.removeAttribute('open');
        } else {
            this.setAttribute('open', '');
        }
    };

    if(!window.RacksAppbarElement) {
        window.RacksAppbarElement = document.registerElement('racks-appbar', {
            prototype: RacksAppbarElementPrototype
        });
    }

})();
