/* global platform */
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
        if(!template || !template.content) {
            console.error(
                'Can\'t fetch content of the template "' +
                name + '", check your related .js file'
            );
            return false;
        }
        return template.content;
    }

    function requestAnimationFrame() {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (fn) { setTimeout(fn, 16); };
    }

    function fireOnReady(handler) {
        Racks.__queue.push(handler);
    }

    var Racks = {
        __queue: [],
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
        },
        Elements: {},
        Ready: fireOnReady
    };

    // Assign to window
    window.Racks = Racks;
    
    // Call handlers for finished imports
    window.addEventListener('HTMLImportsLoaded', function() {
        Racks.__queue.forEach(function(handler) {
            handler();
        });
    });
})();
