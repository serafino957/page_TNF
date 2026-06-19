(function () {
    function readJson(key, fallback) {
        try {
            var value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function writeJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function formatCurrency(value) {
        return "$" + Number(value || 0).toFixed(2);
    }

    window.TNF_API = {
        readJson: readJson,
        writeJson: writeJson,
        formatCurrency: formatCurrency
    };
})();
