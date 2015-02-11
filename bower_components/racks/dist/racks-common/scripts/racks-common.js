(function() {
    function shimShadowStyles(styles, tag) {
        if (!Platform.ShadowCSS) {
            return;
        }
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            var cssText = Platform.ShadowCSS.shimStyle(style, tag);
            Platform.ShadowCSS.addCssToDocument(cssText);
            console.log(style);
            style.remove();
        }
    }

    function requestAnimationFrame() {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (fn) { setTimeout(fn, 16); };
    }


    var Racks = {
        Util: {
            ShimStyles: shimShadowStyles,
            AnimationFrame: {
                Request: requestAnimationFrame,
                Skip: function(fn){
                    requestAnimationFrame(function() {
                        requestAnimationFrame(fn);
                    });
                }
            }
        }
    };

    // Assign to window
    window.Racks = Racks;

})();
