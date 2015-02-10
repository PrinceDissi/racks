(function() {
    var currentScript = document._currentScript || document.currentScript;

    var RacksButtonElementPrototype = Object.create(window.RacksActionElement.prototype);

    RacksButtonElementPrototype.createdCallback = function () {

        window.RacksActionElement.prototype.createdCallback.call(this);

        // import the template
        var importer = currentScript.ownerDocument;
        var template = importer.querySelector('#racks-button-template').content;

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'racks-button');

        // create shadowRoot and append template
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));

        this.setAttribute('role', 'button');
    }

    if(!window.RacksButtonElement) {
        window.RacksButtonElement = document.registerElement('racks-button', {
            prototype: RacksButtonElementPrototype
        });
    }

})();
