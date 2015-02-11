/* global platform */
(function() {
    document.body.style.opacity = 0;
    window.addEventListener('WebComponentsReady', function() {
        document.body.style.opacity = 1;
    });

    // Call handlers for finished imports
    window.addEventListener('HTMLImportsLoaded', function() {
        Racks.__queue.forEach(function(handler) {
            handler();
        });
    });
})();
