(function() {
    var script = document._currentScript || document.currentScript;

    var RacksAppbarElementPrototype = Object.create(HTMLElement.prototype);

    RacksAppbarElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'racks-appbar-template');
        Racks.Shim.Styles(template, 'racks-appbar');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));
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
