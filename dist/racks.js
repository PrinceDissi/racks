(function() {
   var win = window,
    doc = document,
    attrProto = {
        setAttribute: Element.prototype.setAttribute,
        removeAttribute: Element.prototype.removeAttribute
    },
    hasShadow = Element.prototype.createShadowRoot,
    container = doc.createElement('div'),
    noop = function(){},
    trueop = function(){ return true; },
    regexCamelToDash = /([a-z])([A-Z])/g,
    regexPseudoParens = /\(|\)/g,
    regexPseudoCapture = /:(\w+)\u276A(.+?(?=\u276B))|:(\w+)/g,
    regexDigits = /(\d+)/g,

    prefix = (function() {
       var styles = win.getComputedStyle(doc.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1];
        return {
            dom: pre == 'ms' ? 'MS' : pre,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre == 'ms' ? pre : pre[0].toUpperCase() + pre.substr(1)
        };
    })(),

    matchSelector = Element.prototype.matchesSelector || Element.prototype[prefix.lowercase + 'MatchesSelector'],
    mutation = win.MutationObserver || win[prefix.js + 'MutationObserver'];

    var typeCache = {},
        typeString = typeCache.toString,
        typeRegexp = /\s([a-zA-Z]+)/;

    function typeOf(obj) {
        var type = typeString.call(obj);
        return typeCache[type] ||
            (typeCache[type] = type.match(typeRegexp)[1].toLowerCase());
    }

    function clone(item, type) {
         var fn = clone[type || typeOf(item)];
        return fn ? fn(item) : item;
    }
    clone.object = function(src){
        var obj = {};
        for (var key in src) obj[key] = clone(src[key]);
        return obj;
    };
    clone.array = function(src){
        var i = src.length, array = new Array(i);
        while (i--) array[i] = clone(src[i]);
        return array;
    };

    var unsliceable = ['undefined', 'null', 'number', 'boolean', 'string', 'function'];

    function toArray(obj){
        return unsliceable.indexOf(typeOf(obj)) == -1 ?
        Array.prototype.slice.call(obj, 0) : [obj];
    };

    function mergeOne(source, key, current){
        var type = typeOf(current);
        if (type == 'object' && typeOf(source[key]) == 'object') {
            xtag.merge(source[key], current);
        } else {
            source[key] = clone(current, type);
        }
        return source;
    }

    var racks = {
        tags: {},
        merge: function(source, k, v){
            if (typeOf(k) == 'string') return mergeOne(source, k, v);
            for (var i = 1, l = arguments.length; i < l; i++) {
                var object = arguments[i];
                for (var key in object) mergeOne(source, key, object[key]);
            }
            return source;
        },
        defaults: {
            pseudos: [],
            mixins: [],
            events: {},
            methods: {},
            accessors: {},
            lifecycle: {},
            attributes: {},
        }
        register: function(name, options) {
            var _name;
            if(typeof name == 'string') {
                _name = name.toLowerCase();
            } else {
                // Break if name wasn't a string
                return;
            }

            fragment.tags[_name] = options || {};
            var basePrototype = options.prototype;
            delete options.prototype;


        }
    };

})(window);
