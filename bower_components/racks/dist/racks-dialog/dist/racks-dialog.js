(function() {
    var currentScript = document._currentScript || document.currentScript;

    var RacksDialogElementPrototype = Object.create(HTMLElement.prototype);

    RacksDialogElementPrototype.createdCallback = function() {
        var imports = currentScript.ownerDocument;
        var template = imports.querySelector('#racks-dialog-template');

        // fix styling for polyfills
        Racks.Util.ShimStyles(template.querySelectorAll('style'), 'racks-dialog');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.addEventListener('click', this.hide.bind(this));
        var dialog = shadowRoot.querySelector('.dialog');
        dialog.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    RacksDialogElementPrototype.detachedCallback = function() {
        this.removeEventListener('click', this.hide.bind(this));
    };

    RacksDialogElementPrototype.show = function() {
        var dialog = this;
        dialog.setAttribute('show','');

        Racks.Util.AnimationFrame.Skip(function() {
            dialog.setAttribute('show', 'in');
        });
    };

    RacksDialogElementPrototype.hide = function() {
        var dialog = this;
        dialog.setAttribute('show', 'out');

        var animationendHandler = function() {
            dialog.removeAttribute('show');
            dialog.removeEventListener('animationend', animationendHandler);
            dialog.removeEventListener('webkitAnimationEnd', animationendHandler);
        };

        dialog.addEventListener('animationend', animationendHandler);
        dialog.addEventListener('webkitAnimationEnd', animationendHandler);
    };

    if(!window.RacksDialogElementPrototype) {
        window.RacksDialogElementPrototype = document.registerElement('racks-dialog', {
            prototype: RacksDialogElementPrototype
        });
    }

})();
