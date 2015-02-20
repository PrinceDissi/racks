(function() {
    var script = document._currentScript || document.currentScript;

    var RacksMenuElementPrototype = Object.create(HTMLElement.prototype);

    RacksMenuElementPrototype.attachedCallback = function() {
        var template = Racks.Get.Template(script, 'racks-menu-template');
        Racks.Shim.Styles(template, 'racks-menu');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));
    };

    if(!window.RacksMenuElement) {
        window.RacksMenuElement = document.registerElement('racks-menu', {
            prototype: RacksMenuElementPrototype
        });
    }

})();
