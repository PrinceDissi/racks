/* global platform */
(function() {
    // Call handlers for finished imports
    window.addEventListener('HTMLImportsLoaded', function() {
        Racks.__queue.forEach(function(handler) {
            handler();
        });
    });
})();
