(function() {
    function shimShadowStyles(template, tag) {
        var styles = template.querySelectorAll('style');
        if (!Platform.ShadowCSS) {
            return;
        }
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            var cssText = Platform.ShadowCSS.shimStyle(style, tag);
            Platform.ShadowCSS.addCssToDocument(cssText);
            style.remove();
        }
    }

    function getStyleElements(template) {
        return template.querySelectorAll('style');
    }

    function getTemplateElement(script, name) {
        var owner = script.ownerDocument;
        if(!owner) {
            console.warn('Cant find owner document of ' + name);
            return;
        }
        var template = owner.querySelector('#' + name);
        return template.content;
    }

    function requestAnimationFrame() {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (fn) { setTimeout(fn, 16); };
    }

    function registerRacksComponent(settings) {
        if(!settings || !settings['name'] || !settings['prototype']) {
            console.error(
                'Need a name and prototype to register ' +
                'a new rack component in [Racks.Register]'
            );
        }
        var proto = settings['prototype'],
            name = settings['name'],
            definition = settings['namespace'];
        if(!window[proto]) {
            window[definition] = document.registerElement(name, {
                prototype: proto
            });
        } else {
            console.info('Already registered an element ' + name);
        }
    }


    var Racks = {
        Get: {
            Styles: getStyleElements,
            Template: getTemplateElement
        },
        Shim: {
            Styles: shimShadowStyles,
        },
        Util: {
            SkipAnimationFrame: function(fn){
                requestAnimationFrame(function() {
                    requestAnimationFrame(fn);
                });
            }
        }
    };

    // Assign to window
    window.Racks = Racks;

})();
