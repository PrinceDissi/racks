(function() {
    var script = document._currentScript || document.currentScript;

    var RacksLayoutElementPrototype = Object.create(HTMLElement.prototype);

    RacksLayoutElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'racks-layout-template');
        Racks.Shim.Styles(template, 'racks-layout');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));
    };

    RacksLayoutElementPrototype.openDrawer = function() {
        this.setAttribute('open', '');
    };

    RacksLayoutElementPrototype.closeDrawer = function() {
        this.removeAttribute('open');
    };

    RacksLayoutElementPrototype.toggleDrawer = function() {
        if(this.hasAttribute('open')) {
            this.removeAttribute('open');
        } else {
            this.setAttribute('open', '');
        }
    };

    if(!window.RacksLayoutElement) {
        window.RacksLayoutElement = document.registerElement('racks-layout', {
            prototype: RacksLayoutElementPrototype
        });
    }

})();
