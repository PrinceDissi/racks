(function() {

    // reference the current script or file (HTML Import)
    var script = document._currentScript || document.currentScript;

    /**
     * Inherit from e.g. RacksActionElement
     * ====================================
     * If you want to inherit from a custom or racks element,
     * you have to create a prototype instance of the parent prototype
     * for extending their attributes and logic. Uncomment the following
     * line if this is prefered
     *
     * var RacksComponenetElement = Object.create(window.RacksActionElement.prototype);
     *
     */

    // create a basic prototype
    var RacksComponentElement = Object.create(HTMLElement.prototype);

    RacksComponenetElement.createdCallback = function () {

        /**
         * Inherit from e.g. RacksActionElement
         * ====================================
         * If you want to inherit from the RacksActionElement, you
         * have to execute the callback of the prototype and bind
         * the current element on top of it. Uncomment the following
         * line if this is preffered;
         *
         * window.RacksActionElement.prototype.createdCallback.call(this);
         *
         */

        // get the template of the component
        var template = Racks.Get.Template(script, 'racks-component-template');

        // add support for browser which don't implement the shadow dom
        Racks.Shim.Styles(template, 'racks-component');

        // create shadowRoot and append template content
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));

        /**
         * Attributes and Events
         * =====================
         * You can use `this` to work with the
         * host object, for example if you add
         * the attribute 'custom="10"' to your element,
         * you could use `this.getAttribute('custom')` to
         * read it from your element.
         *
         * The same principe leasts for the events, use
         * `this.addEventListener` to attach multiple events
         * on top of the element.
         */
    };

    // if the element isn't already registered
    if(!window.RacksButtonElement) {

        // don't forget to add access to the constructor via the window
        Racks.Elements.RacksButtonElement = document.registerElement('racks-component', {

            // assign the prototype created above to the prototype
            prototype: RacksComponenetElement
        });
    }
})();
