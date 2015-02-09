;(function(window, undefined) {
    var noop = function() {};

    var racks = {
        factory: {},
        elements: {},
        registered: [],
        create: {
            root: function() {
                return new RacksRoot();
            }
        }
    };

    function RacksError() {
        Error.call(this);

        var args = arguments,
        message = Array.prototype.shift.call(args);

        var formatted = message.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });

        if(typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }

        this.message = formatted || 'Internal racks error.';
        this.type = this.constructor.name;
        this.name = 'RacksError';
    }

    RacksError.prototype = Object.create(Error.prototype);
    RacksError.prototype.constructor = RacksError;

    var extend = function(a, b) {
        var key;
        for(key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    };

    var isRegistered = function(component) {
        return window.racks.registered.indexOf(component) >= 0;
    };

    var validRackEvent = function(ev) {
        return [
            'attached',
            'detached',
            'created',
            'attributeChanged'
        ].indexOf(ev) > -1;
    };

    function cssMin(_content) {
        var content = _content;
        content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
        // now all comments, newlines and tabs have been removed
        content = content.replace( / {2,}/g, ' ' );
        // now there are no more than single adjacent spaces left
        // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
        content = content.replace( / ([{:}]) /g, '$1' );
        content = content.replace( /([;,]) /g, '$1' );
        content = content.replace( / !/g, '!' );
        return content;
    }

    var eventTransform = function(events) {
        if(!events || events == 'undefined') return;
        var key, chain = {};
        for(key in events) {
            if(events.hasOwnProperty(key)) {
                if(validRackEvent(key)) {
                    chain[key + 'Callback'] = events[key];
                } else {
                    console.info('Racks: Used undefined racks event ' + key);
                }
            }
        }
        return chain;
    };

    var racksConstructor = function(name, racksProto) {
        if(!isRegistered(name)) {
            window.racks.registered.push(name);
            return document.registerElement(name, {
                prototype: racksProto
            });
        }
    }

    function RacksElement(element, options) {
        var RacksHtmlProto = Object.create(HTMLElement.prototype);
        this.handlers = {
            created: function() {
                var shadow = this.createShadowRoot();
                var name = this.tagName.toLowerCase();
                var container = document.createElement('div');
                var style = document.createElement('style');
                style.innerHTML = racks.factory[name].style;
                container.innerHTML = racks.factory[name].content;
                shadow.appendChild(style);
                shadow.appendChild(container);
                (options['created'] || noop)(this);
            },
            attached: function() {
                (options['attached'] || noop)(this);
            },
            detached: function() {
                (options['detached'] || noop)(this);
            },
            attributeChanged: function() {
                (options['attributeChanged'] || noop)(this);
            }
        };
        var RacksPrototype = extend(RacksHtmlProto, eventTransform(this.handlers));
        this.name = element;
        this.constructor = racksConstructor(this.name, RacksPrototype);
    }


    var Racks = function(element, options) {
        options = options || {};
        racks.elements[element] = new RacksElement(element, options);
    };

    var createFactory = function(name, template, style, node) {
        if(racks.factory[name]) {
            console.warn('Factory for ' + name + ' already defined');
        }
        var style = style.innerHTML.trim();
        racks.factory[name] = {
            _id: name,
            content: template.innerHTML.trim(),
            style: cssMin(style),
            attributes: node.getAttribute('attributes') || []
        }
    };

    function RacksRoot() {
        if(window.Rack && window.Rack.Root) {
            throw new RacksError('Root for Rack already exists in window');
        }
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function() {
            var name = this.getAttribute('name');
            var template = this.getElementsByTagName('template');
            if(template.length <= 0) {
                throw new RacksError('No templates found in {0}', name);
            }
            var style = this.getElementsByTagName('style');
            createFactory(name, template[0], style[0], this);
        }

        if(!isRegistered('racks-element')) {
            window.racks.registered.push('racks-element');
            document.registerElement('racks-element', {
                prototype: proto
            });
        }
    }

    ////// START ///////
    window.Rack = {};
    window.Racks = Racks;
    window.racks = racks;
})(window);
