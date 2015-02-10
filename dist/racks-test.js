if(!window) {
    console.error('No window object found, try it in your browser');
}

var RACKS_TEST_STR = {
    PASS: 'was successfull',
    ERR: 'internal error',
    FAIL: 'exited with error',
    WARN: 'unexpected behavior'
};

function RacksTest(name, fn) {
    if(!name) {
        name = '[RacksTest::NN]';
    } else {
        name = '[' + name + ']';
    }
    this.method = fn;
    this.name = name;
    this._str = function(str, i) {
        return this.name + ' ' + str + ' (T#' + (i + 1) + ')'
    }
    this.Run = function(index) {
        var self = this;
        try {
            if(self.method()) {
                console.log(self._str(RACKS_TEST_STR.PASS, index));
                return;
            } else {
                console.error(self._str(RACKS_TEST_STR.FAIL, index));
                return;
            }
        } catch(ex) {
            console.error(self._str('fatal ' + RACKS_TEST_STR.ERR, index));
            return;
        }
        console.warn(self._str(RACKS_TEST_STR.WARN, index));
        return;
    }
}

window.tests = {
    library: [
        new RacksTest('ShadowDom', function() {
            var div = document.getElementById('shadowTestTpl');
            try {
                div.createShadowRoot();
                return true;
            } catch(ex) {
                return false;
            }
        }),
        new RacksTest('RegisterElement', function() {
            try {
                if(document.registerElement) {
                    return true;
                }
                return false;
            } catch(ex) {
                return false;
            }
        })
    ],
    run: function() {
        for(var z = 0; z < this.library.length; z++) {
            var T = this.library[z];
            if(console.group) {
                console.group('Run ' + (z + 1) + '::' + T.name);
            }
            console.log('Starting test ...');
            T.Run(z);
            console.log('Finished test!');
            if(console.groupEnd) {
                console.groupEnd();
            }
        }
    }
}
