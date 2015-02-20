(function() {
    var script = document._currentScript || document.currentScript;

    var RacksDialogElementPrototype = Object.create(HTMLElement.prototype);

    RacksDialogElementPrototype.createdCallback = function() {
        var template = Racks.Get.Template(script, 'racks-dialog-template');
        Racks.Shim.Styles(template, 'racks-dialog');

        // create shadow root
        var shadowRoot = this.createShadowRoot();
        shadowRoot.appendChild(template.cloneNode(true));

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

        Racks.Util.SkipAnimationFrame(function() {
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
