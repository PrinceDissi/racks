(function() {
    var script = document._currentScript || document.currentScript;

    var RacksButtonElementPrototype = Object.create(window.RacksActionElement.prototype);

    RacksButtonElementPrototype.createdCallback = function () {

        window.RacksActionElement.prototype.createdCallback.call(this);

        var template = Racks.Get.Template(script, 'racks-button-template');
        Racks.Shim.Styles(template, 'racks-button');

        // create shadowRoot and append template
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));

        // set an ARIA role, for more infor, see w3c specs
        this.setAttribute('role', 'button');
    };

    if(!window.RacksButtonElement) {
        window.RacksButtonElement = document.registerElement('racks-button', {
            prototype: RacksButtonElementPrototype
        });
    }
})();
