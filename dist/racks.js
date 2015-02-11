/* global platform */
(function() {
    window.addEventListener('HTMLImportsLoaded', function() {
        Racks.__queue.forEach(function(handler) {
            handler();
        });
    });
})();
