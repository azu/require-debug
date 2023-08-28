const MODULE = require('module');
const orig = MODULE._load;
MODULE._load = function (request) {
    const start = Date.now();
    console.log(`Loading ${request}...`);
    const exports = orig.apply(this, arguments);
    const end = Date.now();
    console.log(`Loaded ${request} in ${end - start}ms`);
    return exports;
};
